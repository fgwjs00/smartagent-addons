# SmartAgent AI Core Documentation

SmartAgent AI Core runs the SmartAgent gateway service, management console, local AI service, and central control screen package for Home Assistant.

Current release: `Beta 0.0.1`

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

## Operation

- Use the SmartAgent management console for setup, project checks, and diagnostics.
- Use the central control screen for daily household control.
- Use Home Assistant Add-on Store updates to upgrade SmartAgent Core.
