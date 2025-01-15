FROM python:3.10-slim
ENV TZ=Europe/Madrid
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
RUN chmod +x process_video
CMD ["gunicorn", "--bind=0.0.0.0:5000", "--workers=5", "main:app"]