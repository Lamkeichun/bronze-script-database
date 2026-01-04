from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)

# 数据库路径
DB_PATH = os.path.join(os.path.dirname(__file__), '金文數據库.db')


def get_db_connection():
    """获取数据库连接"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


@app.route('/')
def index():
    """返回首页"""
    return send_from_directory(os.path.dirname(__file__), 'index.html')


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
        '编号': request.args.get('filter_编号', ''),
        '器名': request.args.get('filter_器名', ''),
        '时代': request.args.get('filter_时代', ''),
        '出土': request.args.get('filter_出土', ''),
        '收藏': request.args.get('filter_收藏', ''),
        '尺寸': request.args.get('filter_尺寸', ''),
        '器形': request.args.get('filter_器形', ''),
        '字数': request.args.get('filter_字数', ''),
        '著录': request.args.get('filter_著录', ''),
        '其他著录': request.args.get('filter_其他著录', ''),
        '铭文': request.args.get('filter_铭文', ''),
        '备注': request.args.get('filter_备注', '')
    }

    conn = get_db_connection()
    cursor = conn.cursor()

    # 构建查询条件
    where_clauses = []
    params = []

    # 全局搜索
    if search:
        where_clauses.append("""
            (編号 LIKE ? OR 器名 LIKE ? OR 铭文 LIKE ? OR 著录 LIKE ? OR
             时代 LIKE ? OR 出土 LIKE ? OR 收藏 LIKE ? OR 器形 LIKE ? OR
             其他著录 LIKE ? OR 备注 LIKE ?)
        """)
        search_pattern = f'%{search}%'
        params.extend([search_pattern] * 10)

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
        '备注': '备注'
    }

    for key, value in filter_params.items():
        if value:
            db_field = field_mapping.get(key, key)
            where_clauses.append(f"{db_field} LIKE ?")
            params.append(f'%{value}%')

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
    print("金文数据库服务器（简化版）")
    print("=" * 60)
    print(f"数据库路径: {DB_PATH}")
    print(f"服务地址: http://localhost:5000")
    print("=" * 60)
    print()

    app.run(debug=True, host='0.0.0.0', port=5000)
