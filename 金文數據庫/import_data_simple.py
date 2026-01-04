import pandas as pd
import sqlite3

print("正在读取Excel数据...")
df = pd.read_excel('金文數據庫數據.xlsx')
print(f"读取到 {len(df)} 条记录")

# 选择列（不包含"直接来源"、"考古"、"其他"）
columns = ['編號','器名','著錄','時代','出土','收藏','尺寸','器形','其他著錄','字數','銘文','備註']
df_selected = df[columns]

# 重命名列
df_selected.columns = ['編号','器名','著录','时代','出土','收藏','尺寸','器形','其他著录','字数','铭文','备注']

print(f"选择了 {len(df_selected.columns)} 个字段")

# 删除重复记录
duplicates = df_selected['編号'].duplicated(keep='first')
if duplicates.sum() > 0:
    print(f"发现 {duplicates.sum()} 条重复记录，已删除")
    df_selected = df_selected[~duplicates]

# 处理空值
df_selected = df_selected.where(pd.notnull(df_selected), None)

# 导入数据库
print("正在导入数据库...")
conn = sqlite3.connect('金文數據库.db')
df_selected.to_sql('金文数据', conn, if_exists='replace', index=False)
conn.commit()
conn.close()

print(f"成功导入 {len(df_selected)} 条记录")
print("数据库创建完成！")
