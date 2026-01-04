# 部署到稳定平台指南

## 推荐方案：Render（免费、稳定）

### 为什么选择 Render？
- ✅ 免费套餐充足
- ✅ 支持 Python Flask
- ✅ URL 永久稳定
- ✅ 支持 SQLite 数据库
- ✅ 自动部署
- ✅ 全球 CDN 加速

---

## 部署步骤

### 方法1：使用 Render.yaml（最简单）

#### 1. 安装 Git（如果未安装）
访问 https://git-scm.com/downloads 下载安装

#### 2. 创建 GitHub 仓库
1. 访问 https://github.com/new
2. 创建新仓库，命名为 `金文数据库`
3. 不要初始化 README

#### 3. 上传代码到 GitHub

**Windows 命令：**
```bash
cd "d:\金文數據庫"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/金文数据库.git
git push -u origin main
```

#### 4. 在 Render 部署

1. 访问 https://render.com
2. 点击 **"New +"** → **"Web Service"**
3. 选择 **"Connect GitHub"**
4. 找到 `金文数据库` 仓库并点击 **Connect**
5. Render 会自动检测到 `render.yaml` 配置
6. 点击 **"Create Web Service"**
7. 等待 3-5 分钟部署完成
8. 访问生成的 URL（永久稳定）

---

### 方法2：手动配置 Render

如果 `render.yaml` 不生效，手动配置：

1. 访问 https://dashboard.render.com
2. **New** → **Web Service**
3. **GitHub** → 选择仓库
4. 填写配置：

**Build & Deploy:**
- **Name**: `金文数据库`
- **Region**: Singapore（推荐）或 Oregon
- **Branch**: `main`
- **Runtime**: `Python 3`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `python app.py`

**Advanced:**
- **Instance Type**: `Free`

5. 点击 **Create Web Service**

---

## 其他稳定平台

### Railway

```bash
# 1. 安装 CLI
npm i -g @railway/cli

# 2. 登录
railway login

# 3. 初始化
cd "d:\金文數據庫"
railway init

# 4. 部署
railway up
```

### Vercel（适合静态+API）

```bash
# 1. 安装 CLI
npm i -g vercel

# 2. 部署
cd "d:\金文數據庫"
vercel
```

### Fly.io

```bash
# 1. 安装 CLI
# 访问 https://fly.io/docs/hands-on/install/ 下载

# 2. 登录
flyctl auth login

# 3. 部署
cd "d:\金文數據庫"
fly launch
```

---

## Docker 部署（最稳定）

如果服务器支持 Docker，这是最稳定的方式：

```bash
# 1. 构建镜像
docker build -t 金文数据库 .

# 2. 运行容器
docker run -d -p 5000:5000 --name 金文数据库 金文数据库

# 3. 访问
# http://localhost:5000
```

---

## 常见问题

### 1. SQLite 数据库问题
Render 的文件系统是临时的，数据库可能会丢失。

**解决方案：使用 PostgreSQL**
- Render 免费提供 PostgreSQL
- 需要修改代码使用 PostgreSQL

**临时方案：定期备份**
```python
# 添加备份脚本
import shutil
import os
from datetime import datetime

def backup_db():
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    shutil.copy2('金文數據库.db', f'backup_{timestamp}.db')
```

### 2. 域名绑定
- Render 免费域名：`xxx.onrender.com`
- 可以绑定自定义域名（需升级套餐）

### 3. 数据持久化
```yaml
# render.yaml 添加
disk:
  name: data
  mountPath: /app
  sizeGB: 1
```

---

## 推荐方案对比

| 平台 | 免费额度 | 稳定性 | 部署难度 | 推荐度 |
|------|---------|--------|---------|--------|
| Render | 充足 | ⭐⭐⭐⭐⭐ | 简单 | ⭐⭐⭐⭐⭐⭐ |
| Railway | 有限 | ⭐⭐⭐⭐ | 简单 | ⭐⭐⭐⭐ |
| Vercel | 有限 | ⭐⭐⭐⭐⭐ | 简单 | ⭐⭐⭐ |
| Fly.io | 有限 | ⭐⭐⭐⭐ | 中等 | ⭐⭐⭐⭐ |

---

## 快速开始（推荐 Render）

**总结：最简单的方式**

1. 把代码推送到 GitHub
2. 在 Render 连接仓库
3. 点击部署
4. 5分钟后获得永久 URL

**需要帮助？**
- Render 文档：https://render.com/docs
- GitHub 文档：https://docs.github.com

---

## 当前代码已准备好的文件

✅ `render.yaml` - Render 配置文件
✅ `requirements.txt` - Python 依赖
✅ `Dockerfile` - Docker 配置
✅ `.dockerignore` - 忽略文件

直接按照上述步骤部署即可！
