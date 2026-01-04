# 金文数据库网站

一个基于 Flask 的金文数据库展示网站，提供中国古代青铜器铭文的在线浏览和查询功能。

## 功能特点

- 🔍 **全文搜索**: 支持按编号、器名、铭文、著录进行搜索
- 📊 **数据筛选**: 可按时代、收藏机构进行筛选
- 📄 **分页展示**: 每页显示20条记录，支持快速导航
- 📱 **响应式设计**: 适配桌面和移动设备
- 🎨 **美观界面**: 现代化的UI设计
- 📈 **统计信息**: 显示总记录数、时代分布等统计数据

## 技术栈

- **后端**: Flask + SQLite
- **前端**: HTML5 + CSS3 + JavaScript (ES6+)
- **API**: RESTful API

## 项目结构

```
d:\金文數據庫\
├── app.py              # Flask应用主文件
├── index.html          # 前端页面
├── styles.css          # 样式文件
├── script.js           # 前端逻辑
├── 金文數據库.db        # SQLite数据库
├── 金文數據庫數據.xlsx  # 原始Excel数据
├── requirements.txt    # Python依赖
└── README.md          # 项目说明
```

## 安装和运行

### 1. 安装依赖

```bash
pip install -r requirements.txt
```

### 2. 启动服务器

```bash
python app.py
```

服务器将在 `http://localhost:5000` 启动

### 3. 访问网站

在浏览器中打开: `http://localhost:5000`

## API接口

### 获取文物列表
```
GET /api/artifacts?page=1&page_size=20&search=&era=&collection=
```

参数:
- `page`: 页码（默认1）
- `page_size`: 每页数量（默认20）
- `search`: 搜索关键词
- `era`: 时代筛选
- `collection`: 收藏机构筛选

### 获取单个文物详情
```
GET /api/artifacts/<artifact_id>
```

### 获取时代列表
```
GET /api/eras
```

### 获取收藏机构列表
```
GET /api/collections
```

### 获取统计数据
```
GET /api/statistics
```

## 数据库结构

**表名**: 金文数据

**字段**:
- id: 主键
- 編号: 文物编号（唯一）
- 器名: 器物名称
- 著录: 著录来源
- 时代: 历史时代
- 出土: 出土信息
- 收藏: 收藏机构
- 尺寸: 器物尺寸
- 器形: 器形描述
- 其他著录: 其他著录信息
- 字数: 铭文字数
- 铭文: 铭文内容
- 备注: 备注信息
- 直接来源: 直接数据来源
- 其他: 其他信息
- 创建时间: 记录创建时间

## 数据统计

- 总记录数: 18,247条
- 时代分布（前5）:
  - 商代晚期: 5,780条
  - 西周早期: 3,246条
  - 西周晚期: 1,229条
  - 春秋早期: 816条
  - 春秋晚期: 796条

## 部署说明

### 开发环境
```bash
python app.py
```

### 生产环境
建议使用 gunicorn 或 uWSGI 部署:
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### 使用 Cloud Studio 部署
1. 点击 IDE 顶部的 CloudStudio 集成
2. 完成登录和授权
3. 按照提示完成部署

## 开发说明

### 添加新功能
修改 `app.py` 添加新的API端点，修改 `script.js` 添加前端逻辑。

### 修改样式
编辑 `styles.css` 文件自定义网站样式。

### 修改页面结构
编辑 `index.html` 文件调整页面布局。

## 许可证

本项目用于学术研究和教育目的。
