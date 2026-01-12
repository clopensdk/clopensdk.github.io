# GitHub 风格主题更新说明

## 更新内容

### 1. 主题风格调整

已将网站主题从原来花哨的渐变色风格调整为简洁的 GitHub 风格：

- ✅ 使用 GitHub 标准配色方案（#0969da 主色调）
- ✅ 移除过度的渐变效果和阴影
- ✅ 简化动画效果，提高性能
- ✅ 优化字体大小和行高，提升可读性
- ✅ 统一圆角大小为 6px（GitHub 标准）
- ✅ 简化按钮和卡片样式

### 2. Markdown 解析支持

已集成 Marked.js 库，支持完整的 GitHub Flavored Markdown：

- ✅ 标题和段落格式化
- ✅ 代码块语法高亮
- ✅ 表格渲染
- ✅ 引用块
- ✅ 列表（有序、无序）
- ✅ 链接和图片
- ✅ 任务列表

### 3. 新增文件

1. **example.md** - Markdown 文档示例
2. **markdown-demo.html** - Markdown 渲染演示页面
3. **更新的 README.md** - 完整的项目文档

## 使用方法

### 在页面中渲染 Markdown

```javascript
// 方法1: 直接渲染到指定元素
window.renderMarkdownDoc(markdownText, 'elementId');

// 方法2: 获取 HTML 后手动设置
const html = window.renderMarkdown(markdownText);
document.getElementById('myDiv').innerHTML = html;
```

### 在 docs.html 中使用

docs.html 的 `#apiContent` 元素已添加 `markdown-body` 类，可以直接渲染 Markdown 内容：

```javascript
const markdown = '# 标题\n\n这是内容...';
document.getElementById('apiContent').innerHTML = window.renderMarkdown(markdown);
```

## 样式变量

所有颜色都使用 CSS 变量定义，方便自定义：

```css
:root {
    --primary-color: #0969da;      /* 主色调 */
    --secondary-color: #57606a;    /* 次要文字颜色 */
    --text-color: #24292f;         /* 主要文字颜色 */
    --bg-color: #ffffff;           /* 背景色 */
    --border-color: #d0d7de;       /* 边框色 */
    --sidebar-bg: #f6f8fa;         /* 侧边栏背景 */
    --code-bg: #f6f8fa;            /* 代码背景 */
}
```

## 主要改进对比

### 改进前：
- 🎨 使用紫色渐变（#667eea → #764ba2）
- 🌈 多种花哨的阴影效果
- 💫 较多的动画效果
- 📦 较大的内边距和外边距
- 🎭 过于鲜艳的配色

### 改进后：
- ✨ GitHub 标准蓝色（#0969da）
- 📐 简洁的扁平化设计
- ⚡ 最小化动画，提升性能
- 📏 适中的间距，更易阅读
- 🎨 舒适的低饱和度配色

## 测试建议

1. 打开 `docs.html` 查看 API 文档的新风格
2. 打开 `markdown-demo.html` 查看 Markdown 渲染效果
3. 在浏览器开发工具中查看响应式效果
4. 测试 Markdown 渲染的各种语法

## 兼容性

- ✅ Chrome/Edge (推荐)
- ✅ Firefox
- ✅ Safari
- ✅ 移动端浏览器

## 注意事项

1. Marked.js 从 CDN 加载，确保网络连接正常
2. 所有 Markdown 内容会被渲染为 HTML，注意 XSS 安全
3. 如需自定义样式，修改 `.markdown-body` 相关的 CSS 规则

## 反馈

如有任何问题或建议，欢迎提出！
