# ===============================
# Stage 1: Build compiler (C++)
# ===============================
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

# ===============================
# Stage 2: Node backend (Node 18)
# ===============================
FROM node:18-bullseye

# Install gcc in Node container for compiling generated C code
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy compiler binary from first stage
COPY --from=compiler /compiler/compiler/build/hmscc /app/hmscc

# Copy backend files
COPY backend/package*.json ./
COPY backend/server.js ./
COPY backend/routes ./routes
COPY backend/services ./services

# Create temp directory with proper permissions
RUN mkdir -p temp && chmod 777 temp

# Make compiler binary executable
RUN chmod +x /app/hmscc

# Install dependencies
RUN npm install --production

# IMPORTANT: Render uses PORT 10000 by default
ENV PORT=10000
EXPOSE 10000

# Health check for Render
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:10000/health || exit 1

# Start the server
CMD ["node", "server.js"]