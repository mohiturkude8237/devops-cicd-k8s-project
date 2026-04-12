# Stage 1: Build
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Production
FROM node:20-slim
WORKDIR /app
COPY --from=builder /app ./
RUN npm prune --production
EXPOSE 5000
CMD ["node", "server.js"]
