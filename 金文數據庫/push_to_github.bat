@echo off
chcp 65001 >nul
echo ========================================
echo 上传代码到 GitHub
echo ========================================
echo.

REM 检查是否已有远程仓库
git remote -v | findstr origin >nul
if errorlevel 1 (
    echo 请输入你的 GitHub 仓库 URL
    echo.
    echo 示例：https://github.com/用户名/金文数据库.git
    echo.
    set /p REPO_URL="> "
    git remote add origin %REPO_URL%
) else (
    echo 已检测到远程仓库
    git remote -v
    echo.
    set /p CONTINUE="是否继续推送到现有仓库？(Y/N): "
    if /i not "%CONTINUE%"=="Y" (
        echo 取消操作
        pause
        exit /b 0
    )
)

echo.
echo ========================================
echo 开始推送...
echo.
echo 如果提示输入密码：
echo - 用户名：GitHub 用户名
echo - 密码：Personal Access Token（不是登录密码）
echo.
echo ========================================
echo.

git push -u origin master

echo.
echo ========================================
if errorlevel 1 (
    echo 推送失败！
    echo.
    echo 常见问题：
    echo 1. 密码错误 - 需要使用 Personal Access Token
    echo 2. 网络问题 - 请检查网络连接
    echo 3. 权限问题 - 确认仓库 URL 正确
    echo.
    echo 获取 Token：https://github.com/settings/tokens
) else (
    echo 上传成功！
    echo.
    echo 访问你的仓库查看：
    echo https://github.com/你的用户名/金文数据库
    echo.
    echo 下一步：查看 QUICK_DEPLOY.md 部署到 Render
)
echo ========================================
pause
