// 全局变量
let currentPage = 1;
let totalPages = 1;
let currentSearch = '';
let currentFilters = {};
const pageSize = 20;

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('页面加载完成，初始化应用...');

    // 添加错误处理
    window.addEventListener('error', function(e) {
        console.error('全局错误:', e.error);
    });

    loadData();
    loadStatistics();

    // 高级筛选切换
    document.getElementById('toggleFiltersBtn').addEventListener('click', () => {
        const filters = document.getElementById('advancedFilters');
        const icon = document.getElementById('toggleIcon');
        filters.classList.toggle('show');
        icon.textContent = filters.classList.contains('show') ? '▲' : '▼';
    });

    // 全局搜索
    document.getElementById('searchBtn').addEventListener('click', () => {
        currentSearch = document.getElementById('searchInput').value.trim();
        currentPage = 1;
        loadData();
    });

    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            currentSearch = e.target.value.trim();
            currentPage = 1;
            loadData();
        }
    });

    // 重置全局搜索
    document.getElementById('resetBtn').addEventListener('click', () => {
        document.getElementById('searchInput').value = '';
        currentSearch = '';
        currentPage = 1;
        loadData();
    });

    // 应用高级筛选
    document.getElementById('applyFiltersBtn').addEventListener('click', () => {
        collectFilters();
        currentPage = 1;
        loadData();
    });

    // 重置高级筛选
    document.getElementById('resetFiltersBtn').addEventListener('click', () => {
        resetAdvancedFilters();
        currentPage = 1;
        loadData();
    });

    // 模态框关闭
    document.querySelector('.close').addEventListener('click', closeDetail);

    window.addEventListener('click', (e) => {
        const modal = document.getElementById('detailModal');
        if (e.target === modal) {
            closeDetail();
        }
    });

    // ESC键关闭弹窗
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeDetail();
        }
    });

    console.log('应用初始化完成');
});

