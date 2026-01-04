# 金文数据库

中国古代青铜器铭文数据库，支持智能多关键词搜索和正则表达式。

## 功能特性

- ✅ 智能多关键词搜索（支持OR/AND模式）
- ✅ 正则表达式搜索
- ✅ 高级分类筛选
- ✅ 分页浏览
- ✅ 响应式设计

## 本地运行

### 方法1：使用批处理脚本（Windows）

双击运行 `start_server.bat`

### 方法2：手动启动

```bash
# 安装依赖
pip install flask flask-cors

# 启动服务器
python app.py
```

### 方法3：使用PowerShell

```powershell
cd "d:\金文數據庫"
python app.py
```

## 访问地址

启动后访问：**http://localhost:5000**

## 部署到其他平台

### Vercel

1. 安装 Vercel CLI：`npm i -g vercel`
2. 运行：`vercel deploy`

### Render

1. 创建 `render.yaml` 文件
2. 推送到 GitHub
3. 在 Render 中连接仓库

### Railway

1. 安装 Railway CLI：`npm i -g @railway/cli`
2. 运行：`railway login` 和 `railway init`
3. 部署：`railway up`

## 技术栈

- 后端：Python Flask
- 前端：原生 HTML/CSS/JavaScript
- 数据库：SQLite
- CORS：Flask-CORS

## 注意事项

- 数据库文件：`金文數據库.db`
- 登录密码：2004
