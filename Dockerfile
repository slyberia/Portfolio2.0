# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Build frontend (tsc + vite)
RUN npm run build

# Compile server TypeScript to JS
RUN npx tsc -p tsconfig.server.json

# Stage 2: Production
FROM node:20-alpine AS production
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/dist-server ./dist-server

EXPOSE 8080

CMD ["node", "dist-server/index.js"]
