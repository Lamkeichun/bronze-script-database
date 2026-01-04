@echo off
chcp 65001 >nul
echo ========================================
echo 推送代码到 GitHub
echo ========================================
echo.

REM 检查远程仓库
git remote -v | findstr origin >nul
if errorlevel 1 (
    echo 未检测到远程仓库
    echo.
    echo 请输入你的 GitHub 仓库 URL：
    echo.
    set /p REPO_URL="> "

    if "%REPO_URL%"=="" (
        echo 错误：URL 不能为空
        pause
        exit /b 1
    )

    echo.
    echo 正在添加远程仓库...
    git remote add origin %REPO_URL%
)

echo.
echo ========================================
echo 开始推送代码...
echo.
echo 如果提示输入：
echo - 用户名：GitHub 用户名
echo - 密码：Personal Access Token（获取：https://github.com/settings/tokens）
echo.
echo ========================================
echo.

git push -u origin master

echo.
if errorlevel 1 (
    echo ========================================
    echo 推送失败！
    echo.
    echo 常见问题：
    echo 1. 密码错误 - 请使用 Personal Access Token
    echo 2. 权限错误 - 确认仓库 URL 正确
    echo 3. 网络问题 - 请检查网络连接
    echo.
    echo 获取 Token：https://github.com/settings/tokens
    echo ========================================
) else (
    echo ========================================
    echo 推送成功！
    echo.
    echo 下一步：
    echo 1. 访问 https://render.com
    echo 2. 用 GitHub 账号登录
    echo 3. 创建 Web Service
    echo 4. 连接"金文数据库"仓库
    echo 5. Build Command: pip install -r requirements.txt
    echo 6. Start Command: python app.py
    echo 7. 点击 Create Web Service
    echo ========================================
)
echo.
pause
