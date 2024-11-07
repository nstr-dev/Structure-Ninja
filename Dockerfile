FROM oven/bun:latest
COPY . /app
WORKDIR /app
RUN bun install
RUN bun run build
EXPOSE 4173
CMD ["bun", "run", "preview"]