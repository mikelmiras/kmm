FROM node:23.3.0
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm run build_docker
CMD ["pnpm", "start"]