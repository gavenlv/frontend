# 🛍️ 我的商城 - MyMall

> 个性化电商购物平台，为您提供优质的购物体验

![版本](https://img.shields.io/badge/version-1.0.0-purple)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-teal)

## ✨ 项目特色

- 🎨 **现代化设计** - 采用渐变色彩和流畅动画，打造视觉享受
- 📱 **响应式布局** - 完美适配桌面端、平板和移动设备
- 🔐 **安全认证** - JWT token 身份验证和路由守护
- 🛒 **智能购物车** - 本地存储持久化，支持商品增删改查
- 🌙 **主题切换** - 支持明暗主题一键切换
- 🚀 **高性能** - React 19 + Vite 6 极速开发体验
- 🌐 **国际化** - 内置 React Intl 多语言支持框架

## 🏗️ 技术栈

### 前端框架
- **React 19** - 最新版本 React，性能更优
- **TypeScript 5.8** - 类型安全的 JavaScript 超集
- **Vite 6** - 下一代前端构建工具

### 状态管理
- **React Context + useReducer** - 轻量级状态管理
- **TanStack Query** - 强大的数据获取和缓存库

### 样式方案
- **Tailwind CSS 4** - 原子化 CSS 框架
- **PostCSS** - CSS 后处理器

### 路由导航
- **React Router DOM 7** - 声明式路由管理

### 开发工具
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **pnpm** - 高效的包管理器

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 9.0.0

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/your-username/my-mall.git
cd my-mall

# 安装依赖
pnpm install
```

### 开发环境

```bash
# 启动开发服务器
pnpm dev

# 访问 http://localhost:5173
```

### 生产构建

```bash
# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## 📁 项目结构

```
my-mall/
├── public/                 # 静态资源
├── src/
│   ├── components/         # 组件库
│   │   ├── layout/        # 布局组件 (Header, Footer, Layout)
│   │   ├── ui/            # UI 组件 (LoadingSpinner, Button...)
│   │   └── auth/          # 认证组件 (ProtectedRoute)
│   ├── contexts/          # React Context
│   │   ├── AuthContext.tsx    # 用户认证状态
│   │   ├── CartContext.tsx    # 购物车状态
│   │   └── ThemeContext.tsx   # 主题状态
│   ├── pages/             # 页面组件
│   │   ├── HomePage.tsx       # 首页
│   │   ├── LoginPage.tsx      # 登录页
│   │   ├── CartPage.tsx       # 购物车页
│   │   ├── ProductDetailPage.tsx # 商品详情页
│   │   ├── CategoryPage.tsx   # 分类页
│   │   └── CheckoutPage.tsx   # 结算页
│   ├── services/          # API 服务
│   │   ├── api.ts            # HTTP 客户端
│   │   └── authService.ts    # 认证服务
│   ├── types/             # TypeScript 类型定义
│   │   ├── auth.ts           # 认证相关类型
│   │   └── cart.ts           # 购物车相关类型
│   ├── config/            # 配置文件
│   │   └── routes.tsx        # 路由配置
│   ├── App.tsx            # 根组件
│   ├── main.tsx           # 入口文件
│   └── index.css          # 全局样式
├── package.json           # 项目配置
├── tailwind.config.js     # Tailwind 配置
├── postcss.config.js      # PostCSS 配置
├── vite.config.ts         # Vite 配置
└── tsconfig.json          # TypeScript 配置
```

## 🎯 核心功能

### 🏠 首页
- 轮播横幅广告
- 分类导航网格
- 热门商品推荐
- 品牌合作伙伴展示

### 🔐 用户系统
- 用户注册/登录
- JWT Token 认证
- 路由权限守护
- 个人信息管理

### 🛒 购物车
- 商品添加/删除
- 数量调整
- 价格计算
- 本地存储持久化

### 📱 商品展示
- 商品详情页面
- 分类筛选
- 搜索功能
- 评价系统

### 🎨 UI/UX
- 响应式设计
- 主题切换
- 加载动画
- 错误边界处理

## 🔧 配置说明

### 环境变量

创建 `.env.local` 文件：

```env
# API 基础 URL
VITE_API_BASE_URL=http://localhost:3001/api

# 其他配置...
```

### 测试账号

为了方便测试，系统内置了模拟账号：

- **邮箱**: admin@example.com
- **密码**: password

## 🛠️ 开发指南

### 添加新页面

1. 在 `src/pages/` 创建页面组件
2. 在 `src/config/routes.tsx` 添加路由配置
3. 如需权限控制，使用 `ProtectedRoute` 包装

### 状态管理

使用 Context + useReducer 模式：

```tsx
// 使用认证状态
const { isAuthenticated, login, logout } = useAuth();

// 使用购物车状态
const { addToCart, removeFromCart, getTotalItems } = useCart();

// 使用主题状态
const { theme, toggleTheme } = useTheme();
```

### API 调用

使用封装的 API 服务：

```tsx
import { api } from '../services/api';

// GET 请求
const response = await api.get('/products');

// POST 请求
const response = await api.post('/orders', orderData);
```

## 🎨 样式定制

### Tailwind CSS 配置

项目使用 Tailwind CSS 4，支持：

- 自定义颜色主题
- 响应式断点
- 动画效果
- 组件样式

### 主要色彩

- **主色调**: 紫色渐变 (purple-600 → blue-600)
- **辅助色**: 粉色 (pink-500)、绿色 (green-500)
- **中性色**: 灰色系列

## 📦 部署

### Vercel 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### Netlify 部署

```bash
# 构建
pnpm build

# 上传 dist 目录到 Netlify
```

### Docker 部署

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build
EXPOSE 5173
CMD ["pnpm", "preview"]
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- React 团队提供优秀的前端框架
- Tailwind CSS 团队的出色设计系统
- 所有开源贡献者的无私奉献

---

<div align="center">

**🌟 如果这个项目对你有帮助，请给个 Star ⭐**

Made with ❤️ by [Your Name]

</div>
