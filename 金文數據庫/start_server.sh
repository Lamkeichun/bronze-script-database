#!/bin/bash

echo "========================================"
echo "金文数据库服务器启动脚本"
echo "========================================"
echo

echo "正在检查Python环境..."
if ! command -v python3 &> /dev/null; then
    echo "错误：未找到Python3，请先安装Python"
    exit 1
fi

echo "Python环境检查通过"
echo

echo "正在安装依赖..."
pip3 install -q flask flask-cors

echo
echo "========================================"
echo "正在启动服务器..."
echo "服务器地址: http://localhost:5000"
echo "按 Ctrl+C 停止服务器"
echo "========================================"
echo

python3 app.py
