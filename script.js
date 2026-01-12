// API 接口类定义
class API {
  constructor(
    name,
    method,
    endpoint,
    description,
    parameters,
    response,
    example,
    flowchart = null,
    apiType = 'webapi'
  ) {
    this.name = name;
    this.method = method;
    this.endpoint = endpoint;
    this.description = description;
    this.parameters = parameters;
    this.response = response;
    this.example = example;
    this.flowchart = flowchart;
    this.apiType = apiType; // 'webapi' 或 'c'
  }

  // 从JSON配置创建API实例
  static fromJSON(json) {
    return new API(
      json.name,
      json.method,
      json.endpoint,
      json.description,
      json.parameters,
      json.response,
      json.example,
      json.flowchart || null,
      json.apiType || 'webapi'
    );
  }

  // Markdown 解析辅助函数
  parseMarkdown(text) {
    if (typeof marked !== 'undefined') {
      // 配置 marked 选项
      marked.setOptions({
        breaks: true,
        gfm: true,
        headerIds: true,
        mangle: false
      });
      return marked.parse(text);
    }
    // 如果 marked 不可用，返回纯文本
    return text.replace(/\n/g, '<br>');
  }

  render() {
    return `
            <div class="api-detail">
                <div class="api-section">
                    <div class="code-block">${this.method}: ${
      this.endpoint
    }</div>
                </div>

                <!-- 顶层API类型TAB -->
                <div class="api-type-tabs">
                    <button class="type-tab-button active" data-type="webapi">WebAPI</button>
                    <button class="type-tab-button" data-type="c">C API</button>
                </div>

                <!-- WebAPI类型的TAB内容 -->
                <div class="type-tab-content active" data-type="webapi">
                    <!-- 二级TAB切换导航 -->
                    <div class="api-tabs">
                        <button class="tab-button active" data-tab="request" data-parent="webapi">请求</button>
                        <button class="tab-button" data-tab="response" data-parent="webapi">回执</button>
                        <button class="tab-button" data-tab="flowchart" data-parent="webapi">流程图</button>
                        <button class="tab-button" data-tab="notes" data-parent="webapi">注意事项</button>
                    </div>

                    <!-- 二级TAB内容区域 -->
                <div class="tab-content-container">
                    <!-- 请求标签页 -->
                    <div class="tab-content active" data-tab="request" data-parent="webapi">
                        <div class="api-section">
                            <h2>请求参数</h2>
                            <table class="param-table">
                                <thead>
                                    <tr>
                                        <th>参数名</th>
                                        <th>类型</th>
                                        <th>必填</th>
                                        <th>说明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${this.parameters
                                      .map(
                                        (param) => `
                                        <tr>
                                            <td><code>${param.name}</code></td>
                                            <td>${param.type}</td>
                                            <td class="${
                                              param.required
                                                ? "param-required"
                                                : "param-optional"
                                            }">
                                                ${param.required ? "是" : "否"}
                                            </td>
                                            <td>${param.description}</td>
                                        </tr>
                                    `
                                      )
                                      .join("")}
                                </tbody>
                            </table>
                        </div>

                        <div class="api-section">
                            <h2>请求示例</h2>
                            <div class="code-wrapper">
                                <button class="copy-btn" onclick="copyCode(this)" title="复制代码">
                                    <span class="copy-icon">📋</span>
                                    <span class="copy-text">复制</span>
                                </button>
                                <pre class="code-block">${this.formatCode(
                              this.example.request
                            )}</pre>
                            </div>
                        </div>
                    </div>

                        <!-- 回执标签页 -->
                        <div class="tab-content" data-tab="response" data-parent="webapi">
                        <div class="api-section">
                            <h2>返回参数</h2>
                            <table class="response-table">
                                <thead>
                                    <tr>
                                        <th>参数名</th>
                                        <th>类型</th>
                                        <th>说明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${this.response
                                      .map(
                                        (resp) => `
                                        <tr>
                                            <td><code>${resp.name}</code></td>
                                            <td>${resp.type}</td>
                                            <td>${resp.description}</td>
                                        </tr>
                                    `
                                      )
                                      .join("")}
                                </tbody>
                            </table>
                        </div>

                        <div class="api-section">
                            <h2>返回示例</h2>
                            <div class="code-wrapper">
                                <button class="copy-btn" onclick="copyCode(this)" title="复制代码">
                                    <span class="copy-icon">📋</span>
                                    <span class="copy-text">复制</span>
                                </button>
                                <pre class="code-block">${this.formatCode(
                              this.example.response
                            )}</pre>
                            </div>
                        </div>
                    </div>

                        <!-- 流程图标签页 -->
                        <div class="tab-content" data-tab="flowchart" data-parent="webapi">
                        <div class="api-section">
                            <h2>接口调用流程</h2>
                            ${
                              this.flowchart
                                ? `<div class="mermaid-container">
                                    <div class="mermaid">${this.flowchart}</div>
                                </div>`
                                : `<div class="flowchart-container">
                                    <div class="flow-step">
                                        <div class="flow-number">1</div>
                                        <div class="flow-info">
                                            <h3>准备请求参数</h3>
                                            <p>根据接口文档准备必填参数和可选参数</p>
                                        </div>
                                    </div>
                                    <div class="flow-arrow">↓</div>
                                    <div class="flow-step">
                                        <div class="flow-number">2</div>
                                        <div class="flow-info">
                                            <h3>发送HTTP请求</h3>
                                            <p>使用 ${this.method} 方法向 ${this.endpoint} 发送请求</p>
                                        </div>
                                    </div>
                                    <div class="flow-arrow">↓</div>
                                    <div class="flow-step">
                                        <div class="flow-number">3</div>
                                        <div class="flow-info">
                                            <h3>服务器处理</h3>
                                            <p>服务器接收请求并进行业务逻辑处理</p>
                                        </div>
                                    </div>
                                    <div class="flow-arrow">↓</div>
                                    <div class="flow-step">
                                        <div class="flow-number">4</div>
                                        <div class="flow-info">
                                            <h3>返回响应结果</h3>
                                            <p>服务器返回JSON格式的响应数据</p>
                                        </div>
                                    </div>
                                    <div class="flow-arrow">↓</div>
                                    <div class="flow-step">
                                        <div class="flow-number">5</div>
                                        <div class="flow-info">
                                            <h3>处理响应数据</h3>
                                            <p>客户端解析响应并进行后续业务处理</p>
                                        </div>
                                    </div>
                                </div>`
                            }
                        </div>
                    </div>

                        <!-- 注意事项标签页 -->
                        <div class="tab-content" data-tab="notes" data-parent="webapi">
                            <div class="api-section">
                                <h2>使用注意事项</h2>
                                <div class="notes-container">
                                    <div class="note-item note-warning">
                                        <div class="note-icon">⚠️</div>
                                        <div class="note-content">
                                            <h3>请求频率限制</h3>
                                            <p>API调用频率限制为每分钟100次，超过限制将返回429错误。</p>
                                        </div>
                                    </div>
                                    <div class="note-item note-info">
                                        <div class="note-icon">ℹ️</div>
                                        <div class="note-content">
                                            <h3>认证要求</h3>
                                            <p>除公开接口外，其他接口需要在请求头中携带有效的访问令牌(Token)。</p>
                                        </div>
                                    </div>
                                    <div class="note-item note-success">
                                        <div class="note-icon">✓</div>
                                        <div class="note-content">
                                            <h3>最佳实践</h3>
                                            <p>建议使用HTTPS协议进行通信，确保数据传输安全。推荐实现请求重试机制以处理网络异常。</p>
                                        </div>
                                    </div>
                                    <div class="note-item note-error">
                                        <div class="note-icon">⛔</div>
                                        <div class="note-content">
                                            <h3>错误处理</h3>
                                            <p>请根据返回的code字段判断请求是否成功。常见错误码：400(参数错误)、401(未授权)、403(禁止访问)、404(资源不存在)、500(服务器错误)。</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- C API类型的TAB内容 -->
                <div class="type-tab-content" data-type="c">
                    <!-- 二级TAB切换导航 -->
                    <div class="api-tabs">
                        <button class="tab-button active" data-tab="request" data-parent="c">请求</button>
                        <button class="tab-button" data-tab="response" data-parent="c">回执</button>
                        <button class="tab-button" data-tab="flowchart" data-parent="c">流程图</button>
                        <button class="tab-button" data-tab="notes" data-parent="c">注意事项</button>
                    </div>

                    <!-- 二级TAB内容区域 -->
                    <div class="tab-content-container">
                        <!-- 请求标签页 -->
                        <div class="tab-content active" data-tab="request" data-parent="c">
                            <div class="api-section">
                                <h2>函数签名</h2>
                                <table class="param-table">
                                    <thead>
                                        <tr>
                                            <th>参数名</th>
                                            <th>类型</th>
                                            <th>必填</th>
                                            <th>说明</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${this.parameters
                                          .map(
                                            (param) => `
                                            <tr>
                                                <td><code>${param.name}</code></td>
                                                <td>${param.type}</td>
                                                <td class="${
                                                  param.required
                                                    ? "param-required"
                                                    : "param-optional"
                                                }">
                                                    ${param.required ? "是" : "否"}
                                                </td>
                                                <td>${param.description}</td>
                                            </tr>
                                        `
                                          )
                                          .join("")}
                                    </tbody>
                                </table>
                            </div>

                            <div class="api-section">
                                <h2>C API调用示例</h2>
                                <div class="code-wrapper">
                                    <button class="copy-btn" onclick="copyCode(this)" title="复制代码">
                                        <span class="copy-icon">📋</span>
                                        <span class="copy-text">复制</span>
                                    </button>
                                    <pre class="code-block">${this.formatCode(
                                  this.example.request
                                )}</pre>
                                </div>
                            </div>
                        </div>

                        <!-- 回执标签页 -->
                        <div class="tab-content" data-tab="response" data-parent="c">
                            <div class="api-section">
                                <h2>返回参数</h2>
                                <table class="response-table">
                                    <thead>
                                        <tr>
                                            <th>参数名</th>
                                            <th>类型</th>
                                            <th>说明</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${this.response
                                          .map(
                                            (resp) => `
                                            <tr>
                                                <td><code>${resp.name}</code></td>
                                                <td>${resp.type}</td>
                                                <td>${resp.description}</td>
                                            </tr>
                                        `
                                          )
                                          .join("")}
                                    </tbody>
                                </table>
                            </div>

                            <div class="api-section">
                                <h2>返回示例</h2>
                                <div class="code-wrapper">
                                    <button class="copy-btn" onclick="copyCode(this)" title="复制代码">
                                        <span class="copy-icon">📋</span>
                                        <span class="copy-text">复制</span>
                                    </button>
                                    <pre class="code-block">${this.formatCode(
                                  this.example.response
                                )}</pre>
                                </div>
                            </div>
                        </div>

                        <!-- 流程图标签页 -->
                        <div class="tab-content" data-tab="flowchart" data-parent="c">
                            <div class="api-section">
                                <h2>接口调用流程</h2>
                                ${
                                  this.flowchart
                                    ? `<div class="mermaid-container">
                                        <div class="mermaid">${this.flowchart}</div>
                                    </div>`
                                    : `<div class="flowchart-container">
                                        <div class="flow-step">
                                            <div class="flow-number">1</div>
                                            <div class="flow-info">
                                                <h3>准备函数参数</h3>
                                                <p>根据函数签名准备必填参数和可选参数</p>
                                            </div>
                                        </div>
                                        <div class="flow-arrow">↓</div>
                                        <div class="flow-step">
                                            <div class="flow-number">2</div>
                                            <div class="flow-info">
                                                <h3>调用C函数</h3>
                                                <p>调用 ${this.method} 函数</p>
                                            </div>
                                        </div>
                                        <div class="flow-arrow">↓</div>
                                        <div class="flow-step">
                                            <div class="flow-number">3</div>
                                            <div class="flow-info">
                                                <h3>SDK内部处理</h3>
                                                <p>SDK接收调用并进行业务逻辑处理</p>
                                            </div>
                                        </div>
                                        <div class="flow-arrow">↓</div>
                                        <div class="flow-step">
                                            <div class="flow-number">4</div>
                                            <div class="flow-info">
                                                <h3>返回结果</h3>
                                                <p>函数返回处理结果</p>
                                            </div>
                                        </div>
                                        <div class="flow-arrow">↓</div>
                                        <div class="flow-step">
                                            <div class="flow-number">5</div>
                                            <div class="flow-info">
                                                <h3>处理返回值</h3>
                                                <p>应用程序处理返回值并进行后续操作</p>
                                            </div>
                                        </div>
                                    </div>`
                                }
                            </div>
                        </div>

                        <!-- 注意事项标签页 -->
                        <div class="tab-content" data-tab="notes" data-parent="c">
                            <div class="api-section">
                                <h2>使用注意事项</h2>
                                <div class="notes-container">
                                    <div class="note-item note-warning">
                                        <div class="note-icon">⚠️</div>
                                        <div class="note-content">
                                            <h3>内存管理</h3>
                                            <p>注意及时释放通过SDK分配的内存资源，避免内存泄漏。</p>
                                        </div>
                                    </div>
                                    <div class="note-item note-info">
                                        <div class="note-icon">ℹ️</div>
                                        <div class="note-content">
                                            <h3>线程安全</h3>
                                            <p>大部分函数不是线程安全的，多线程环境下需要添加适当的同步机制。</p>
                                        </div>
                                    </div>
                                    <div class="note-item note-success">
                                        <div class="note-icon">✓</div>
                                        <div class="note-content">
                                            <h3>最佳实践</h3>
                                            <p>建议检查所有函数的返回值，确保调用成功。使用SDK前务必先调用初始化函数。</p>
                                        </div>
                                    </div>
                                    <div class="note-item note-error">
                                        <div class="note-icon">⛔</div>
                                        <div class="note-content">
                                            <h3>错误处理</h3>
                                            <p>请根据返回的错误码判断调用是否成功。常见错误码：-1(初始化失败)、-2(参数错误)、-3(内存不足)、-4(操作超时)。</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  formatCode(code) {
    // 如果是对象，转换为格式化的JSON字符串
    if (typeof code === "object" && code !== null) {
      code = JSON.stringify(code, null, 2);
    }

    // HTML转义
    code = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // 增强的 JSON 语法高亮
    // 1. 高亮键名（带引号的键）
    code = code.replace(/("[\w_-]+")\s*:/g, '<span class="json-key">$1</span>:');
    
    // 2. 高亮字符串值（冒号后的引号字符串）
    code = code.replace(/:\s*("(?:[^"\\]|\\.)*")/g, ': <span class="json-string">$1</span>');
    
    // 3. 高亮数字（整数和浮点数）
    code = code.replace(/:\s*(-?\d+\.?\d*)/g, ': <span class="json-number">$1</span>');
    
    // 4. 高亮布尔值
    code = code.replace(/:\s*\b(true|false)\b/g, ': <span class="json-boolean">$1</span>');
    
    // 5. 高亮 null
    code = code.replace(/:\s*\b(null)\b/g, ': <span class="json-null">$1</span>');
    
    // 6. 高亮括号和逗号
    code = code.replace(/([{}\[\]])/g, '<span class="json-punctuation">$1</span>');
    code = code.replace(/,(?=\s*[\n\r])/g, '<span class="json-punctuation">,</span>');

    return code;
  }
}

// 创建API实例列表
const apiList = [
  new API(
    "用户认证",
    "POST",
    "https://api.chenchain.com/v1/auth/login",
    "用户登录认证接口，获取访问令牌",
    [
      {
        name: "username",
        type: "string",
        required: true,
        description: "用户名",
      },
      { name: "password", type: "string", required: true, description: "密码" },
      {
        name: "remember",
        type: "boolean",
        required: false,
        description: "记住登录状态",
      },
    ],
    [
      { name: "code", type: "int", description: "状态码，200表示成功" },
      { name: "message", type: "string", description: "返回消息" },
      { name: "data", type: "object", description: "返回数据" },
      { name: "data.token", type: "string", description: "访问令牌" },
      {
        name: "data.expires_in",
        type: "int",
        description: "令牌过期时间（秒）",
      },
    ],
    {
      request: `POST /v1/auth/login
