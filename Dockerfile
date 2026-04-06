# Stage 1: Build the Angular application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build the application for SSR
RUN npm run build:ssr

# Stage 2: Serve with Node.js
FROM node:20-alpine

WORKDIR /app

# Copy built application and package files
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Install production dependencies
RUN npm ci --omit=dev --legacy-peer-deps

# Expose port (default Angular SSR port)
EXPOSE 4000

# Start SSR server
CMD ["npm", "run", "serve:ssr:ant"]
