FROM node:23.3.0
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm run build_docker
RUN chmod +x run.sh
CMD ["./run.sh"]