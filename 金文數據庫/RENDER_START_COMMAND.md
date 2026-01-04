# Render Start Command 填写指南

## 🎯 Start Command 应该填什么

### ✅ 正确答案：

```
python app.py
```

---

## 📝 完整的 Render 配置

### Build & Deploy 部分：

**Name:**
```
金文数据库
```

**Region:**
```
Singapore (推荐) 或 Oregon
```

**Branch:**
```
main 或 master
```

**Runtime:**
```
Python 3
```

**Build Command:**
```
pip install -r requirements.txt
```

**Start Command:**
```
python app.py
```

**Instance Type:**
```
Free
```

---

## 🔍 为什么是 `python app.py`？

### 原因：

1. **app.py 是主文件**
   - Flask 应用入口
   - 定义了所有路由和API

2. **不需要其他命令**
   - 不需要 gunicorn（Flask 内置服务器即可）
   - 不需要复杂的启动脚本

3. **Render 自动处理**
   - Render 会自动设置端口
   - Flask 会绑定正确的端口

---

## ⚠️ 错误的 Start Command

**❌ 不要用这些：**

```
gunicorn app:app        # 需要额外安装
flask run               # 不适用于生产环境
python -m flask run     # 不适用于生产环境
```

**✅ 正确的：**

```
python app.py
```

---

## 📋 完整配置示例

在 Render 配置页面，填写：

```
┌─────────────────────────────────────────────┐
│ Name: 金文数据库                       │
│ Region: Singapore                       │
│ Branch: main                           │
│                                       │
│ Runtime: Python 3                      │
│                                       │
│ Build Command:                          │
│ pip install -r requirements.txt         │
│                                       │
│ Start Command:                          │
│ python app.py                         │
│                                       │
│ Instance Type: Free                     │
└─────────────────────────────────────────────┘
```

---

## ✅ 验证配置

配置完成后，点击 **"Create Web Service"**

**查看日志：**
1. 部署后点击 **"Logs"**
2. 应该看到：
   ```
   * Running on http://0.0.0.0:5000
   ```

**如果成功：**
- Status 显示 **Live**
- 图标变绿色
- 可以访问应用

**如果失败：**
- Status 显示 **Failed**
- 查看日志了解错误

---

## 🚀 快速参考卡

**Build Command:**
```
pip install -r requirements.txt
```

**Start Command:**
```
python app.py
```

就这么简单！

---

## 📚 参考文档

- Render 文档：https://render.com/docs/deploys
- Flask 部署：https://flask.palletsprojects.com/en/2.3.x/deploying/

---

## 💡 总结

**记住：Start Command = `python app.py`**

- 不需要 gunicorn
- 不需要复杂配置
- Flask 内置服务器足够使用

**填写后点击 Create 即可！**
