from __future__ import annotations

import asyncio

import api_server


def main() -> None:
    entrypoint = getattr(api_server, "main", None)
    if callable(entrypoint):
        entrypoint()
        return

    ports = api_server._listen_ports()
    app = api_server.create_app()
    try:
        asyncio.run(api_server._run_app_on_ports(app, ports))
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
