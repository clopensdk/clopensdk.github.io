// 页脚组件 - 统一管理页脚内容
function renderFooter() {
  return `
    <footer class="page-footer">
      <div class="footer-content">
        <p>&copy; 2026 ChenLian® 开放平台</p>
      </div>
    </footer>
  `;
}

// 自动渲染页脚到body末尾
function initFooter() {
  // 检查是否已经有页脚
  if (!document.querySelector('.page-footer')) {
    document.body.insertAdjacentHTML('beforeend', renderFooter());
  }
}

// 页面加载完成后自动初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFooter);
} else {
  initFooter();
}
