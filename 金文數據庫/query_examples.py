#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
金文数据库查询示例
"""

import sqlite3

def query_database():
    """演示数据库查询"""

    db_path = r'd:\金文數據库\金文數據库.db'
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # 示例1: 查询所有数据
    print("=" * 60)
    print("示例1: 查询所有记录数")
    cursor.execute("SELECT COUNT(*) FROM 金文数据")
    print(f"总记录数: {cursor.fetchone()[0]}\n")

    # 示例2: 按器名查询
    print("=" * 60)
    print("示例2: 查询特定器名（史鼎）")
    cursor.execute("""
        SELECT 編号, 器名, 时代, 收藏, 字数
        FROM 金文数据
        WHERE 器名 LIKE '%史鼎%'
        LIMIT 5
    """)
    for row in cursor.fetchall():
        print(f"  {row[0]} | {row[1]} | {row[2]} | {row[3]} | {row[4]}")
    print()

    # 示例3: 按时代分组统计
    print("=" * 60)
    print("示例3: 按时代统计")
    cursor.execute("""
        SELECT 时代, COUNT(*) as 数量
        FROM 金文数据
        GROUP BY 时代
        ORDER BY 数量 DESC
        LIMIT 10
    """)
    for row in cursor.fetchall():
        print(f"  {row[0]}: {row[1]}")
    print()

    # 示例4: 按收藏机构统计
    print("=" * 60)
    print("示例4: 按收藏机构统计 (前10)")
    cursor.execute("""
        SELECT 收藏, COUNT(*) as 数量
        FROM 金文数据
        WHERE 收藏 IS NOT NULL AND 收藏 != ''
        GROUP BY 收藏
        ORDER BY 数量 DESC
        LIMIT 10
    """)
    for row in cursor.fetchall():
        print(f"  {row[0]}: {row[1]}")
    print()

    # 示例5: 按字数统计
    print("=" * 60)
    print("示例5: 按字数统计")
    cursor.execute("""
        SELECT 字数, COUNT(*) as 数量
        FROM 金文数据
        GROUP BY 字数
        ORDER BY 数量 DESC
        LIMIT 10
    """)
    for row in cursor.fetchall():
        print(f"  {row[0]}: {row[1]}")
    print()

    # 示例6: 查询详细信息
    print("=" * 60)
    print("示例6: 查询特定编号的详细信息")
    cursor.execute("""
        SELECT 編号, 器名, 著录, 时代, 出土, 收藏, 尺寸, 铭文
        FROM 金文数据
        WHERE 編号 = '★00001'
    """)
    row = cursor.fetchone()
    if row:
        print(f"  编号: {row[0]}")
        print(f"  器名: {row[1]}")
        print(f"  著录: {row[2]}")
        print(f"  时代: {row[3]}")
        print(f"  出土: {row[4]}")
        print(f"  收藏: {row[5]}")
        print(f"  尺寸: {row[6]}")
        print(f"  铭文: {row[7]}")
    print()

    conn.close()

if __name__ == "__main__":
    query_database()
