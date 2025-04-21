# Gait

Aplicación web para gestión de usuarios con un frontend en Next.js y un backend en Express con TypeORM.

## Estructura del Proyecto

Este proyecto está dividido en dos partes principales:

- **client**: Aplicación frontend desarrollada con Next.js 15, React 19 y TailwindCSS
- **server**: API backend desarrollada con Express, TypeORM y MySQL

## Requisitos Previos

- Node.js (v18 o superior recomendado)
- PNPM (v7 o superior)
- MySQL (v8 o superior)

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/CristianmMst/Gait.git
cd Gait
```

### 2. Configurar el Backend

```bash
cd server

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales de base de datos y otros parámetros necesarios:

```
DB_NAME=nombre_de_tu_base_de_datos
DB_PORT=3306
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña

JWT_SECRET=tu_clave_secreta_para_jwt
CLIENT_URL=http://localhost:3000
```

### 3. Configurar el Frontend

```bash
cd client

# Instalar dependencias
pnpm install
```

## Ejecución

### Iniciar el Backend

```bash
cd server

# Modo desarrollo
pnpm dev

# O para producción
pnpm build
pnpm start
```

El servidor estará disponible en `http://localhost:3000` (o el puerto que configures).

### Iniciar el Frontend

```bash
cd client

# Modo desarrollo
pnpm dev

# O para producción
pnpm build
pnpm start
```

La aplicación cliente estará disponible en `http://localhost:3000` (o el siguiente puerto disponible).

## Variables de Entorno

### Backend (.env)

| Variable | Descripción |
|----------|-------------|
| DB_NAME | Nombre de la base de datos MySQL |
| DB_PORT | Puerto de MySQL (típicamente 3306) |
| DB_HOST | Host de la base de datos (localhost para desarrollo) |
| DB_USER | Usuario de MySQL |
| DB_PASSWORD | Contraseña de MySQL |
| JWT_SECRET | Clave secreta para firmar tokens JWT |
| CLIENT_URL | URL del cliente frontend (para CORS) |

## Tecnologías Utilizadas

### Frontend
- Next.js 15
- React 19
- TailwindCSS
- TypeScript

### Backend
- Express 5
- TypeORM
- MySQL
- TypeScript
- JWT para autenticación

## Licencia

ISC
