# 完整部署到 Render 指南

## 📋 当前状态

- ✅ 代码已准备完成
- ✅ render.yaml 配置已添加
- ⚠️ 还未连接到 GitHub 仓库

---

## 🎯 完整部署流程（3步搞定）

### 第1步：上传到 GitHub

#### 1.1 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 填写信息：
   - **Repository name**: `金文数据库`
   - **Description**: 中国古代青铜器铭文数据库
   - **Public/Private**: Public（公开）
   - ❌ 不要勾选 "Initialize this repository"
3. 点击 **Create repository**

#### 1.2 连接并推送

创建后，复制仓库 URL：
```
https://github.com/你的用户名/金文数据库.git
```

**运行以下命令：**
```bash
cd "d:\金文數據庫"
git remote add origin https://github.com/你的用户名/金文数据库.git
git push -u origin master
```

**提示：**
- Username: 你的 GitHub 用户名
- Password: 使用 Personal Access Token（获取方法见下文）

#### 1.3 获取 Personal Access Token

如果 git push 需要密码：

1. 访问 https://github.com/settings/tokens
2. 点击 **Generate new token (classic)**
3. 填写：
   - **Note**: Bronze Database
   - **Expiration**: 选择过期时间（推荐 90 days）
   - ✅ 勾选 **repo**
4. 点击 **Generate token**
5. 复制 token（只显示一次）

**重要：**
- Token 是一串字母数字，如：`ghp_xxxxxxxxxxxxx`
- 在 git push 时作为密码输入
- 不要使用 GitHub 登录密码

---

### 第2步：部署到 Render

#### 2.1 访问 Render

```
https://render.com
```

#### 2.2 登录

1. 点击 **Sign In**
2. 选择 **Sign in with GitHub**（最简单）
3. 授权 Render 访问 GitHub

#### 2.3 创建 Web Service

1. 点击右上角 **New +**
2. 选择 **Web Service**

#### 2.4 连接仓库

1. 点击 **Connect GitHub**
2. 找到 **金文数据库** 仓库
3. 点击 **Connect**

#### 2.5 配置部署

确认以下信息：

**基础设置：**
- **Name**: 金文数据库
- **Region**: Singapore（推荐）
- **Branch**: main 或 master

**构建设置：**
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `python app.py`

**实例设置：**
- **Instance Type**: Free

#### 2.6 创建服务

点击 **Create Web Service**

#### 2.7 等待部署

- 等待 3-5 分钟
- 状态：Queued → Building → Deployed → Live
- 完成后状态图标变绿色

---

### 第3步：访问应用

#### 3.1 获取 URL

在 Render Dashboard，你的服务页面会显示：
```
https://金文数据库-xxxx.onrender.com
```

**复制这个 URL！**

#### 3.2 访问测试

1. 打开浏览器
2. 访问 Render 提供的 URL
3. 应该看到登录页面
4. 输入密码：2004
5. 开始使用

---

## ✅ 验证清单

部署完成后检查：

- [ ] GitHub 仓库可以看到所有文件
- [ ] Render Status 显示 Live（绿色）
- [ ] 访问 Render URL 可以看到页面
- [ ] 可以输入密码登录
- [ ] 数据可以正常加载
- [ ] 搜索功能正常

---

## 📁 文件检查

确认以下文件在 GitHub 上：

**必需文件：**
- ✅ `app.py` - Flask 应用
- ✅ `index_login.html` - 登录页面
- ✅ `script_login.js` - 前端脚本
- ✅ `styles.css` - 样式文件
- ✅ `requirements.txt` - 依赖列表
- ✅ `render.yaml` - Render 配置

**可选文件：**
- ✅ `ZKing.ttf` - 字体文件
- ✅ `金文數據库.db` - 数据库文件

---

## 🔧 故障排除

### 问题1：git push 失败

**错误：Authentication failed**

**解决：**
使用 Personal Access Token，不要使用 GitHub 密码

**错误：remote origin already exists**

**解决：**
```bash
git remote remove origin
git remote add origin 正确的URL
```

### 问题2：Render 部署失败

**检查日志：**
在 Render Dashboard → Logs

**常见错误：**

**Module not found**
```
解决：确保 requirements.txt 包含 Flask 和 Flask-CORS
```

**File not found**
```
解决：确保所有文件已上传到 GitHub
```

**Build failed**
```
解决：检查 Python 版本是否为 3.x
```

### 问题3：访问 404

**错误原因：**
访问了 GitHub URL 而不是 Render URL

**解决：**
使用 Render Dashboard 显示的 `.onrender.com` URL

**示例：**
```
❌ 错误：https://github.com/用户名/金文数据库
✅ 正确：https://金文数据库-xxxx.onrender.com
```

### 问题4：数据库连接错误

**原因：**
Render 文件系统是临时的

**临时方案：**
每次重新部署需要重新导入数据

**查看日志：**
在 Render Dashboard 查看具体错误信息

---

## 🎯 快速命令参考

### GitHub 操作

```bash
# 初始化仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "描述信息"

# 连接远程仓库
git remote add origin [仓库URL]

# 推送
git push -u origin master
```

### 本地测试

```bash
# 启动本地服务器
cd "d:\金文數據庫"
python app.py

# 访问
http://localhost:5000
```

---

## 📖 参考文档

- **详细步骤**：打开 `RENDER_STEP_BY_STEP.md`
- **故障排除**：打开 `TROUBLESHOOTING.md`
- **Render 文档**：https://render.com/docs
- **GitHub 文档**：https://docs.github.com

---

## 🚀 现在就开始

**最简单的流程：**

1. 打开浏览器创建 GitHub 仓库
   ```
   https://github.com/new
   ```

2. 运行命令推送代码
   ```bash
   cd "d:\金文數據庫"
   git remote add origin https://github.com/用户名/金文数据库.git
   git push -u origin master
   ```

3. 访问 Render 部署
   ```
   https://render.com
   ```

4. 等待 5 分钟，获得永久 URL

**就这么简单！**

---

## 💡 提示

**记住：**
1. GitHub = 存放代码
2. Render = 运行代码
3. 访问 Render URL 才能使用应用

**不要：**
- ❌ 访问 GitHub URL 想运行应用
- ❌ 在 GitHub 上查找 .onrender.com URL

**要：**
- ✅ 使用 Render Dashboard 获取 URL
- ✅ 访问 Render 提供的 .onrender.com URL

---

## 📞 需要帮助？

如果遇到问题：

1. 查看相关文档
2. 检查 Render 日志
3. 确认所有文件已上传
4. 使用正确的 URL 访问应用

祝部署顺利！🎉
