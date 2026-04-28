# SmartAgent AI Core

Current release: `Beta 0.0.3`

## 中文说明

SmartAgent AI Core 是 SmartAgent 在 Home Assistant add-on 形态下的本地运行组件。

它承载 SmartAgent Gateway、管理控制台、中控屏资源、本地 AI 服务和 Local Core 相关能力入口，用于把 SmartAgent 的产品层能力运行在 HA OS / Home Assistant 项目环境中。

### 它在系统中的角色

- Home Assistant 负责设备接入、实体状态、自动化、脚本、场景和 add-on 生态。
- SmartAgent AI Core 负责 SmartAgent 的本地服务、统一入口和产品运行时。
- SmartAgent 管理控制台面向安装人员、售后、管理员和开发者。
- SmartAgent 中控屏面向普通家庭用户的日常控制。

### 主要能力

- 提供 SmartAgent Gateway / UI 入口。
- 承载管理控制台。
- 承载中控屏 Web 应用资源。
- 提供 SmartAgent 本地服务接口。
- 支持本地 AI 能力、场景决策、学习记忆和安全执行链相关能力。
- 与 Home Assistant 集成协同工作，完成设备状态读取和控制落地。

### 典型用户

- 安装人员：完成项目配置和验收。
- 管理员：管理房间、设备、场景、授权、备份和系统状态。
- 售后团队：查看日志、诊断问题、维护现场。
- 家庭用户：通过中控屏进行日常控制。

### 配置

默认配置：

```yaml
ha_url: "http://supervisor/core"
ha_token: ""
auth_token: ""
addon_port: 18099
gateway_ui_port: 8234
```

普通 Home Assistant add-on 使用场景下，`ha_url` 保持为 `http://supervisor/core`。

### 端口

- `8234/tcp`：SmartAgent Gateway / UI
- `18099/tcp`：SmartAgent 服务 API

## English

SmartAgent AI Core is the local runtime component of SmartAgent in Home Assistant add-on form.

It serves SmartAgent Gateway, management console, central control screen assets, local AI service, and Local Core related entry points, allowing SmartAgent's product layer to run inside an HA OS / Home Assistant project environment.

### Role in the System

- Home Assistant provides device integration, entity state, automations, scripts, scenes, and the add-on ecosystem.
- SmartAgent AI Core provides SmartAgent local services, unified entry point, and product runtime.
- SmartAgent management console is for installers, support teams, administrators, and developers.
- SmartAgent central control screen is for everyday household control.

### Main Capabilities

- Provides the SmartAgent Gateway / UI entry point.
- Serves the management console.
- Serves central control screen web application assets.
- Provides SmartAgent local service APIs.
- Supports local AI capability, scene decision making, memory learning, and safety execution chain related capabilities.
- Works with the Home Assistant integration to read device state and execute device control.

### Typical Users

- Installers configure and validate projects.
- Administrators manage rooms, devices, scenes, license, backup, and system status.
- Support teams review logs, diagnose issues, and maintain deployments.
- Household users interact through the central control screen.

### Configuration

Default options:

```yaml
ha_url: "http://supervisor/core"
ha_token: ""
auth_token: ""
addon_port: 18099
gateway_ui_port: 8234
```

For normal Home Assistant add-on usage, keep `ha_url` as `http://supervisor/core`.

### Ports

- `8234/tcp`: SmartAgent Gateway / UI
- `18099/tcp`: SmartAgent service API
