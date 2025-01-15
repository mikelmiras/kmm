FROM python:3.10-slim
ENV TZ=Europe/Madrid
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["gunicorn", "--bind=0.0.0.0:8000", "--workers=5", "main:app"]