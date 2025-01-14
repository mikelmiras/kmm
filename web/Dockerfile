FROM node:23.3.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build_docker
RUN chmod +x run.sh
CMD ["./run.sh"]