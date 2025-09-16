FROM node:20-bullseye-slim AS base
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/* \
  && (npm ci || npm install --no-audit --no-fund)

# Copy project
COPY . .

# Generate Prisma client and build
RUN npx prisma generate
RUN npm run build

# Runtime image
FROM node:20-bullseye-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/prisma ./prisma

ENV PORT=3000
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy || npx prisma db push; npx next start -p $PORT"]


