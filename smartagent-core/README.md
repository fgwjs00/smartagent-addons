# SmartAgent AI Core

SmartAgent AI Core is the Home Assistant add-on that runs the SmartAgent gateway service, management console, local AI service, and central control screen package.

Current release: `Beta 0.0.1`

## What It Does

- Provides the SmartAgent management console.
- Serves the central control screen web app.
- Provides local AI service capability for SmartAgent.
- Bridges the SmartAgent Home Assistant integration to the SmartAgent runtime.
- Keeps project control local-first.

## Typical Users

- Installers use it to configure and validate a project.
- Administrators use it to manage rooms, devices, scenes, backups, and service status.
- After-sales teams use it for diagnostics and support.
- Household users normally interact through the central control screen.

## Install

1. Add the official SmartAgent add-on repository in Home Assistant.
2. Install `SmartAgent AI Core`.
3. Start the add-on.
4. Open the SmartAgent panel from Home Assistant.

## Configuration

Default options:

```yaml
ha_url: "http://supervisor/core"
ha_token: ""
auth_token: ""
addon_port: 18099
gateway_ui_port: 8234
```

For normal Home Assistant add-on usage, keep `ha_url` as `http://supervisor/core`.

## Ports

- `8234/tcp`: SmartAgent Gateway/UI
- `18099/tcp`: SmartAgent service API used by the Home Assistant integration

## Update

Updates are delivered through the Home Assistant Add-on Store after the SmartAgent add-on repository has been added.

## Support

For project delivery, installation, and after-sales support, use the official SmartAgent support channel provided with your deployment.
