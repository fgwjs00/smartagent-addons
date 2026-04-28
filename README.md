# SmartAgent Add-ons

Current release: `Beta 0.0.2`

## 中文说明

SmartAgent 是一套基于 HA OS / Home Assistant 生态构建的 AI 全屋智能管控系统。

它站在 Home Assistant 的设备接入、实体状态、自动化、脚本、场景和 add-on 生态之上，提供 SmartAgent 自己的 Gateway、Local Core、管理控制台、中控屏、AI 决策、记忆学习和安全执行能力。

本仓库提供 SmartAgent 的 Home Assistant add-on 发布包。add-on 用于在 Home Assistant 环境中运行 SmartAgent Core 相关服务，并承载 Gateway、管理控制台和中控屏资源。

### SmartAgent Core 提供什么

- SmartAgent Gateway 统一入口
- 本地管理控制台
- 中控屏 Web 应用资源
- 本地 AI 服务与本地核心能力入口
- Home Assistant 集成使用的 SmartAgent 服务接口
- 面向项目交付的本地运行环境

### SmartAgent 的产品定位

SmartAgent 不是普通的 Home Assistant 插件，也不是简单的语音助手。它的目标是成为家庭现场的 AI 管控中枢：

- 通过传感器、视觉、语音和用户操作感知家庭状态
- 使用快脑 / 慢脑协同做本地决策
- 学习用户习惯并生成 AI 场景候选
- 通过安全校验、事务记录和回滚机制保护设备执行
- 让普通用户通过中控屏完成日常控制
- 让安装人员、售后和管理员通过管理控制台完成配置和维护

### 安装

1. 打开 Home Assistant。
2. 进入 Settings > Add-ons > Add-on Store。
3. 添加随项目交付提供的 SmartAgent add-on 仓库。
4. 安装 `SmartAgent AI Core`。
5. 启动 add-on。
6. 打开 SmartAgent 管理控制台或中控屏入口。

### 更新

添加 SmartAgent add-on 仓库后，后续版本通过 Home Assistant Add-on Store 更新。

## English

SmartAgent is an AI whole-home intelligence system built on top of the HA OS / Home Assistant ecosystem.

It uses Home Assistant for device integration, entity state, automations, scripts, scenes, and the add-on ecosystem, then provides SmartAgent's own Gateway, Local Core, management console, central control screen, AI decision making, memory learning, and safety execution capabilities.

This repository provides the Home Assistant add-on package for SmartAgent. The add-on runs SmartAgent Core related services in the Home Assistant environment and serves the Gateway, management console, and central control screen assets.

### What SmartAgent Core Provides

- SmartAgent Gateway as the unified entry point
- local management console
- central control screen web application assets
- local AI service and Local Core entry points
- SmartAgent service API used by the Home Assistant integration
- local runtime for project delivery

### Product Positioning

SmartAgent is not a simple Home Assistant plugin or a basic voice assistant. Its goal is to become the AI control hub for the home:

- understand home state through sensors, vision, voice, and user actions
- make local decisions through fast-brain and slow-brain cooperation
- learn user habits and generate AI scene candidates
- protect device execution through safety checks, transaction logs, and rollback support
- let household users control daily scenes through the central control screen
- let installers, support teams, and administrators configure and maintain projects through the management console

### Installation

1. Open Home Assistant.
2. Go to Settings > Add-ons > Add-on Store.
3. Add the official SmartAgent add-on repository provided with your deployment.
4. Install `SmartAgent AI Core`.
5. Start the add-on.
6. Open the SmartAgent management console or central control screen entry.

### Updates

After the SmartAgent add-on repository has been added, updates are delivered through the Home Assistant Add-on Store.