Content-Type: application/json

{
    "username": "demo@example.com",
    "password": "password123",
    "remember": true
}`,
      response: `{
    "code": 200,
    "message": "登录成功",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "expires_in": 7200
    }
}`,
    }
  ),
  new API(
    "获取用户信息",
    "GET",
    "https://api.chenchain.com/v1/user/info",
    "获取当前登录用户的详细信息",
    [
      {
        name: "token",
        type: "string",
        required: true,
        description: "访问令牌",
      },
    ],
    [
      { name: "code", type: "int", description: "状态码" },
      { name: "data", type: "object", description: "用户信息对象" },
      { name: "data.id", type: "string", description: "用户ID" },
      { name: "data.username", type: "string", description: "用户名" },
      { name: "data.email", type: "string", description: "邮箱" },
      { name: "data.created_at", type: "string", description: "注册时间" },
    ],
    {
      request: `GET /v1/user/info
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`,
      response: `{
    "code": 200,
    "data": {
        "id": "user_12345",
        "username": "demo",
        "email": "demo@example.com",
        "created_at": "2026-01-01T00:00:00Z"
    }
}`,
    }
  ),
  new API(
    "创建订单",
    "POST",
    "https://api.chenchain.com/v1/order/create",
    "创建新的订单",
    [
      {
        name: "product_id",
        type: "string",
        required: true,
        description: "产品ID",
      },
      { name: "quantity", type: "int", required: true, description: "数量" },
      {
        name: "note",
        type: "string",
        required: false,
        description: "备注信息",
      },
    ],
    [
      { name: "code", type: "int", description: "状态码" },
      { name: "data", type: "object", description: "订单信息" },
      { name: "data.order_id", type: "string", description: "订单ID" },
      { name: "data.status", type: "string", description: "订单状态" },
      { name: "data.total_amount", type: "float", description: "订单总额" },
    ],
    {
      request: `POST /v1/order/create
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
    "product_id": "prod_001",
    "quantity": 2,
    "note": "请尽快发货"
}`,
      response: `{
    "code": 200,
    "data": {
        "order_id": "order_67890",
        "status": "pending",
        "total_amount": 299.98
    }
}`,
    }
  ),
  new API(
    "查询订单",
    "GET",
    "https://api.chenchain.com/v1/order/{order_id}",
    "根据订单ID查询订单详情",
    [
      {
        name: "order_id",
        type: "string",
        required: true,
        description: "订单ID",
      },
    ],
    [
      { name: "code", type: "int", description: "状态码" },
      { name: "data", type: "object", description: "订单详情" },
      { name: "data.order_id", type: "string", description: "订单ID" },
      { name: "data.product_name", type: "string", description: "产品名称" },
      { name: "data.quantity", type: "int", description: "数量" },
      { name: "data.status", type: "string", description: "订单状态" },
      { name: "data.created_at", type: "string", description: "创建时间" },
    ],
    {
      request: `GET /v1/order/order_67890
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`,
      response: `{
    "code": 200,
    "data": {
        "order_id": "order_67890",
        "product_name": "晨链服务套餐",
        "quantity": 2,
        "status": "completed",
        "created_at": "2026-01-10T10:30:00Z"
    }
}`,
    }
  ),
  new API(
    "数据统计",
    "GET",
    "https://api.chenchain.com/v1/stats/summary",
    "获取数据统计摘要信息",
    [
      {
        name: "start_date",
        type: "string",
        required: true,
        description: "开始日期 (YYYY-MM-DD)",
      },
      {
        name: "end_date",
        type: "string",
        required: true,
        description: "结束日期 (YYYY-MM-DD)",
      },
      {
        name: "type",
        type: "string",
        required: false,
        description: "统计类型：daily, weekly, monthly",
      },
    ],
    [
      { name: "code", type: "int", description: "状态码" },
      { name: "data", type: "object", description: "统计数据" },
      { name: "data.total_orders", type: "int", description: "订单总数" },
      { name: "data.total_revenue", type: "float", description: "总收入" },
      { name: "data.active_users", type: "int", description: "活跃用户数" },
    ],
    {
      request: `GET /v1/stats/summary?start_date=2026-01-01&end_date=2026-01-10&type=daily
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`,
      response: `{
    "code": 200,
    "data": {
        "total_orders": 156,
        "total_revenue": 45678.90,
        "active_users": 234
    }
}`,
    }
  ),
  new API(
    "文件上传",
    "POST",
    "https://api.chenchain.com/v1/file/upload",
    "上传文件到服务器",
    [
      {
        name: "file",
        type: "file",
        required: true,
        description: "要上传的文件",
      },
      {
        name: "folder",
        type: "string",
        required: false,
        description: "目标文件夹",
      },
    ],
    [
      { name: "code", type: "int", description: "状态码" },
      { name: "data", type: "object", description: "文件信息" },
      { name: "data.file_id", type: "string", description: "文件ID" },
      { name: "data.url", type: "string", description: "文件访问URL" },
      { name: "data.size", type: "int", description: "文件大小（字节）" },
    ],
    {
      request: `POST /v1/file/upload
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data

