FROM node:20
COPY . /app
WORKDIR /app
RUN npm ci
RUN npm run build
EXPOSE 4173
ENV HOST=0.0.0.0
CMD ["npm", "run", "preview"]
