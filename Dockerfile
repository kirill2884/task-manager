FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma 

RUN npm install --omit=dev

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node ./dist/server/entry.mjs"]