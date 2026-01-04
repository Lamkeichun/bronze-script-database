#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
测试服务器脚本
"""

import sqlite3
import os

print("=" * 60)
print("金文数据库测试脚本")
print("=" * 60)
print()

# 数据库路径
DB_PATH = r'd:\金文數據库\金文數據库.db'

# 测试1: 检查数据库文件
print("测试1: 检查数据库文件")
if os.path.exists(DB_PATH):
    size = os.path.getsize(DB_PATH)
    print(f"✓ 数据库文件存在")
    print(f"  路径: {DB_PATH}")
    print(f"  大小: {size / 1024 / 1024:.2f} MB")
else:
    print(f"✗ 数据库文件不存在: {DB_PATH}")
    exit(1)
print()

# 测试2: 连接数据库
print("测试2: 连接数据库")
try:
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    print("✓ 数据库连接成功")
except Exception as e:
    print(f"✗ 数据库连接失败: {e}")
    exit(1)
print()

# 测试3: 检查表结构
print("测试3: 检查表结构")
try:
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    tables = cursor.fetchall()
    print(f"✓ 找到 {len(tables)} 个表")
    for table in tables:
        print(f"  - {table[0]}")

    cursor.execute("PRAGMA table_info(金文数据)")
    columns = cursor.fetchall()
    print(f"  金文数据表有 {len(columns)} 个字段:")
    for col in columns:
        print(f"    {col[1]} ({col[2]})")
except Exception as e:
    print(f"✗ 检查表结构失败: {e}")
print()

# 测试4: 统计数据
print("测试4: 统计数据")
try:
    cursor.execute("SELECT COUNT(*) FROM 金文数据")
    total = cursor.fetchone()[0]
    print(f"✓ 总记录数: {total}")

    cursor.execute("SELECT COUNT(*) FROM 金文数据 WHERE 编号 IS NOT NULL")
    total_with_id = cursor.fetchone()[0]
    print(f"  有编号的记录: {total_with_id}")

    cursor.execute("SELECT 时代, COUNT(*) as count FROM 金文数据 GROUP BY 时代 ORDER BY count DESC LIMIT 5")
    era_stats = cursor.fetchall()
    print(f"  时代分布 (前5):")
    for era, count in era_stats:
        print(f"    {era}: {count}")
except Exception as e:
    print(f"✗ 统计数据失败: {e}")
print()

# 测试5: 查询示例
print("测试5: 查询示例数据")
try:
    cursor.execute("SELECT 编号, 器名, 时代 FROM 金文数据 LIMIT 3")
    samples = cursor.fetchall()
    print(f"✓ 示例数据:")
    for sample in samples:
        print(f"  {sample[0]} - {sample[1]} - {sample[2]}")
except Exception as e:
    print(f"✗ 查询数据失败: {e}")
print()

# 测试6: Flask依赖
print("测试6: 检查Flask依赖")
try:
    import flask
    print(f"✓ Flask 已安装 (版本: {flask.__version__})")
except ImportError:
    print("✗ Flask 未安装")
    print("  请运行: pip install flask")

try:
    import flask_cors
    print(f"✓ Flask-CORS 已安装")
except ImportError:
    print("✗ Flask-CORS 未安装")
    print("  请运行: pip install flask-cors")
print()

conn.close()

print("=" * 60)
print("测试完成！")
print("=" * 60)
print()
print("如果所有测试通过，可以运行:")
print("  python app.py")
print("然后访问: http://localhost:5000")
