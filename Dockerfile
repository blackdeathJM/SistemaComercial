# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.16.1
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="NestJS"

# NestJS app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Agregar tus variables de entorno aquí
ENV URI_MONGO="mongodb+srv://blackdeath:FernandaTeamo1017@simapas-api-k3zc5.mongodb.net/simapas-api?retryWrites=true&w=majority"
ENV PALABRA_SECRETA="Mari(.Y.)1017"
ENV PORT=3333

ARG PNPM_VERSION=8.6.5
RUN npm install -g pnpm@$PNPM_VERSION

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y python-is-python3 pkg-config build-essential

# Instalar dependencias
COPY --link .npmrc package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false

# Copiar aplicación
COPY --link . .

# Compilar aplicación
RUN pnpm run build:api

# Etapa final para la imagen de la aplicación
FROM base

# Copiar aplicación compilada
COPY --from=build /app/dist/apps/api /app

# Iniciar el servidor de forma predeterminada, se puede sobrescribir en tiempo de ejecución
EXPOSE 3333

# Quitar la declaración CMD conflictiva
CMD ["pnpm", "run", "start"]
