# Railway 部署详细指南（最推荐）

## ✅ 为什么推荐 Railway？

- ✅ 完全支持 SQLite 数据库
- ✅ 完全免费，无需绑卡
- ✅ 部署超简单
- ✅ URL 永久稳定
- ✅ 自动 HTTPS
- ✅ 全球 CDN
- ✅ 自动部署（GitHub 更新自动部署）
- ✅ 文件系统可读写（数据持久化）

---

## 📋 准备工作

### 确认文件存在

**必需文件：**
- ✅ `app.py` - Flask 应用
- ✅ `index_login.html` - 登录页面
- ✅ `script_login.js` - 前端脚本
- ✅ `styles.css` - 样式文件
- ✅ `requirements.txt` - Python 依赖

**检查命令：**
```bash
dir app.py index_login.html script_login.js styles.css requirements.txt
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

```bash
cd "d:\金文數據庫"
git remote add origin https://github.com/你的用户名/金文数据库.git
git push -u origin master
```

**或运行：**
```
final_push.bat
```

---

### 第2步：部署到 Railway

#### 2.1 访问 Railway

打开浏览器：
```
https://railway.app
```

#### 2.2 注册/登录

**注册账号：**
1. 点击 **"Start a new project"**
2. 选择 **"Continue with GitHub"**（推荐）
3. 授权 Railway 访问 GitHub
4. 等几秒自动登录

#### 2.3 创建新项目

1. 登录后，点击 **"New Project"**
2. 或直接点击主页的 **"Start a new project"**

#### 2.4 从 GitHub 部署

1. 在 "Deploy from GitHub repo" 部分
2. 找到 **"金文数据库"** 仓库
3. 点击右侧的 **"Deploy Now"** 按钮

#### 2.5 配置项目（自动检测）

Railway 会自动检测到 Python 项目：

**Project Name:**
```
金文数据库
```

**Region:**
```
Singapore（推荐）或 Oregon
```

**Variables (环境变量):**
通常不需要手动配置，Railway 会自动设置。

#### 2.6 确认部署

点击 **"Deploy"** 按钮

---

### 第3步：等待部署完成

#### 3.1 查看部署状态

部署过程（3-5 分钟）：

**Building:**
- 📦 正在构建
- 📥 正在安装依赖
- ⚙️ 正在配置

**Deploying:**
- 🚀 正在部署

**Running:**
- ✅ 部署成功
- 状态显示 **Running**

#### 3.2 获取访问 URL

部署完成后，在项目页面会显示：

**Domains 部分：**
```
https://金文数据库.up.railway.app
```

**复制这个 URL！**

---

## 🎯 访问应用

### 打开浏览器访问：

```
https://金文数据库.up.railway.app
```

**测试功能：**
1. ✅ 页面正常显示
2. ✅ 可以输入密码（2004）
3. ✅ 登录后数据加载成功
4. ✅ 搜索功能正常
5. ✅ 高级筛选正常

---

## 💡 平台对比

| 功能 | Vercel | Railway | Render |
|------|---------|----------|---------|
| SQLite 支持 | ❌ | ✅ | ✅ |
| 文件可写 | ❌ | ✅ | ⚠️ 临时 |
| 免费额度 | 无限 | 有限 | 充足 |
| 无需绑卡 | ✅ | ✅ | ⚠️ 可能要求 |
| 部署速度 | 快 | 快 | 中等 |
| 稳定性 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 推荐度 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

**结论：Railway 是最佳选择！**

---

## 🔧 故障排除

### 问题1：部署失败

**错误：Build failed**

**解决：**
检查 `requirements.txt` 内容：
```
Flask==2.3.2
Flask-CORS==4.0.0
```

### 问题2：访问 502 Bad Gateway

**原因：**
应用启动失败

**解决：**
1. 查看 Railway 日志
2. 检查 `app.py` 是否有错误
3. 确认 Flask 应用正常启动

### 问题3：数据库连接失败

**错误：Database connection error**

**解决：**
1. 检查 `金文數據库.db` 是否已上传到 GitHub
2. 确认数据库文件路径正确

### 问题4：查看日志

**方法：**
1. 进入 Railway Dashboard
2. 点击你的项目
3. 点击 **"Deployments"** 标签
4. 点击最新的部署
5. 查看 **"Logs"**

---

## 🔄 更新代码

### 修改本地代码后：

```bash
cd "d:\金文數據庫"
git add .
git commit -m "更新功能"
git push origin master
```

### Railway 自动部署：

**无需手动操作！**
- Railway 检测到 GitHub 有新提交
- 自动触发部署
- 2-3 分钟后更新完成

---

## 📚 参考文档

- Railway 官方文档：https://docs.railway.app
- Python 部署：https://docs.railway.app/guides/Deploying-with-Docker
- Flask 部署：https://docs.railway.app/guides/Deploying-Python-Flask

---

## 🎉 完成！

部署成功后，你将获得：
- ✅ 永久稳定的 URL
- ✅ HTTPS 支持
- ✅ 全球 CDN 加速
- ✅ 自动部署（更新代码自动更新）
- ✅ SQLite 完全支持
- ✅ 数据持久化（不会丢失）
- ✅ 完全免费
- ✅ 无需绑卡

---

## 💡 快速参考

### 访问地址
```
https://金文数据库.up.railway.app
```

### Railway Dashboard
```
https://railway.app/dashboard
```

### GitHub 仓库
```
https://github.com/你的用户名/金文数据库
```

---

## 🎯 推荐方案总结

### 最佳方案：Railway

**为什么：**
1. ✅ 完全支持 SQLite
2. ✅ 数据不会丢失
3. ✅ 无需绑卡
4. ✅ 部署简单
5. ✅ 自动更新

### 备选方案：本地运行

```bash
cd "d:\金文數據庫"
python app.py
访问：http://localhost:5000
```

**优点：**
- 最稳定
- 完全免费
- 无需部署

---

## 🚀 现在就开始

### 最简单的流程：

1. **推送代码到 GitHub**（2分钟）
   ```bash
   cd "d:\金文數據庫"
   final_push.bat
   ```

2. **在 Railway 部署**（3分钟）
   - 访问 https://railway.app
   - 用 GitHub 登录
   - 选择"金文数据库"仓库
   - 点击 Deploy Now

3. **访问应用**
   ```
   https://金文数据库.up.railway.app
   ```

**就这么简单！5分钟搞定！**

---

## ❓ 需要帮助？

如果遇到问题：
1. 查看 Railway 的部署日志
2. 确认所有文件已上传到 GitHub
3. 检查 `requirements.txt` 配置

祝部署顺利！🎉