file: [binary data]
folder: "documents"`,
      response: `{
    "code": 200,
    "data": {
        "file_id": "file_abc123",
        "url": "https://cdn.chenchain.com/files/abc123.pdf",
        "size": 1024000
    }
}`,
    }
  ),
];

// API注册中心
window.APIRegistry = {
  apis: [],

  // 注册单个API
  register: function (apiConfig) {
    const api = API.fromJSON(apiConfig);
    this.apis.push(api);
    console.log(`✓ 已注册API: ${api.name}`);
    return api;
  },

  // 获取所有已注册的API
  getAll: function () {
    return this.apis;
  },

  // 清空注册列表
  clear: function () {
    this.apis = [];
  },
};

// 全局注册函数（简化调用）
window.registerAPI = function (apiConfig) {
  return window.APIRegistry.register(apiConfig);
};

// 初始化TAB切换功能
function initTabSwitching() {
  // 初始化顶层API类型TAB切换
  const typeTabButtons = document.querySelectorAll(".type-tab-button");
  const typeTabContents = document.querySelectorAll(".type-tab-content");

  typeTabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetType = this.getAttribute("data-type");

      // 移除所有active类
      typeTabButtons.forEach((btn) => btn.classList.remove("active"));
      typeTabContents.forEach((content) => content.classList.remove("active"));

      // 添加active类到当前选中的类型TAB
      this.classList.add("active");
      const targetTypeContent = document.querySelector(
        `.type-tab-content[data-type="${targetType}"]`
      );
      if (targetTypeContent) {
        targetTypeContent.classList.add("active");
      }
    });
  });

  // 初始化二级TAB切换（请求/回执/流程图/注意事项）
  const tabButtons = document.querySelectorAll(".tab-button");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab");
      const parentType = this.getAttribute("data-parent");

      // 只影响同一父级下的tab
      const parentContainer = this.closest(".type-tab-content");
      if (!parentContainer) return;

      const siblingButtons = parentContainer.querySelectorAll(".tab-button");
      const siblingContents = parentContainer.querySelectorAll(".tab-content");

      // 移除同级所有active类
      siblingButtons.forEach((btn) => btn.classList.remove("active"));
      siblingContents.forEach((content) => content.classList.remove("active"));

      // 添加active类到当前选中的tab
      this.classList.add("active");
      const targetContent = parentContainer.querySelector(
        `.tab-content[data-tab="${targetTab}"][data-parent="${parentType}"]`
      );
      if (targetContent) {
        targetContent.classList.add("active");

        // 如果切换到流程图TAB，渲染Mermaid
        if (targetTab === "flowchart" && window.mermaid) {
          setTimeout(() => {
            const mermaidElements = targetContent.querySelectorAll(
              ".mermaid:not(.mermaid-rendered)"
            );
            if (mermaidElements.length > 0) {
              window.mermaid
                .run({
                  nodes: Array.from(mermaidElements),
                })
                .then(() => {
                  mermaidElements.forEach((el) =>
                    el.classList.add("mermaid-rendered")
                  );
                })
                .catch((err) => {
                  console.error("Mermaid渲染失败:", err);
                });
            }
          }, 100);
        }
      }
    });
  });
}

// 渲染API列表到页面
function renderAPIList(apis) {
  const apiListElement = document.getElementById("apiList");
  const apiContent = document.getElementById("apiContent");

  if (!apiListElement || !apiContent) return;

  // 清空现有列表
  apiListElement.innerHTML = "";

  // 渲染API列表
  apis.forEach((api, index) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = api.name;
    a.dataset.index = index;

    a.addEventListener("click", function (e) {
      e.preventDefault();

      // 更新active状态
      document.querySelectorAll(".api-list a").forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");

      // 渲染API详情
      apiContent.innerHTML = api.render();

      // 初始化TAB切换功能
      initTabSwitching();

      // 滚动到顶部
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    li.appendChild(a);
    apiListElement.appendChild(li);
  });

  // 默认显示第一个API
  if (apis.length > 0) {
    apiListElement.querySelector("a").click();
  }
}

// 按接口类型分类渲染API列表（不显示分类标题，因为已经在主内容区用TAB区分）
function renderAPIListByType(apis) {
  const apiListElement = document.getElementById("apiList");
  const apiContent = document.getElementById("apiContent");

  if (!apiListElement || !apiContent) return;

  apiListElement.innerHTML = '';

  // 直接渲染所有API，不分组显示
  apis.forEach((api) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.innerHTML = `
            <span class="api-name">${api.name}</span>
            <span class="api-method method-${api.method.toLowerCase()}">${api.method}</span>
        `;

    a.addEventListener("click", function (e) {
      e.preventDefault();
      apiListElement
        .querySelectorAll("a")
        .forEach((link) => link.classList.remove("active"));
      this.classList.add("active");
      apiContent.innerHTML = api.render();
      initTabSwitching();
    });

    li.appendChild(a);
    apiListElement.appendChild(li);
  });

  // 默认显示第一个API
  if (apis.length > 0) {
    apiListElement.querySelector("a").click();
  }
}

// 页面加载完成后初始化
document.addEventListener("DOMContentLoaded", function () {
  const apiListElement = document.getElementById("apiList");
  const apiContent = document.getElementById("apiContent");

  if (!apiListElement || !apiContent) return;

  // 等待所有API注册完成
  setTimeout(function () {
    const registeredAPIs = window.APIRegistry.getAll();

    if (registeredAPIs.length > 0) {
      console.log(`成功加载 ${registeredAPIs.length} 个API接口`);
      renderAPIListByType(registeredAPIs);
    } else {
      apiContent.innerHTML = `
        <div style="padding: 2rem;">
          <h2>暂无API接口</h2>
          <p style="margin: 1rem 0;">尚未注册任何API接口。</p>
          <h3 style="margin-top: 2rem;">如何添加API接口？</h3>
          <ol style="line-height: 2; margin-left: 1.5rem;">
            <li>在 <code style="background: #f1f5f9; padding: 0.25rem 0.5rem;">sdks/your-api-name/</code> 目录创建 <code>api.js</code> 文件</li>
            <li>在 <code>api.js</code> 中调用 <code>registerAPI({...})</code> 注册API</li>
            <li>在 <code>docs.html</code> 中引入该 <code>api.js</code> 文件</li>
            <li>刷新页面即可看到新添加的API</li>
          </ol>
          <p style="margin-top: 2rem; color: #64748b;">查看示例文件了解详细配置格式。</p>
        </div>
      `;
    }
  }, 100); // 等待100ms让所有script标签加载完成
});

// 复制代码功能
window.copyCode = function(button) {
  const codeWrapper = button.closest('.code-wrapper');
  const codeBlock = codeWrapper.querySelector('.code-block');
  
  // 获取纯文本内容（去除HTML标签）
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = codeBlock.innerHTML;
  const textContent = tempDiv.textContent || tempDiv.innerText;
  
  // 复制到剪贴板
  navigator.clipboard.writeText(textContent).then(() => {
    // 显示复制成功提示
    const copyText = button.querySelector('.copy-text');
    const originalText = copyText.textContent;
    copyText.textContent = '已复制!';
    button.classList.add('copied');
    
    // 2秒后恢复原状
    setTimeout(() => {
      copyText.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('复制失败:', err);
    alert('复制失败，请手动复制');
  });
};

// Markdown 渲染工具函数
window.renderMarkdown = function(markdownText) {
  if (typeof marked !== 'undefined') {
    // 配置 marked 选项以符合 GitHub 风格
    marked.setOptions({
      breaks: true,
      gfm: true,
      headerIds: true,
      mangle: false
    });
    return marked.parse(markdownText);
  }
  // 如果 marked 不可用，返回纯文本
  return markdownText.replace(/\n/g, '<br>');
};

// 渲染 Markdown 文档的便捷函数
window.renderMarkdownDoc = function(markdownText, targetElementId = 'apiContent') {
  const targetElement = document.getElementById(targetElementId);
  if (targetElement) {
    targetElement.innerHTML = window.renderMarkdown(markdownText);
    targetElement.classList.add('markdown-body');
  }
};
