# =========================
# Base image with build tools
# =========================
FROM ubuntu:22.04

# Avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# =========================
# Install system dependencies
# =========================
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    gcc \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

# =========================
# Set working directory
# =========================
WORKDIR /app

# =========================
# Copy entire project
# =========================
COPY . .

# =========================
# Build HMSCC compiler
# =========================
WORKDIR /app/compiler

RUN mkdir -p build && \
    cd build && \
    cmake .. && \
    make && \
    chmod +x hmscc

# =========================
# Install backend dependencies
# =========================
WORKDIR /app/backend
RUN npm install

# =========================
# Expose backend port
# =========================
EXPOSE 3000

# =========================
# Start backend server
# =========================
CMD ["node", "server.js"]
