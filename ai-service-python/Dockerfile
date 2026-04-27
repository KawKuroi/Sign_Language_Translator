# Stage 1: Convert keras -> tflite (tensorflow solo en esta etapa, no en la imagen final)
FROM python:3.10-slim AS converter
WORKDIR /build
RUN pip install --no-cache-dir tensorflow
COPY app/model/asl_model.keras .
COPY convert_model.py .
RUN python convert_model.py

# Stage 2: Runtime (sin tensorflow)
FROM python:3.10-slim
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    libgles2 \
    libegl1 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app/ /app/app/
COPY --from=converter /build/asl_model.tflite /app/app/model/asl_model.tflite

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]
