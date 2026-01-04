@echo off
chcp 65001 >nul
echo ========================================
echo 金文数据库服务器启动脚本
echo ========================================
echo.

echo 正在检查Python环境...
python --version >nul 2>&1
if errorlevel 1 (
    echo 错误：未找到Python，请先安装Python
    pause
    exit /b 1
)

echo Python环境检查通过
echo.

echo 正在安装依赖...
pip install -q flask flask-cors
if errorlevel 1 (
    echo 警告：依赖安装可能失败，尝试继续启动
)

echo.
echo ========================================
echo 正在启动服务器...
echo 服务器地址: http://localhost:5000
echo 按 Ctrl+C 停止服务器
echo ========================================
echo.

python app.py
