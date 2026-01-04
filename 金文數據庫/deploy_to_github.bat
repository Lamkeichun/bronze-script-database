@echo off
chcp 65001 >nul
echo ========================================
echo 准备部署到 GitHub
echo ========================================
echo.

REM 检查是否已初始化 Git
if not exist .git (
    echo 正在初始化 Git 仓库...
    git init
    git branch -M main
)

echo 正在添加所有文件到 Git...
git add .

echo.
echo ========================================
echo 提交信息（请输入）：
set /p commit_msg="> "

git commit -m "%commit_msg%"

echo.
echo ========================================
echo 请完成以下步骤：
echo.
echo 1. 访问 https://github.com/new 创建仓库
echo 2. 仓库名建议：金文数据库
echo 3. 创建后，复制仓库 URL
echo.
echo 然后运行命令：
echo git remote add origin [你的仓库URL]
echo git push -u origin main
echo.
echo ========================================
echo.
pause
