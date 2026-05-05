# SmartAgent AI Core

Current release: `Beta 0.0.10`

当前测试版仅支持 `amd64 / x86_64`。安装时 Home Assistant 会在本地构建 add-on 镜像，核心能力来自仓库内的预编译 `.so` 产物。

This beta supports only `amd64 / x86_64`. Home Assistant builds the add-on image locally, using the prebuilt `.so` Core extensions included in this repository.

## 中文说明

SmartAgent AI Core 是 SmartAgent 在 Home Assistant add-on 形态下的本地运行组件。它承载 SmartAgent Gateway、管理控制台、中控屏资源、本地 AI 服务和 Local Core 相关能力入口。

### 主要能力

- 提供 SmartAgent Gateway / UI 入口
- 承载管理控制台
- 承载中控屏 Web 应用资源
- 提供 SmartAgent 本地服务 API
- 支持本地 AI、场景决策、记忆学习和安全执行链相关能力
- 与 Home Assistant 集成协同完成设备状态读取和设备控制落地

### 典型用户

- 安装人员完成项目配置和验收
- 管理员管理房间、设备、场景、授权、备份和系统状态
- 售后团队查看日志、诊断问题并维护现场
- 家庭用户通过中控屏进行日常控制

## English

SmartAgent AI Core is the local runtime component of SmartAgent in Home Assistant add-on form. It serves the SmartAgent Gateway, management console, central control screen assets, local AI service, and Local Core related entry points.

### Main Capabilities

- Provides the SmartAgent Gateway / UI entry point
- Serves the management console
- Serves central control screen web application assets
- Provides SmartAgent local service APIs
- Supports local AI, scene decision making, memory learning, and safety execution chain related capabilities
- Works with the Home Assistant integration to read device state and execute device control

### Typical Users

- Installers configure and validate projects
- Administrators manage rooms, devices, scenes, license, backup, and system status
- Support teams review logs, diagnose issues, and maintain deployments
- Household users interact through the central control screen
