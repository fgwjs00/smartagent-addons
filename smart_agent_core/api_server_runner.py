from __future__ import annotations

import asyncio
import faulthandler
from pathlib import Path

faulthandler.enable(all_threads=True)

def _reject_native_api_ingress() -> None:
    app_root = Path(__file__).resolve().parent
    native_modules = sorted(path.name for path in app_root.glob("api_server*.so"))
    if native_modules:
        joined = ", ".join(native_modules[:5])
        raise SystemExit(
            "[SmartAgent] ERROR: native api ingress modules are disabled; "
            f"remove {joined} and ship api_server*.pyc"
        )


_reject_native_api_ingress()

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
