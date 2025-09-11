FROM node:18-alpine AS dependencies
WORKDIR /app
COPY app/package.json app/package-lock.json ./
RUN npm ci


FROM node:18-alpine AS builder
WORKDIR /app
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
COPY --from=dependencies /app/node_modules ./node_modules
COPY app/ .
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi


FROM node:18-alpine AS runner
WORKDIR /app
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
ENV PORT=3000
COPY --from=dependencies /app/node_modules ./node_modules
RUN if [ "$NODE_ENV" != "production" ]; then npm install; fi
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
EXPOSE 3000
CMD if [ "$NODE_ENV" = "production" ]; then npm start; else npm run dev; fi
