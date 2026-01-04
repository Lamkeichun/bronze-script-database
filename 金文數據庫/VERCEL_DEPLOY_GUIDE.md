# Vercel 部署详细指南

## ✅ 为什么选择 Vercel？

- ✅ 完全免费，无需绑卡
- ✅ 部署超简单，几步搞定
- ✅ URL 永久稳定
- ✅ 全球 CDN 加速
- ✅ 自动 HTTPS
- ✅ 支持 GitHub 自动部署

---

## 📋 准备工作

### 确认文件存在

确保以下文件在项目中：

**必需文件：**
- ✅ `app.py` - Flask 应用
- ✅ `index_login.html` - 登录页面
- ✅ `script_login.js` - 前端脚本
- ✅ `styles.css` - 样式文件
- ✅ `requirements.txt` - Python 依赖
- ✅ `vercel.json` - Vercel 配置（已为您创建）

**检查命令：**
```bash
dir app.py index_login.html script_login.js styles.css requirements.txt vercel.json
```

---

## 🚀 完整部署步骤（3步搞定）

### 第1步：上传到 GitHub（如果还没上传）

#### 1.1 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 填写：
   - **Repository name**: `金文数据库`
   - **Description**: 中国古代青铜器铭文数据库
   - **Public/Private**: Public
   - ❌ 不要勾选 "Initialize this repository"
3. 点击 **Create repository**

#### 1.2 推送代码

运行以下命令：

```bash
cd "d:\金文數據庫"
git remote add origin https://github.com/你的用户名/金文数据库.git
git push -u origin master
```

**或者运行自动脚本：**
```
final_push.bat
```

---

### 第2步：部署到 Vercel

#### 2.1 访问 Vercel

打开浏览器：
```
https://vercel.com
```

#### 2.2 注册/登录

**注册账号：**
1. 点击 **"Sign Up"**
2. 选择 **"Continue with GitHub"**（推荐）
3. 授权 Vercel 访问 GitHub
4. 等几秒自动登录

#### 2.3 创建新项目

1. 登录后，点击右上角 **"Add New..."**
2. 选择 **"Project"**

#### 2.4 导入 GitHub 仓库

1. 在 "Import Git Repository" 部分
2. 找到 **"金文数据库"** 仓库
3. 点击右侧的 **"Import"** 按钮

#### 2.5 配置项目（通常自动检测）

Vercel 会自动检测配置：

**Project Settings:**
- **Name**: 金文数据库
- **Framework Preset**: Python
- **Root Directory**: `./`
- **Build Command**: `pip install -r requirements.txt`
- **Output Directory**: `.`
- **Install Command**: 留空

**Environment Variables (可选):**
- **PORT**: `5000`

#### 2.6 创建部署

点击页面底部的 **"Deploy"** 按钮

---

### 第3步：等待部署完成

#### 3.1 查看部署状态

部署过程（2-3 分钟）：

**Building:**
- 📦 正在打包代码
- 📥 正在安装依赖
- ⚙️ 正在构建

**Deploying:**
- 🚀 正在部署到服务器

**Completed:**
- ✅ 部署成功
- 状态图标变绿色

#### 3.2 获取访问 URL

部署完成后，页面会显示：

**Domains 部分：**
```
https://金文数据库.vercel.app
```

**复制这个 URL！**

---

## 🎯 访问应用

### 打开浏览器访问：

```
https://金文数据库.vercel.app
```

**测试功能：**
1. ✅ 页面正常显示
2. ✅ 可以输入密码（2004）
3. ✅ 登录后数据加载成功
4. ✅ 搜索功能正常

---

## 📝 Vercel 配置文件说明

我已经为您创建了 `vercel.json`：

```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/app.py"
    }
  ]
}
```

**这个文件的作用：**
- 告诉 Vercel 如何构建项目
- 指定使用 Python 运行时
- 配置路由规则

---

## 🔧 故障排除

### 问题1：构建失败

**错误：Module not found**

**解决：**
检查 `requirements.txt` 是否包含：
```
Flask==2.3.2
Flask-CORS==4.0.0
```

### 问题2：部署成功但无法访问

