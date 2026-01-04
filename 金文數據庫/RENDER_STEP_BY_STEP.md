# Render 部署图文指南

## ✅ 准备工作已完成

- ✅ 代码已上传到 GitHub
- ✅ render.yaml 配置文件已添加
- ✅ 所有必需文件已提交

---

## 📖 详细部署步骤

### 第1步：注册/登录 Render

#### 1.1 访问 Render

在浏览器打开：
```
https://render.com
```

#### 1.2 登录

1. 点击右上角 **"Sign In"**
2. 选择 **"Sign in with GitHub"**（推荐）
3. 授权 Render 访问 GitHub
4. 等几秒自动跳转到 Dashboard

---

### 第2步：创建 Web Service

#### 2.1 找到创建按钮

在 Render Dashboard 页面：
1. 找到右上角 **"New +"** 按钮
2. 点击它

#### 2.2 选择服务类型

会弹出菜单，选择：
```
"Web Service"
```

---

### 第3步：连接 GitHub

#### 3.1 点击连接 GitHub

在 Web Service 配置页面：
1. 找到 **"Build and deploy from a Git repository"**
2. 点击 **"Connect GitHub"** 按钮

#### 3.2 授权访问

1. 如果第一次使用，会跳转到 GitHub 授权页面
2. 点击 **"Authorize Render"** 按钮授权

---

### 第4步：选择仓库

#### 4.1 找到你的仓库

授权后，会显示你的 GitHub 仓库列表：
1. 搜索或浏览找到 **"金文数据库"** 仓库
2. 点击仓库右侧的 **"Connect"** 按钮

---

### 第5步：配置部署

#### 5.1 检查自动配置

连接仓库后，Render 会自动检测 `render.yaml`：
- ✅ 如果显示 "Found render.yaml"，继续下一步
- ❌ 如果没有找到，手动配置（见下文）

#### 5.2 手动配置（如果需要）

如果 render.yaml 未被检测到，填写以下信息：

**Name (名称):**
```
金文数据库
```

**Region (区域):**
```
Singapore (推荐) 或 Oregon
```

**Branch (分支):**
```
main 或 master
（根据你仓库的默认分支选择）
```

**Runtime (运行时):**
```
Python 3
```

**Build Command (构建命令):**
```
pip install -r requirements.txt
```

**Start Command (启动命令):**
```
python app.py
```

**Instance Type (实例类型):**
```
Free
```

---

### 第6步：创建服务

#### 6.1 确认配置

检查所有配置是否正确：
- ✅ Name: 金文数据库
- ✅ Branch: main/master
- ✅ Build Command: pip install -r requirements.txt
- ✅ Start Command: python app.py
- ✅ Instance Type: Free

#### 6.2 点击创建

点击页面底部的 **"Create Web Service"** 按钮

---

### 第7步：等待部署

#### 7.1 查看部署状态

创建后，会跳转到服务页面，显示部署状态：

**阶段1：Queued**
- 状态：⏳ 排队中
- 等待：1-2 分钟

**阶段2：Building**
- 状态：🔨 构建中
- 显示：安装依赖、编译代码
- 等待：2-3 分钟

**阶段3：Deployed**
- 状态：✅ 已部署
- 状态图标变绿色

**阶段4：Live**
- 状态：🟢 运行中
- 页面右上角显示 "Live"

**总时间：3-5 分钟**

---

### 第8步：获取访问 URL

#### 8.1 查看 URL

服务页面顶部会显示：
```
https://金文数据库-xxxx.onrender.com
```

**复制这个 URL！这就是你要访问的网站地址**

#### 8.2 访问应用

1. 点击 URL 或粘贴到浏览器
2. 应该看到金文数据库登录页面
3. 输入密码：2004
4. 开始使用

---

## ⚠️ 重要提醒

### ✅ 正确的访问方式

**使用 Render 提供的 URL：**
```
✅ https://金文数据库-xxxx.onrender.com
```

### ❌ 错误的访问方式

**不要使用这些：**
```
❌ https://github.com/用户名/金文数据库
❌ https://github.com/用户名/金文数据库/blob/main/index_login.html
```

---

## 🔍 验证部署成功

### 检查清单

访问 Render URL 后，确认：

- [ ] 页面正常显示
- [ ] 可以输入密码
- [ ] 登录后数据加载成功
- [ ] 搜索功能正常
- [ ] 没有报错

### 如果有问题

**查看日志：**
1. 在 Render 服务页面
2. 点击 **"Logs"** 标签
3. 查看错误信息

---

## 📝 常见问题

### Q1: 部署一直失败？

**检查文件：**
- render.yaml 是否正确上传
- requirements.txt 是否存在
- app.py 是否可以正常运行

**本地测试：**
```bash
cd "d:\金文數據庫"
python app.py
# 访问 http://localhost:5000 测试
```

### Q2: 访问 404？

**原因：**
访问了 GitHub URL 而不是 Render URL

**解决：**
使用 Render Dashboard 显示的 `.onrender.com` URL

### Q3: 数据库连接错误？

**原因：**
Render 文件系统是临时的

**临时方案：**
每次重新部署需要重新导入数据

**查看日志：**
在 Render Dashboard 查看具体错误

### Q4: 如何更新代码？

**方法：**
```bash
# 1. 修改本地代码
# 2. 提交到 GitHub
cd "d:\金文數據庫"
git add .
git commit -m "更新功能"
git push origin master

# 3. Render 会自动重新部署
```

---

## 🎯 快速参考

### Render Dashboard URL
```
https://dashboard.render.com
```

### 你的应用 URL
```
https://金文数据库-xxxx.onrender.com
```

### GitHub 仓库
```
https://github.com/你的用户名/金文数据库
```

---

## 📚 相关文档

- Render 官方文档：https://render.com/docs
- Flask 部署指南：https://flask.palletsprojects.com/en/2.3.x/deploying/
- 故障排除：查看 `TROUBLESHOOTING.md`

---

## 🎉 完成！

部署成功后，你将获得：
- ✅ 永久稳定的 URL
- ✅ HTTPS 支持
- ✅ 全球 CDN 加速
- ✅ 自动部署（代码更新自动更新）

**现在就去部署吧！**
