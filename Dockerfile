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
RUN npm run build:prod


# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application from build stage
COPY --from=build /app/dist/ant/browser /usr/share/nginx/html

# Expose port (Railway will assign PORT environment variable)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
