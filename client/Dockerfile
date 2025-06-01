FROM node:alpine AS builder

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
#COPY package*.json ./
# Copy the rest of the application
COPY . .

RUN npm install

# Build the app
RUN npm run build

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*


# Copy static assets from builder stage
COPY --from=builder /usr/src/app/dist .
COPY --from=builder /usr/src/app/nginx/default.conf /etc/nginx/conf.d/default.conf
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]