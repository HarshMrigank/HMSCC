# Dockerfile
FROM ubuntu:22.04 AS compiler

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /compiler
COPY compiler ./compiler

RUN mkdir -p compiler/build && \
    cd compiler/build && \
    cmake .. && \
    make

FROM node:18-bullseye

RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=compiler /compiler/compiler/build/hmscc /app/hmscc
COPY backend/package*.json ./
COPY backend/server.js ./
COPY backend/routes ./routes
COPY backend/services ./services

RUN mkdir -p temp && chmod 777 temp
RUN chmod +x /app/hmscc
RUN npm install --production

ENV PORT=10000
EXPOSE 10000

CMD ["node", "server.js"]