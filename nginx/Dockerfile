# Use official Nginx image from Docker Hub
FROM nginx:latest

# Remove the default Nginx config
RUN rm /etc/nginx/nginx.conf

# Copy your custom Nginx config into the container
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for web traffic
EXPOSE 80
