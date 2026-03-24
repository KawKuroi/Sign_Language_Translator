# Usa una imagen oficial ligera de Python 3.10
FROM python:3.10-slim

# Evita que se escriban archivos .pyc y elimina el buffer de salida
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Instala dependencias del sistema requeridas para OpenCV y ML
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Se copia el directorio app para desarrollo/producción. 
COPY app/ /app/app/

# Exponer el puerto
EXPOSE 8000

# Con uvicorn y reload activo por defecto, util para desarrollo
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
