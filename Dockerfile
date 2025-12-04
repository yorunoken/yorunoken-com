FROM oven/bun:1-alpine AS base
WORKDIR /app


FROM base AS deps

COPY package.json bun.lock* ./

RUN bun install --frozen-lockfile --production


FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

USER bun

COPY --from=deps --chown=bun:bun /app/node_modules ./node_modules

COPY --chown=bun:bun . .

EXPOSE 3000

CMD ["bun", "run", "start"]