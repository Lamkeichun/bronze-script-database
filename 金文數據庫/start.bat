@echo off
chcp 65001 >nul
echo ========================================
echo 金文数据库服务器
echo ========================================
echo.

cd /d "%~dp0"

echo 正在启动服务器...
echo 服务地址: http://localhost:5000
echo 按 Ctrl+C 停止服务器
echo ========================================
echo.

python app.py
