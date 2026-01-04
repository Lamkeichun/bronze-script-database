# 上传到 GitHub 详细步骤

## ✅ 已完成的步骤

1. ✅ Git 仓库已初始化
2. ✅ 所有文件已添加
3. ✅ 已创建初始提交

---

## 📤 接下来：上传到 GitHub

### 第1步：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `金文数据库` (或英文名 `bronze-database`)
   - **Description**: `中国古代青铜器铭文数据库`
   - **Public/Private**: Public（公开）或 Private（私有）
   - **不要勾选** "Initialize this repository"
3. 点击 **Create repository**

### 第2步：连接到 GitHub

**创建仓库后，复制仓库 URL**

示例：
```
https://github.com/你的用户名/金文数据库.git
```

### 第3步：上传代码

**在命令行中执行以下命令：**

```bash
cd "d:\金文數據庫"
git remote add origin https://github.com/你的用户名/金文数据库.git
git push -u origin master
```

**或者一键运行：**
```bash
cd "d:\金文數據庫"
git push -u origin master
```

**如果需要登录：**
```
Username: 你的 GitHub 用户名
Password: 使用 GitHub Personal Access Token（不是登录密码）
```

---

## 🔐 如何获取 Personal Access Token？

1. 访问 https://github.com/settings/tokens
2. 点击 **Generate new token (classic)**
3. 填写：
   - **Note**: Bronze Database
   - **Expiration**: 选择过期时间
   - 勾选 **repo**
4. 点击 **Generate token**
5. 复制生成的 token（只显示一次）
6. 在 git push 时作为密码使用

---

## 💡 完整示例

假设你的 GitHub 用户名是 `zhangsan`：

```bash
cd "d:\金文數據庫"
git remote add origin https://github.com/zhangsan/金文数据库.git
git push -u origin master
```

执行后：
```
Username: zhangsan
Password: ghp_xxxxxxxxxxxxxxxxxxxxxx (输入 token)
```

---

## ⚡ 快速方法（推荐）

创建完 GitHub 仓库后，直接运行这个命令：

```bash
cd "d:\金文數據庫"
echo "请输入你的 GitHub 仓库 URL（如：https://github.com/用户名/仓库名.git）"
set /p REPO_URL=
git remote add origin %REPO_URL%
git push -u origin master
```

---

## 🎯 上传成功后

访问你的仓库：
```
https://github.com/你的用户名/金文数据库
```

看到文件列表就成功了！

---

## 📝 下一步：部署到 Render

上传成功后，查看 `QUICK_DEPLOY.md` 继续部署到 Render。

---

## ❓ 常见问题

**Q: 提示 "Authentication failed"？**
A: 使用 Personal Access Token，不是登录密码

**Q: 提示 "remote origin already exists"？**
A: 运行 `git remote remove origin` 后重试

**Q: 上传很慢？**
A: 数据库文件较大，正常现象，请耐心等待

**Q: 想删除重新上传？**
A:
```bash
git remote remove origin
git remote add origin 新的URL
```

---

## 📚 需要帮助？

- GitHub 文档：https://docs.github.com
- Git 文档：https://git-scm.com/docs
