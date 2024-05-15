FROM node:18-alpine AS base
FROM base AS deps
LABEL authors="tomkwok"

# Install packages with no cache
RUN apk add --no-cache libc6-compat

# Install dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm update && npm install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the code
RUN npm run build

# Production image, copy all the files and run next
FROM base AS release
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public

# Set the correct permissions for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Reduce the image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Expose the port
USER nextjs
EXPOSE 3000
# Set the environment port
ENV PORT=3000

CMD ["node", "server.js"]

ENTRYPOINT ["top", "-b"]