// 关闭详情弹窗
function closeDetail() {
    const modal = document.getElementById('detailModal');
    modal.style.display = 'none';
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

// 收集高级筛选条件
function collectFilters() {
    currentFilters = {
        '编号': document.getElementById('filter编号').value.trim(),
        '器名': document.getElementById('filter器名').value.trim(),
        '时代': document.getElementById('filter时代').value.trim(),
        '出土': document.getElementById('filter出土').value.trim(),
        '收藏': document.getElementById('filter收藏').value.trim(),
        '尺寸': document.getElementById('filter尺寸').value.trim(),
        '器形': document.getElementById('filter器形').value.trim(),
        '字数': document.getElementById('filter字数').value.trim(),
        '著录': document.getElementById('filter著录').value.trim(),
        '其他著录': document.getElementById('filter其他著录').value.trim(),
        '铭文': document.getElementById('filter铭文').value.trim(),
        '备注': document.getElementById('filter备注').value.trim()
    };

    // 移除空值
    Object.keys(currentFilters).forEach(key => {
        if (!currentFilters[key]) {
            delete currentFilters[key];
        }
    });

    console.log('筛选条件:', currentFilters);
}

// 重置高级筛选
function resetAdvancedFilters() {
    const fields = ['编号', '器名', '时代', '出土', '收藏', '尺寸', '器形', '字数', '著录', '其他著录', '铭文', '备注'];
    fields.forEach(field => {
        const input = document.getElementById('filter' + field);
        if (input) input.value = '';
    });

    currentFilters = {};
    console.log('已重置所有筛选条件');
}

// 加载数据
async function loadData() {
    console.log('开始加载数据，第', currentPage, '页');
    showLoading();
    hideError();

    try {
        const params = new URLSearchParams({
            page: currentPage,
            page_size: pageSize,
            search: currentSearch
        });

        // 添加高级筛选参数
        Object.keys(currentFilters).forEach(key => {
            params.append('filter_' + key, currentFilters[key]);
        });

        console.log('请求参数:', params.toString());

        const response = await fetch(`/api/artifacts?${params}`);
        console.log('API响应状态:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('数据加载成功，共', result.data.length, '条记录');

        totalPages = result.total_pages;
        displayResults(result.data);
        updateStats(result.total, currentPage, totalPages);
        displayPagination();
    } catch (error) {
        console.error('加载数据失败:', error);
        showError('加载数据失败: ' + error.message);
    }

    hideLoading();
}

// 显示结果
function displayResults(artifacts) {
    const container = document.getElementById('artifactList');

    if (!artifacts || artifacts.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:40px;color:#6c757d;">没有找到匹配的记录</div>';
        return;
    }

    container.innerHTML = artifacts.map(artifact => {
        const idField = artifact['編号'] || artifact['编号'] || '未知';
        const nameField = artifact['器名'] || '未知';
        const eraField = artifact['时代'] || '未知';
        const collectionField = artifact['收藏'] || '未知';
        const countField = artifact['字数'] || '未知';
        const inscriptionField = artifact['铭文'] || '';

        let inscriptionHtml = '';
        if (inscriptionField) {
            const truncated = inscriptionField.length > 50 ? inscriptionField.substring(0, 50) + '...' : inscriptionField;
            inscriptionHtml = `<div class="artifact-info"><strong>铭文：</strong>${escapeHtml(truncated)}</div>`;
        }

        return `
            <div class="artifact-card" onclick="showDetail('${escapeForJs(idField)}')">
                <div class="artifact-id">${escapeHtml(idField)}</div>
                <div class="artifact-name">${escapeHtml(nameField)}</div>
                <div class="artifact-info"><strong>时代：</strong>${escapeHtml(eraField)}</div>
                <div class="artifact-info"><strong>收藏：</strong>${escapeHtml(collectionField)}</div>
                <div class="artifact-info"><strong>字数：</strong>${escapeHtml(countField)}</div>
                ${inscriptionHtml}
            </div>
        `;
    }).join('');
}

// JavaScript转义
function escapeForJs(str) {
    if (!str) return '';
    return str
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/"/g, '&quot;')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r');
}

// 显示详细信息
async function showDetail(id) {
    console.log('点击查看详情，ID:', id);
    showLoading();
    hideError();

    try {
        // 构建URL - 不使用encodeURIComponent
        const url = `/api/artifacts/${id}`;
        console.log('请求URL:', url);

        const response = await fetch(url);
        console.log('详情API响应状态:', response.status);
        console.log('响应头:', response.headers);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API错误响应:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const artifact = await response.json();
        console.log('详情数据:', artifact);

        if (artifact && !artifact.error) {
            const modalBody = document.getElementById('modalBody');

            modalBody.innerHTML = `
                <div class="detail-header">
                    <div class="detail-id">${escapeHtml(artifact['編号'] || artifact['编号'] || '')}</div>
                    <div class="detail-name">${escapeHtml(artifact['器名'] || '未知')}</div>
                </div>

                ${renderDetailSection('时代', artifact['时代'])}
                ${renderDetailSection('出土', artifact['出土'])}
                ${renderDetailSection('收藏', artifact['收藏'])}
                ${renderDetailSection('尺寸', artifact['尺寸'])}
                ${renderDetailSection('器形', artifact['器形'])}
                ${renderDetailSection('著录', artifact['著录'])}
                ${renderDetailSection('其他著录', artifact['其他著录'])}
                ${renderDetailSection('字数', artifact['字数'])}
                ${renderDetailSection('铭文', artifact['铭文'])}
                ${renderDetailSection('备注', artifact['备注'])}
                ${renderDetailSection('直接来源', artifact['直接来源'])}
                ${renderDetailSection('其他', artifact['其他'])}
            `;

            // 显示弹窗并锁定背景滚动
            const modal = document.getElementById('detailModal');
            modal.style.display = 'block';
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';

            console.log('弹窗已显示');
        } else {
            console.error('返回数据错误:', artifact);
            showError('加载详情失败：' + (artifact.error || '未知错误'));
        }
    } catch (error) {
        console.error('加载详情失败:', error);
        showError('网络错误，请稍后重试: ' + error.message);
    }

    hideLoading();
}

function renderDetailSection(label, value) {
    if (!value) return '';
    return `
        <div class="detail-section">
            <div class="detail-label">${escapeHtml(label)}</div>
            <div class="detail-value">${escapeHtml(value)}</div>
        </div>
    `;
}

// 加载统计数据
async function loadStatistics() {
    console.log('加载统计数据...');
    try {
        const response = await fetch('/api/statistics');
        if (!response.ok) {
            console.error('加载统计数据失败:', response.status);
            return;
        }

        const stats = await response.json();
        document.getElementById('totalCount').textContent = stats.total ? stats.total.toLocaleString() : '0';
        console.log('统计数据加载完成');
    } catch (error) {
        console.error('Error loading statistics:', error);
    }
}

// 更新统计信息
function updateStats(total, page, pages) {
    document.getElementById('totalCount').textContent = total ? total.toLocaleString() : '0';
    document.getElementById('currentPage').textContent = page;
    document.getElementById('totalPages').textContent = pages;
    document.getElementById('filteredCount').textContent = total ? total.toLocaleString() : '0';
}

// 显示分页
function displayPagination() {
    const container = document.getElementById('pagination');

    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }

    let html = '';

    // 上一页
    html += `<button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">上一页</button>`;

    // 页码
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
        html += `<button onclick="changePage(1)">1</button>`;
        if (startPage > 2) {
            html += `<span class="page-info">...</span>`;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        html += `<button ${i === currentPage ? 'disabled' : ''} onclick="changePage(${i})">${i}</button>`;
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            html += `<span class="page-info">...</span>`;
        }
        html += `<button onclick="changePage(${totalPages})">${totalPages}</button>`;
    }

    // 下一页
    html += `<button ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">下一页</button>`;

    container.innerHTML = html;
}

// 切换页面
function changePage(page) {
    if (page < 1 || page > totalPages || page === currentPage) {
        return;
    }
    console.log('切换到第', page, '页');
    currentPage = page;
    loadData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 显示加载状态
function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

// 隐藏加载状态
function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

// 显示错误信息
function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

// 隐藏错误信息
function hideError() {
    document.getElementById('error').classList.add('hidden');
}

// HTML转义
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
