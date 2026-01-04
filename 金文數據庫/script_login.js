// 全局变量
let currentPage = 1;
let totalPages = 1;
let currentSearch = '';
let currentFilters = {};
let currentFilterMode = 'or'; // 默认OR模式
const pageSize = 20;
const CORRECT_PASSWORD = '2004';

// 显示/隐藏加载
function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

// 显示/隐藏错误
function showError(message) {
    document.getElementById('error').textContent = message;
    document.getElementById('error').classList.remove('hidden');
}

function hideError() {
    document.getElementById('error').classList.add('hidden');
}

// 登录功能
function checkLogin() {
    const password = document.getElementById('passwordInput').value;
    const errorDiv = document.getElementById('loginError');

    if (password === CORRECT_PASSWORD) {
        // 登录成功
        const loginModal = document.getElementById('loginModal');
        const mainContainer = document.getElementById('mainContainer');

        loginModal.style.display = 'none';
        mainContainer.classList.remove('hidden');

        // 初始化应用
        showLoading();
        loadData();
        loadStatistics();

        // 保存登录状态到 sessionStorage
        sessionStorage.setItem('isLoggedIn', 'true');
    } else {
        // 登录失败
        errorDiv.classList.remove('hidden');
        document.getElementById('passwordInput').value = '';

        // 3秒后隐藏错误信息
        setTimeout(() => {
            errorDiv.classList.add('hidden');
        }, 3000);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('页面加载完成，初始化应用...');

    // 检查是否已登录
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        const loginModal = document.getElementById('loginModal');
        const mainContainer = document.getElementById('mainContainer');

        loginModal.style.display = 'none';
        mainContainer.classList.remove('hidden');

        // 初始化应用
        showLoading();
        loadData();
        loadStatistics();
    }

    // 添加错误处理
    window.addEventListener('error', function(e) {
        console.error('全局错误:', e.error);
    });

    // 登录按钮点击事件
    document.getElementById('loginBtn').addEventListener('click', checkLogin);

    // 密码输入框回车事件
    document.getElementById('passwordInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkLogin();
        }
    });

    // 高级筛选切换
    document.getElementById('toggleFiltersBtn').addEventListener('click', () => {
        const filters = document.getElementById('advancedFilters');
        const icon = document.getElementById('toggleIcon');
        filters.classList.toggle('show');
        icon.textContent = filters.classList.contains('show') ? '▲' : '▼';
    });

    // 全局搜索
    document.getElementById('searchBtn').addEventListener('click', () => {
        const searchTerm = document.getElementById('searchInput').value.trim();
        // 检查是否是正则表达式（以 / 开头和结尾）
        if (searchTerm.startsWith('/') && searchTerm.endsWith('/')) {
            try {
                // 测试正则表达式是否有效
                new RegExp(searchTerm.slice(1, -1));
                currentSearch = searchTerm;
            } catch (e) {
                alert('无效的正则表达式: ' + e.message);
                return;
            }
        } else {
            currentSearch = searchTerm;
        }
        currentPage = 1;
        loadData();
    });

    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = e.target.value.trim();
            if (searchTerm.startsWith('/') && searchTerm.endsWith('/')) {
                try {
                    new RegExp(searchTerm.slice(1, -1));
                    currentSearch = searchTerm;
                } catch (err) {
                    alert('无效的正则表达式: ' + err.message);
                    return;
                }
            } else {
                currentSearch = searchTerm;
            }
            currentPage = 1;
            loadData();
        }
    });

    // 搜索模式切换事件
    document.querySelectorAll('input[name="searchMode"]').forEach(radio => {
        radio.addEventListener('change', () => {
            // 模式改变后自动重新搜索
            if (currentSearch) {
                currentPage = 1;
                loadData();
            }
        });
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
            '备注': document.getElementById('filter备注').value.trim(),
            '直接来源': document.getElementById('filter直接来源').value.trim(),
            '考古': document.getElementById('filter考古').value.trim(),
            '其他': document.getElementById('filter其他').value.trim()
        };
        currentFilterMode = document.getElementById('filterModeSelect').value;
        currentPage = 1;
        loadData();
    });

    // 重置所有筛选
    document.getElementById('resetFiltersBtn').addEventListener('click', () => {
        const filterInputs = document.querySelectorAll('.filter-input');
        filterInputs.forEach(input => input.value = '');
        currentFilters = {};
        currentFilterMode = 'or'; // 重置为OR模式
        document.getElementById('filterModeSelect').value = 'or';
        document.getElementById('searchInput').value = '';
        currentSearch = '';
        currentPage = 1;
        loadData();
    });

    // 详情模态框关闭
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('detailModal').classList.add('hidden');
    });

    // 点击模态框外部关闭
    document.getElementById('detailModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('detailModal')) {
            document.getElementById('detailModal').classList.add('hidden');
        }
    });
});

