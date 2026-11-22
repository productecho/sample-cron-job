FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY index.js ./

ENV NODE_ENV=production
USER node

# Runs once and exits — the scheduler decides when to start it again.
CMD ["node", "index.js"]
