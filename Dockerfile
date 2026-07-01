# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Build frontend and crawler mirrors
ARG SITE_URL=https://kyle-semple-ai-solutions-portfolio-341805100474.us-east1.run.app
ENV SITE_URL=$SITE_URL
ARG VITE_NG_GALLERY_BASE=https://storage.googleapis.com/portfoli02-bucket
ENV VITE_NG_GALLERY_BASE=$VITE_NG_GALLERY_BASE
RUN npm run build:crawler

# Compile server TypeScript to JS
RUN npx tsc -p tsconfig.server.json

# Stage 2: Production
FROM node:20-alpine AS production
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/dist-server ./dist-server

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 8080

CMD ["node", "dist-server/index.js"]
