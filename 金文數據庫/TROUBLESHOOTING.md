# 故障排除指南

## 问题：部署后显示 "加载数据失败: HTTP error! status: 404"

### 原因分析

**GitHub ≠ 部署平台**

- GitHub 只是代码托管，不能运行 Flask 应用
- 需要部署到 Render/Railway 等平台才能访问
- 直接访问 GitHub Pages 会 404

---

## 解决方案

### 方案1：部署到 Render（正确方式）

#### 步骤1：确认代码已上传到 GitHub

访问你的 GitHub 仓库：
```
https://github.com/你的用户名/金文数据库
```

看到文件列表说明上传成功。

#### 步骤2：在 Render 部署

1. 访问 https://render.com
2. 登录（推荐用 GitHub 登录）
3. 点击右上角 **"New +"**
4. 选择 **"Web Service"**
5. 点击 **"Connect GitHub"**
6. 授权 Render 访问 GitHub
7. 找到 `金文数据库` 仓库，点击 **Connect**
8. 确认配置：
   - **Name**: 金文数据库
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python app.py`
   - **Branch**: main 或 master
9. 点击 **"Create Web Service"**
10. 等待 3-5 分钟
11. 成功后会显示 URL：
    ```
    https://金文数据库.onrender.com
    ```

#### 步骤3：访问应用

使用 Render 提供的 URL，不是 GitHub URL！

**错误示例：**
❌ https://github.com/用户名/金文数据库（只是代码）

**正确示例：**
✅ https://金文数据库.onrender.com（可运行的网站）

---

### 方案2：本地运行（最稳定）

如果部署困难，先在本地运行：

```bash
cd "d:\金文數據庫"
python app.py
```

访问：http://localhost:5000

---

## 其他常见问题

### Q: Render 部署失败？

**检查配置文件：**
- `render.yaml` 是否存在
- `requirements.txt` 是否包含 `Flask` 和 `Flask-CORS`
- `app.py` 是否正确

**检查日志：**
在 Render Dashboard 点击 Logs 查看错误

### Q: 数据库连接错误？

Render 的文件系统是临时的，SQLite 可能丢失。

**临时方案：**
每次重新部署需要重新导入数据

**永久方案：**
改用 PostgreSQL（Render 免费提供）

### Q: 404 错误？

**检查路由：**
- 确认 `app.py` 中有 `@app.route('/')` 路由
- 确认返回的是 `index_login.html`

**检查文件：**
- `index_login.html` 是否存在
- `app.py` 路径是否正确

### Q: CORS 错误？

检查 `app.py`：
```python
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # 确保这行存在
```

---

## 验证步骤

### 1. 验证 GitHub 上传成功

访问 GitHub 仓库，应该看到：
- ✅ app.py
- ✅ index_login.html
- ✅ script_login.js
- ✅ styles.css
- ✅ requirements.txt
- ✅ render.yaml

### 2. 验证 Render 配置

在 Render Dashboard：
- ✅ Status 显示 Live
- ✅ URL 可访问
- ✅ 没有红色错误信息

### 3. 验证应用运行

访问 Render URL：
- ✅ 页面正常显示
- ✅ 可以输入密码登录
- ✅ 数据可以加载

---

## 快速检查清单

- [ ] 代码已上传到 GitHub
- [ ] GitHub 仓库公开（非私有）
- [ ] Render.yaml 文件存在
- [ ] requirements.txt 包含所有依赖
- [ ] app.py 路由正确
- [ ] Render 配置正确
- [ ] 等待部署完成（Status: Live）
- [ ] 访问 Render URL（不是 GitHub）

---

## 仍需帮助？

### 联系支持

- Render 文档：https://render.com/docs
- GitHub 文档：https://docs.github.com
- Flask 文档：https://flask.palletsprojects.com

### 示例 URL

- GitHub: https://github.com/用户名/金文数据库
- Render: https://金文数据库.onrender.com

---

## 总结

**记住：**
1. GitHub = 代码存储
2. Render = 运行代码的平台
3. 访问 Render URL 才能使用应用
4. 不要直接访问 GitHub URL

**流程：**
```
本地代码 → GitHub → Render → 用户访问
```
