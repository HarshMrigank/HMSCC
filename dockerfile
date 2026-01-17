# ===============================
# Stage 1: Build compiler (C++)
# ===============================
FROM ubuntu:22.04 AS compiler

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    gcc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /compiler
COPY compiler ./compiler

RUN mkdir -p compiler/build && \
    cd compiler/build && \
    cmake .. && \
    make

# ===============================
# Stage 2: Node backend (Node 18)
# ===============================
FROM node:18-bullseye

WORKDIR /app

# Copy compiler binary
COPY --from=compiler /compiler/compiler/build/hmscc /app/compiler/hmscc

# Copy backend
COPY backend ./backend

WORKDIR /app/backend
RUN npm install

EXPOSE 3000
CMD ["node", "server.js"]
