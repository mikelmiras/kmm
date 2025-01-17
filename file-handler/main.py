import logging
import re
import threading
import time
import uuid
from flask import Flask, request, make_response
import os
from dotenv import *
from botocore.config import Config
import boto3 
from util.files import *
import subprocess
load_dotenv()

S3_URL = os.environ.get("S3_URL")
S3_AUTH = os.environ.get("S3_AUTH_TOKEN")
S3_SECRET = os.environ.get("S3_SECRET")
S3_BUCKET = os.environ.get("S3_BUCKET")
ABSOLUTE_PATH = os.getcwd()
def process_video(video_name):
    print(f"Processing video: {video_name}")
    process_path = os.path.join(ABSOLUTE_PATH, "process_video")
    video_without_extension = video_name.split(".")[0]
    OUTPUT_FOLDER = f"{ABSOLUTE_PATH}/uploads/{video_without_extension}"
    print("Running command: ", [process_path, f"{ABSOLUTE_PATH}/uploads/{video_name}", OUTPUT_FOLDER])
    process = subprocess.run(
    [process_path, f"{ABSOLUTE_PATH}/uploads/{video_name}", OUTPUT_FOLDER],
    capture_output=True
)  
    if (process.returncode != 0):
        print("ffmpeg action didn't success")
        return
    print(f"Processing {video_name} completed. Uploading to S3...")
    uploadFolderToS3(f"{ABSOLUTE_PATH}/uploads/{video_without_extension}", video_without_extension)
    print(f"Video {video_name} uploaded to S3.")

s3_client = boto3.client('s3',
                         endpoint_url=S3_URL,
                         aws_access_key_id=S3_AUTH,
                         aws_secret_access_key=S3_SECRET,
                         config=Config(signature_version='s3v4')
                        )

app = Flask(__name__)

app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000

@app.get("/api/s3/health")
def checkHealth():
    return make_response({"status":True})

try:
    os.makedirs("uploads", exist_ok=True)
except Exception as e:
    logging.error("Error creating uploads folder")


@app.post("/api/s3/chunk", endpoint="Post chunk file")
def receiveChunkEndpoint():
    files = request.files
    fileId = request.form.get("fileId")
    chunkId = request.form.get("chunkId")
    if not fileId or not files or not chunkId:
        return make_response({"error":"Invalid data received"}, 400)
    try:
        os.makedirs("uploads/{}".format(str(fileId)), exist_ok=True)
    except Exception as e:
        logging.error("Error creating temp folder: ", str(e))
        return make_response({"error":"Error"}, 500)
    try:
        request.files["file"].save("uploads/{}/{}".format(str(fileId), str(chunkId)))

        return make_response({"status":True})
    except Exception as e:
        logging.error("Error saving file: "  + str(e))
        return make_response({"error":"Error saving file"}, 500)


def launch_in_bg(target_func, *args, **kwargs):
    thread = threading.Thread(target=target_func, args=args, kwargs=kwargs)
    thread.daemon = True  # Ensure the thread exits when the main program ends
    thread.start()

@app.get("/api/s3/rebuild/<chunk_name>/<file_extension>", endpoint="Rebuild chunk into a file")
def rebuildChunksEndpoint(chunk_name, file_extension):
    try:
        file_list = os.listdir("uploads/{}".format(str(chunk_name)))
    except Exception as e:
        logging.error(str(e))
        return make_response({"error":"File not found"}, 404)
    
    try:
        file_list = sorted([int(f) for f in file_list])
    except Exception as e:
        logging.error(str(e))
        return make_response({"error":"error mounting file"})

    new_name = chunk_name

    try:
        print("Trying to create file: ", f"{ABSOLUTE_PATH}/uploads/{str(new_name)}")
        with open(f"{ABSOLUTE_PATH}/uploads/{str(new_name)}", "wb+") as f:
            for chunk in file_list:
                file_path = f"{ABSOLUTE_PATH}/uploads/{str(chunk_name)}/{str(chunk)}"
                with open(file_path, "rb") as chunk_bytes:
                    f.write(chunk_bytes.read())
                os.remove(file_path)
        print("Chunks analyzed. Full video generated at: ", f"{ABSOLUTE_PATH}/uploads/{str(new_name)}")
        os.rmdir(f'{ABSOLUTE_PATH}/uploads/{str(chunk_name)}')
        print("Removed: ", f'{ABSOLUTE_PATH}/uploads/{str(chunk_name)}')

        full_file_path = f"{ABSOLUTE_PATH}/uploads/{new_name}"
        launch_in_bg(process_video, new_name)
        return make_response({"status":True})
    except Exception as e:
        logging.error("Error rebuilding file: " + str(e))
        return make_response({"error":"Error rebuilding the file"}, 500)



if __name__ == "__main__":
    app.run(port=8000)