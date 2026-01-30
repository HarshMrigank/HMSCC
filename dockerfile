# =========================
# Stage 1: Build compiler
# =========================
FROM ubuntu:22.04 AS compiler

RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY compiler ./compiler

RUN mkdir -p compiler/build && \
    cd compiler/build && \
    cmake .. && \
    make

# =========================
# Stage 2: Runtime (Node + same OS)
# =========================
FROM ubuntu:22.04

# Install Node.js 18 on Ubuntu
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    gcc \
    g++ \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy compiler binary
COPY --from=compiler /app/compiler/build/hmscc /app/hmscc
RUN chmod +x /app/hmscc

# Copy backend
COPY backend ./backend
WORKDIR /app/backend

RUN npm ci --only=production

EXPOSE 5001

CMD ["node", "server.js"]