**错误：404 Not Found**

**原因：**
可能是 `vercel.json` 配置问题

**解决：**
使用我提供的 `vercel.json` 配置

### 问题3：数据库连接失败

**错误：Database connection error**

**原因：**
Vercel 的文件系统是只读的

**临时方案：**
使用外部数据库（需要修改代码）

**永久方案：**
改用 Render 或 Railway（支持 SQLite）

### 问题4：登录后加载数据失败

**错误：HTTP error! status: 500

**解决：**
检查 Vercel 的部署日志：
1. 进入 Vercel Dashboard
2. 点击你的项目
3. 点击 **"Deployments"** 标签
4. 点击最新的部署
5. 查看 **"Build Logs"** 或 **"Function Logs"**

---

## 💡 与其他平台对比

| 平台 | 免费额度 | 是否需要绑卡 | SQLite 支持 | 推荐度 |
|------|---------|------------|-------------|--------|
| **Vercel** | 无限 | ✅ 不需要 | ❌ 不支持 | ⭐⭐⭐⭐ |
| **Railway** | 有限 | ✅ 不需要 | ✅ 支持 | ⭐⭐⭐⭐⭐⭐ |
| **Render** | 充足 | ⚠️ 可能要求 | ✅ 支持 | ⭐⭐⭐⭐⭐ |

---

## 🔄 更新代码

### 修改本地代码后：

```bash
cd "d:\金文數據庫"
git add .
git commit -m "更新功能"
git push origin master
```

### Vercel 自动部署：

**无需手动操作！**
- Vercel 检测到 GitHub 有新提交
- 自动触发部署
- 1-2 分钟后更新完成

---

## 📚 参考文档

- Vercel 官方文档：https://vercel.com/docs
- Python 部署指南：https://vercel.com/docs/solutions/python
- Flask 部署：https://vercel.com/docs/solutions/frameworks/flask

---

## 🎉 完成！

部署成功后，你将获得：
- ✅ 永久稳定的 URL
- ✅ HTTPS 支持
- ✅ 全球 CDN 加速
- ✅ 自动部署（更新代码自动更新）
- ✅ 完全免费
- ✅ 无需绑卡

---

## 💡 快速参考

### 访问地址
```
https://金文数据库.vercel.app
```

### Vercel Dashboard
```
https://vercel.com/dashboard
```

### GitHub 仓库
```
https://github.com/你的用户名/金文数据库
```

---

## ⚠️ 重要提示

### SQLite 在 Vercel 的限制：

Vercel 的 serverless 函数是**只读文件系统**：
- ❌ 不支持 SQLite 数据库写入
- ❌ 每次部署后数据会丢失

### 解决方案：

**方案1：使用 Railway（推荐）**
- ✅ 完全支持 SQLite
- ✅ 无需绑卡
- ✅ 免费套餐

**方案2：改用 PostgreSQL**
- 修改代码连接 PostgreSQL
- Vercel 提供 Postgres 插件

**方案3：本地运行（最稳定）**
- ```bash
  cd "d:\金文數據庫"
  python app.py
  ```
- 访问：http://localhost:5000

---

## 🎯 总结

**Vercel 适合：**
- ✅ 纯静态网站
- ✅ 使用外部数据库的应用
- ✅ 演示项目

**Vercel 不适合：**
- ❌ 使用 SQLite 的应用
- ❌ 需要文件写入的应用

**推荐方案：**
1. **最稳定** → 本地运行
2. **SQLite 支持好** → Railway
3. **仅测试** → Vercel

---

## 🚀 现在就开始

### 如果要测试：

1. 按照上述步骤部署到 Vercel
2. 获取 URL 后测试功能
3. 如果遇到 SQLite 问题，改用 Railway

### 如果要稳定使用：

**推荐 Railway：**
1. 访问 https://railway.app
2. 部署（详见 Railway 指南）
3. 完全支持 SQLite
4. 无需绑卡

---

## ❓ 需要帮助？

如果遇到问题：
1. 查看 Vercel 的部署日志
2. 确认所有文件已上传到 GitHub
3. 检查 `vercel.json` 配置

祝部署顺利！🎉
