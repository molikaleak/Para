# ---- Build Stage ----
FROM node:23-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json* ./

# Install ALL dependencies (including dev for build tools)
RUN npm install --include=dev --legacy-peer-deps

# Copy source code
COPY . .

# Build the app
RUN npm run build

# ---- Production Stage ----
FROM node:23-alpine

WORKDIR /app

# Copy package files and install all deps (vite needed for preview, json-server for API)
COPY package.json package-lock.json* ./
RUN npm install --include=dev --legacy-peer-deps

# Copy built output from builder stage
COPY --from=builder /app/dist ./dist

# Copy mock data (needed for json-server at runtime)
COPY mock ./mock

# Copy the vite config so the preview server knows about allowedHosts
COPY --from=builder /app/vite.config.ts ./

# Expose the port Railway assigns
EXPOSE ${PORT:-4173}

# Start json-server in background, wait for it, then serve the built app
CMD ["sh", "-c", "npx json-server --watch mock/db.json --port 3001 & sleep 2 && npx vite preview --port $PORT --host"]
