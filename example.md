# API 文档示例

这是一个使用 Markdown 编写的 API 文档示例。

## 快速开始

要开始使用我们的 API，您需要：

1. 注册账号并获取 API Key
2. 阅读下面的接口文档
3. 调用相应的接口

## 认证方式

所有 API 请求都需要在 Header 中包含认证信息：

```http
Authorization: Bearer YOUR_API_KEY
```

## 接口列表

### 用户管理

#### 获取用户信息

- **接口地址**：`/api/user/info`
- **请求方法**：GET
- **请求参数**：

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| user_id | string | 是 | 用户ID |

#### 更新用户信息

- **接口地址**：`/api/user/update`
- **请求方法**：POST
- **请求体**：

```json
{
  "user_id": "123456",
  "nickname": "新昵称",
  "avatar": "https://example.com/avatar.jpg"
}
```

## 错误码说明

| 错误码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 400 | 参数错误 |
| 401 | 未授权 |
| 403 | 禁止访问 |
| 404 | 资源不存在 |
| 500 | 服务器错误 |

## 注意事项

> **重要提示**：请妥善保管您的 API Key，不要将其泄露给他人。

- API 调用频率限制为每分钟 100 次
- 所有接口都使用 JSON 格式传输数据
- 建议使用 HTTPS 协议进行通信

## 代码示例

### JavaScript

```javascript
fetch('https://api.example.com/api/user/info?user_id=123', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

### Python

```python
import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY'
}

response = requests.get(
    'https://api.example.com/api/user/info',
    params={'user_id': '123'},
    headers=headers
)

print(response.json())
```

## 联系我们

如有问题，请通过以下方式联系我们：

- 邮箱：support@example.com
- 技术支持：[访问论坛](https://forum.example.com)
