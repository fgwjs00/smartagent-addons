# SmartAgent AI Core Documentation

Current release: `Beta 0.0.1`

## 中文说明

SmartAgent AI Core 是 SmartAgent 在 Home Assistant add-on 形态下的本地运行组件，用于承载 Gateway、管理控制台、中控屏资源、本地 AI 服务和 Local Core 相关能力入口。

### 安装

1. 在 Home Assistant 中添加项目交付提供的 SmartAgent add-on 仓库。
2. 安装 `SmartAgent AI Core`。
3. 启动 add-on。
4. 打开 SmartAgent 管理控制台或中控屏入口。

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

### 使用方式

- 使用 SmartAgent 管理控制台完成安装配置、项目检查、日志、授权、备份和诊断。
- 使用中控屏完成家庭日常控制、房间设备控制、场景控制和语音交互。
- 使用 Home Assistant Add-on Store 更新 SmartAgent AI Core。

## English

SmartAgent AI Core is the local runtime component of SmartAgent in Home Assistant add-on form. It serves Gateway, management console, central control screen assets, local AI service, and Local Core related entry points.

### Installation

1. Add the official SmartAgent add-on repository provided with your deployment in Home Assistant.
2. Install `SmartAgent AI Core`.
3. Start the add-on.
4. Open the SmartAgent management console or central control screen entry.

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

### Operation

- Use the SmartAgent management console for setup, project checks, logs, license, backup, and diagnostics.
- Use the central control screen for daily household control, room device control, scene control, and voice interaction.
- Use Home Assistant Add-on Store updates to upgrade SmartAgent AI Core.