async function loadData() {
    try {
        showLoading();
        hideError();

        // 构建查询参数
        const params = new URLSearchParams({
            page: currentPage,
            page_size: pageSize
        });

        // 添加筛选参数
        Object.entries(currentFilters).forEach(([key, value]) => {
            if (value) {
                // 检查是否是正则表达式
                if (value.startsWith('/') && value.endsWith('/')) {
                    params.append(`filter_${key}_regex`, value.slice(1, -1));
                } else {
                    params.append(`filter_${key}`, value);
                    // 为所有字段使用统一的筛选模式
                    params.append(`filter_${key}_mode`, currentFilterMode);
                }
            }
        });

        // 检查搜索是否是正则表达式
        if (currentSearch.startsWith('/') && currentSearch.endsWith('/')) {
            params.append('search_regex', currentSearch.slice(1, -1));
        } else {
            params.append('search', currentSearch);
            // 添加全局搜索模式
            const searchModeRadio = document.querySelector('input[name="searchMode"]:checked');
            if (searchModeRadio) {
                params.append('search_mode', searchModeRadio.value);
            }
        }

        const response = await fetch(`/api/artifacts?${params.toString()}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        hideLoading();

        if (data.error) {
            showError(data.error);
            return;
        }

        displayArtifacts(data.data || []);
        updateStats(data.total, data.total_pages, data.page);
        renderPagination(data.total_pages);
    } catch (error) {
        console.error('加载数据失败:', error);
        hideLoading();
        showError(`加载数据失败: ${error.message}`);
    }
}

async function loadStatistics() {
    try {
        const response = await fetch('/api/statistics');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const stats = await response.json();

        if (stats.error) {
            console.error('加载统计数据失败:', stats.error);
            return;
        }

        document.getElementById('totalCount').textContent = stats.total || 0;
    } catch (error) {
        console.error('加载统计数据失败:', error);
    }
}

function displayArtifacts(artifacts) {
    const artifactList = document.getElementById('artifactList');
    artifactList.innerHTML = '';

    if (!artifacts || artifacts.length === 0) {
        artifactList.innerHTML = '<div style="text-align: center; color: #6c757d; padding: 40px;">未找到符合条件的记录</div>';
        return;
    }

    artifacts.forEach(artifact => {
        const card = document.createElement('div');
        card.className = 'artifact-card';
        card.addEventListener('click', () => {
            console.log('卡片被点击，编号:', artifact['編号']);
            showDetail(artifact['編号']);
        });

        const infoHtml = [
            artifact['时代'] ? `<div class="artifact-info"><strong>时代：</strong>${artifact['时代']}</div>` : '',
            artifact['出土'] ? `<div class="artifact-info"><strong>出土：</strong>${artifact['出土']}</div>` : '',
            artifact['收藏'] ? `<div class="artifact-info"><strong>收藏：</strong>${artifact['收藏']}</div>` : '',
            artifact['器形'] ? `<div class="artifact-info"><strong>器形：</strong>${artifact['器形']}</div>` : '',
            artifact['字数'] ? `<div class="artifact-info"><strong>字数：</strong>${artifact['字数']}</div>` : '',
            artifact['直接来源'] ? `<div class="artifact-info"><strong>直接来源：</strong>${artifact['直接来源'].substring(0, 30)}${artifact['直接来源'].length > 30 ? '...' : ''}</div>` : '',
            artifact['考古'] ? `<div class="artifact-info"><strong>考古：</strong>${artifact['考古'].substring(0, 30)}${artifact['考古'].length > 30 ? '...' : ''}</div>` : '',
            artifact['铭文'] ? `<div class="artifact-info"><strong>铭文：</strong>${artifact['铭文'].substring(0, 50)}${artifact['铭文'].length > 50 ? '...' : ''}</div>` : '',
            artifact['著录'] ? `<div class="artifact-info"><strong>著录：</strong>${artifact['著录'].substring(0, 50)}${artifact['著录'].length > 50 ? '...' : ''}</div>` : ''
        ].filter(html => html).join('');

        card.innerHTML = `
            <div class="artifact-id">${artifact['編号']}</div>
            <div class="artifact-name">${artifact['器名'] || '未命名'}</div>
            ${infoHtml}
        `;

        artifactList.appendChild(card);
    });

    document.getElementById('filteredCount').textContent = artifacts.length;
}

async function showDetail(artifactId) {
    console.log('点击查看详情，ID:', artifactId);
    showLoading();
    hideError();

    try {
        const url = `/api/artifacts/${artifactId}`;
        console.log('请求URL:', url);

        const response = await fetch(url);
        console.log('详情API响应状态:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const artifact = await response.json();
        console.log('详情数据:', artifact);

        hideLoading();

        if (artifact && !artifact.error) {
            const modalBody = document.getElementById('modalBody');

            modalBody.innerHTML = `
                <div class="detail-header">
                    <div class="detail-id">${artifact['編号']}</div>
                    <div class="detail-name">${artifact['器名'] || '未命名'}</div>
                </div>
                ${renderDetailSection('时代', artifact['时代'])}
                ${renderDetailSection('出土', artifact['出土'])}
                ${renderDetailSection('收藏', artifact['收藏'])}
                ${renderDetailSection('尺寸', artifact['尺寸'])}
                ${renderDetailSection('器形', artifact['器形'])}
                ${renderDetailSection('著录', artifact['著录'])}
                ${renderDetailSection('其他著录', artifact['其他著录'])}
                ${renderDetailSection('字数', artifact['字数'])}
                ${renderDetailSection('直接来源', artifact['直接来源'])}
                ${renderDetailSection('考古', artifact['考古'])}
                ${renderDetailSection('铭文', artifact['铭文'])}
                ${renderDetailSection('其他', artifact['其他'])}
                ${renderDetailSection('备注', artifact['备注'])}
            `;

            const modal = document.getElementById('detailModal');
            modal.style.display = 'block';
            modal.classList.remove('hidden');

            console.log('弹窗已显示');
        } else {
            console.error('返回数据错误:', artifact);
            showError('加载详情失败：' + (artifact.error || '未知错误'));
        }
    } catch (error) {
        console.error('加载详情失败:', error);
        hideLoading();
        showError('网络错误，请稍后重试: ' + error.message);
    }
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

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function updateStats(total, pages, page) {
    document.getElementById('totalPages').textContent = pages;
    document.getElementById('currentPage').textContent = page;
}

function renderPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    if (totalPages <= 1) return;

    // 上一页按钮
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '上一页';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            loadData();
        }
    };
    pagination.appendChild(prevBtn);

    // 页码按钮
    const maxVisiblePages = 7;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
        const firstBtn = document.createElement('button');
        firstBtn.textContent = '1';
        firstBtn.onclick = () => {
            currentPage = 1;
            loadData();
        };
        pagination.appendChild(firstBtn);

        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'page-info';
            ellipsis.textContent = '...';
            pagination.appendChild(ellipsis);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        if (i === currentPage) {
            pageBtn.style.background = '#3498db';
            pageBtn.style.color = 'white';
            pageBtn.style.borderColor = '#3498db';
        }
        pageBtn.onclick = () => {
            currentPage = i;
            loadData();
        };
        pagination.appendChild(pageBtn);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'page-info';
            ellipsis.textContent = '...';
            pagination.appendChild(ellipsis);
        }

        const lastBtn = document.createElement('button');
        lastBtn.textContent = totalPages;
        lastBtn.onclick = () => {
            currentPage = totalPages;
            loadData();
        };
        pagination.appendChild(lastBtn);
    }

    // 下一页按钮
    const nextBtn = document.createElement('button');
    nextBtn.textContent = '下一页';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            loadData();
        }
    };
    pagination.appendChild(nextBtn);
}
