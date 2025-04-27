ARG $ARG_PORT=8080

FROM node:20-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=development
EXPOSE $ARG_PORT

FROM base AS builder
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM base AS production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
CMD ["npm", "start"]
