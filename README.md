# Ell Admin

## 项目简介

基于 `ShadcnUI` 的多标签页 Headless First 后台管理模板。

## 技术选型

- **前端框架**：[React](https://react.dev/)
- **路由系统**：[ReactRouter](https://reactrouter.com/)
- **UI组件**：[ShadcnUI](https://ui.shadcn.com/)
- **构建工具**：[Rsbuild](https://rsbuild.dev/)
- **状态管理**：[Valtio](https://valtio.dev/)
- **网络请求**：[Alova](https://alova.js.org/)
- **授权认证**：[CASL](https://casl.js.org/)

## 安装运行

### 环境准备

确保你已经安装了 `Node.js` 和 `pnpm`。

### 安装模板

1. 克隆项目到本地：
   ```bash
   git clone git@github.com:elljs/core.git ell
   ```

2. 安装项目依赖：
   ```bash
   pnpm i
   ```

### 开发模式

进入工作目录：
```bash
cd ell/apps/admin
```

运行以下命令启动开发服务器：
```bash
pnpm dev
```
默认访问地址：http://localhost:8888/

### 生产构建

运行以下命令进行生产环境的构建：
```bash
pnpm build
```
构建完成后，输出文件将位于 `dist` 目录中。

## 开源协议

本项目遵循 MIT 开源协议，详细信息请参考 [LICENSE](LICENSE) 文件。
