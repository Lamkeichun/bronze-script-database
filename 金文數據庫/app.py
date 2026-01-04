from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import sqlite3
import os
import re

app = Flask(__name__)
CORS(app)

# 数据库路径
DB_PATH = os.path.join(os.path.dirname(__file__), '金文數據库.db')


def get_db_connection():
    """获取数据库连接"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    # 为SQLite创建REGEXP函数
    def regexp_func(expr, item):
        if item is None:
            return False
        try:
            return re.search(expr, str(item)) is not None
        except Exception:
            return False
    conn.create_function('REGEXP', 2, regexp_func)
    return conn


@app.route('/')
def index():
    """返回首页"""
    return send_from_directory(os.path.dirname(__file__), 'index_login.html')


@app.route('/<path:filename>')
def serve_static(filename):
    """提供静态文件"""
    return send_from_directory(os.path.dirname(__file__), filename)


@app.route('/api/artifacts')
def get_artifacts():
    """获取文物列表，支持分页、搜索和高级分类筛选"""
    try:
        page = int(request.args.get('page', 1))
        page_size = int(request.args.get('page_size', 20))
        search = request.args.get('search', '')
    except ValueError as e:
        return jsonify({'error': 'Invalid parameter'}), 400

    # 收集高级筛选参数
    filter_params = {
        '编号': (request.args.get('filter_编号', ''), request.args.get('filter_编号_regex', '')),
        '器名': (request.args.get('filter_器名', ''), request.args.get('filter_器名_regex', '')),
        '时代': (request.args.get('filter_时代', ''), request.args.get('filter_时代_regex', '')),
        '出土': (request.args.get('filter_出土', ''), request.args.get('filter_出土_regex', '')),
        '收藏': (request.args.get('filter_收藏', ''), request.args.get('filter_收藏_regex', '')),
        '尺寸': (request.args.get('filter_尺寸', ''), request.args.get('filter_尺寸_regex', '')),
        '器形': (request.args.get('filter_器形', ''), request.args.get('filter_器形_regex', '')),
        '字数': (request.args.get('filter_字数', ''), request.args.get('filter_字数_regex', '')),
        '著录': (request.args.get('filter_著录', ''), request.args.get('filter_著录_regex', '')),
        '其他著录': (request.args.get('filter_其他著录', ''), request.args.get('filter_其他著录_regex', '')),
        '铭文': (request.args.get('filter_铭文', ''), request.args.get('filter_铭文_regex', '')),
        '备注': (request.args.get('filter_备注', ''), request.args.get('filter_备注_regex', '')),
        '直接来源': (request.args.get('filter_直接来源', ''), request.args.get('filter_直接来源_regex', '')),
        '考古': (request.args.get('filter_考古', ''), request.args.get('filter_考古_regex', '')),
        '其他': (request.args.get('filter_其他', ''), request.args.get('filter_其他_regex', ''))
    }

    conn = get_db_connection()
    cursor = conn.cursor()

    # 构建查询条件
    where_clauses = []
    params = []

    # 全局搜索（支持正则表达式和多关键词）
    search_regex = request.args.get('search_regex', '')
    search_mode = request.args.get('search_mode', 'or')  # or 或 and 模式

    if search_regex:
        # 正则表达式搜索
        search_fields = ['編号', '器名', '铭文', '著录', '时代', '出土', '收藏', '器形', '其他著录', '备注', '直接来源', '考古', '其他']
        regex_clauses = []
        for field in search_fields:
            regex_clauses.append(f"REGEXP({field}, ?)")
        where_clauses.append('(' + ' OR '.join(regex_clauses) + ')')
        params.extend([search_regex] * len(search_fields))
    elif search:
        # 智能多关键词搜索
        # 分割关键词（支持空格、逗号、分号分隔）
        keywords = re.split(r'[,;\s]+', search.strip())
        keywords = [kw for kw in keywords if kw]  # 过滤空字符串

        if keywords:
            search_fields = ['編号', '器名', '铭文', '著录', '时代', '出土', '收藏', '器形', '其他著录', '备注', '直接来源', '考古', '其他']

            if search_mode == 'and':
                # AND模式：记录必须包含所有关键词（可以在不同字段中）
                for keyword in keywords:
                    field_clauses = []
                    for field in search_fields:
                        field_clauses.append(f"{field} LIKE ?")
                    keyword_clause = '(' + ' OR '.join(field_clauses) + ')'
                    where_clauses.append(keyword_clause)
                    params.extend([f'%{keyword}%'] * len(search_fields))
            else:
                # OR模式：记录包含任意关键词即可
                keyword_clauses = []
                for keyword in keywords:
                    field_clauses = []
                    for field in search_fields:
                        field_clauses.append(f"{field} LIKE ?")
                    keyword_clauses.append('(' + ' OR '.join(field_clauses) + ')')
                    params.extend([f'%{keyword}%'] * len(search_fields))

                where_clauses.append('(' + ' OR '.join(keyword_clauses) + ')')

    # 高级分类筛选
    field_mapping = {
        '编号': '編号',
        '器名': '器名',
        '时代': '时代',
        '出土': '出土',
        '收藏': '收藏',
        '尺寸': '尺寸',
        '器形': '器形',
        '字数': '字数',
        '著录': '著录',
        '其他著录': '其他著录',
        '铭文': '铭文',
        '备注': '备注',
        '直接来源': '直接来源',
        '考古': '考古',
        '其他': '其他'
    }

    for key, value_tuple in filter_params.items():
        value, regex_pattern = value_tuple
        filter_mode = request.args.get(f'filter_{key}_mode', 'or')

        if regex_pattern:
            # 正则表达式筛选
            db_field = field_mapping.get(key, key)
            where_clauses.append(f"REGEXP({db_field}, ?)")
            params.append(regex_pattern)
        elif value:
            # 普通LIKE筛选（支持多关键词）
            keywords = re.split(r'[,;\s]+', value.strip())
            keywords = [kw for kw in keywords if kw]  # 过滤空字符串

            if keywords:
                db_field = field_mapping.get(key, key)

                if filter_mode == 'and':
                    # AND模式：字段必须包含所有关键词
                    for keyword in keywords:
                        where_clauses.append(f"{db_field} LIKE ?")
                        params.append(f'%{keyword}%')
                else:
                    # OR模式：字段包含任意关键词即可
                    keyword_clauses = []
                    for keyword in keywords:
                        keyword_clauses.append(f"{db_field} LIKE ?")
                        params.append(f'%{keyword}%')
                    where_clauses.append('(' + ' OR '.join(keyword_clauses) + ')')

    where_clause = ' AND '.join(where_clauses) if where_clauses else '1=1'

    # 获取总数
    try:
        count_query = f"SELECT COUNT(*) as total FROM 金文数据 WHERE {where_clause}"
        cursor.execute(count_query, params)
        total = cursor.fetchone()['total']

        # 获取分页数据
        offset = (page - 1) * page_size
        data_query = f"""
            SELECT * FROM 金文数据
            WHERE {where_clause}
            ORDER BY 編号
            LIMIT ? OFFSET ?
        """
        params.extend([page_size, offset])
        cursor.execute(data_query, params)
        artifacts = [dict(row) for row in cursor.fetchall()]

        conn.close()

        return jsonify({
            'data': artifacts,
            'total': total,
            'page': page,
            'page_size': page_size,
            'total_pages': (total + page_size - 1) // page_size if total > 0 else 1
        })
    except Exception as e:
        conn.close()
        print(f"查询错误: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500


@app.route('/api/artifacts/<artifact_id>')
def get_artifact_detail(artifact_id):
    """获取单个文物的详细信息"""
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        query = "SELECT * FROM 金文数据 WHERE 編号 = ?"
        cursor.execute(query, (artifact_id,))
        artifact = cursor.fetchone()

        conn.close()

        if artifact:
            result = dict(artifact)
            return jsonify(result)
        else:
            return jsonify({'error': 'Not found'}), 404
    except Exception as e:
        conn.close()
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500


@app.route('/api/eras')
def get_eras():
    """获取所有时代列表"""
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT 时代, COUNT(*) as count
            FROM 金文数据
            WHERE 时代 IS NOT NULL AND 时代 != ''
            GROUP BY 时代
            ORDER BY count DESC
        """)
        eras = [dict(row) for row in cursor.fetchall()]

        conn.close()
        return jsonify(eras)
    except Exception as e:
        conn.close()
        print(f"查询时代列表错误: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/collections')
def get_collections():
    """获取所有收藏机构列表"""
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT 收藏, COUNT(*) as count
            FROM 金文数据
            WHERE 收藏 IS NOT NULL AND 收藏 != ''
            GROUP BY 收藏
            ORDER BY count DESC
            LIMIT 50
        """)
        collections = [dict(row) for row in cursor.fetchall()]

        conn.close()
        return jsonify(collections)
    except Exception as e:
        conn.close()
        print(f"查询收藏列表错误: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/statistics')
def get_statistics():
    """获取统计数据"""
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # 总数
        cursor.execute("SELECT COUNT(*) as total FROM 金文数据")
        total = cursor.fetchone()['total']

        # 按时代统计
        cursor.execute("""
            SELECT 时代, COUNT(*) as count
            FROM 金文数据
            WHERE 时代 IS NOT NULL
            GROUP BY 时代
            ORDER BY count DESC
            LIMIT 10
        """)
        era_stats = [dict(row) for row in cursor.fetchall()]

        # 按收藏统计
        cursor.execute("""
            SELECT 收藏, COUNT(*) as count
            FROM 金文数据
            WHERE 收藏 IS NOT NULL
            GROUP BY 收藏
            ORDER BY count DESC
            LIMIT 10
        """)
        collection_stats = [dict(row) for row in cursor.fetchall()]

        conn.close()

        return jsonify({
            'total': total,
            'era_stats': era_stats,
            'collection_stats': collection_stats
        })
    except Exception as e:
        conn.close()
        print(f"查询统计数据错误: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/health')
def health_check():
    """健康检查"""
    return jsonify({'status': 'ok', 'message': 'Server is running'})


if __name__ == '__main__':
    print("=" * 60)
    print("金文数据库服务器")
    print("=" * 60)
    print(f"数据库路径: {DB_PATH}")
    print(f"服务地址: http://localhost:5000")
    print("=" * 60)
    print()

    app.run(debug=True, host='0.0.0.0', port=5000)
