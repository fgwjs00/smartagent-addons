ARG BUILD_FROM=ghcr.io/home-assistant/amd64-base-python:3.12-alpine3.22
ARG SA_DELIVERY_BUILD=0

FROM ${BUILD_FROM} AS builder
ARG SA_DELIVERY_BUILD

RUN apk add --no-cache \
    gcc \
    musl-dev \
    python3-dev

WORKDIR /build

COPY core/ /build/core/
COPY setup.py /build/

RUN pip install --no-cache-dir cython setuptools wheel

RUN set -e; \
    if python setup.py build_ext --inplace > /tmp/sa_build_ext.log 2>&1; then \
        tail -20 /tmp/sa_build_ext.log; \
        echo "[SmartAgent] Cython build succeeded"; \
    elif [ "$SA_DELIVERY_BUILD" = "1" ]; then \
        tail -200 /tmp/sa_build_ext.log; \
        echo "[SmartAgent] Cython build failed" >&2; \
        exit 1; \
    else \
        tail -200 /tmp/sa_build_ext.log; \
        echo "[SmartAgent] Cython build failed; using Python source fallback"; \
    fi

FROM ${BUILD_FROM} AS runtime
ARG SA_DELIVERY_BUILD

RUN pip install --no-cache-dir \
    "aiohttp>=3.9.0"

WORKDIR /app

COPY --from=builder /build/core/ /app/core/

RUN if ls /app/core/inference_engine*.so 1>/dev/null 2>&1; then \
        rm -f /app/core/inference_engine.py /app/core/inference_engine.c; \
        echo "[SmartAgent] Cython .so loaded; removed Python source fallback"; \
    elif [ "$SA_DELIVERY_BUILD" = "1" ]; then \
        echo "[SmartAgent] ERROR: missing compiled core .so; fail-closed delivery build" >&2; \
        exit 1; \
    else \
        echo "[SmartAgent] Warning: no Cython .so found; using Python source fallback"; \
    fi

COPY api_server.py /app/
COPY run.sh /app/run.sh
COPY ui/ /app/ui/
COPY screen/ /app/screen/
RUN chmod +x /app/run.sh

EXPOSE 18099 8234

ENV SA_INTERNAL_PORT=18099
ENV SA_GATEWAY_UI_PORT=8234
ENV SA_UI_ROOT=/app/ui
ENV SA_SCREEN_ROOT=/app/screen
ENV SA_LOG_LEVEL=INFO

CMD ["/app/run.sh"]
