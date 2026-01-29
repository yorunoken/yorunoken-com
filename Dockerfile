### 1) Build frontend
FROM oven/bun:1-alpine AS frontend-build
WORKDIR /frontend

COPY frontend/package.json frontend/bun.lock ./
COPY frontend/tsconfig*.json ./
COPY frontend/vite.config.ts frontend/vite-end.d.ts ./
COPY frontend/index.html ./
COPY frontend/postcss.config.js frontend/tailwind.config.js ./
COPY frontend/eslint.config.js ./
COPY frontend/public ./public
COPY frontend/src ./src

RUN bun install --frozen-lockfile
RUN bun run build

### 2) Build Rust backend
FROM rust:1-bookworm AS backend-build
WORKDIR /app

COPY Cargo.toml Cargo.lock ./
COPY src ./src

RUN cargo build --release

### 3) Runtime image
FROM debian:bookworm-slim AS runtime

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -m -u 10001 appuser
WORKDIR /app

COPY --from=backend-build /app/target/release/portfolio /app/portfolio
COPY --from=frontend-build /frontend/dist /app/frontend/dist

USER appuser
EXPOSE 3000

CMD ["/app/portfolio"]
