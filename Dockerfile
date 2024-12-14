FROM node:20

ARG PUBLIC_SENTRY_DSN

COPY . /app
WORKDIR /app
RUN npm ci
RUN npm run build
EXPOSE 4173
ENV HOST=0.0.0.0
CMD ["npm", "run", "preview"]
