# Build-time environment para Node
FROM node:18-alpine

WORKDIR /app

# Copiar configuración de dependencias
COPY package.json package-lock.json* ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Exponer el puerto de Vite
EXPOSE 3000

# Añadir el comando para que inicie la app escuchando globalmente
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
