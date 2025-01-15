import boto3
from dotenv import *
from botocore.config import Config
import boto3, os
load_dotenv()

S3_URL = os.environ.get("S3_URL")
S3_AUTH = os.environ.get("S3_AUTH_TOKEN")
S3_SECRET = os.environ.get("S3_SECRET")
S3_BUCKET = os.environ.get("S3_BUCKET")

s3_client = boto3.client('s3',
                         endpoint_url=S3_URL,
                         aws_access_key_id=S3_AUTH,
                         aws_secret_access_key=S3_SECRET,
                         config=Config(signature_version='s3v4')
                        )


def uploadFolderToS3(folder:str, video_id:str):
    folder_path = "{}".format(str(folder))

    try:
        os.makedirs(folder_path, exist_ok=True)
    except Exception as e:
        print("Error creating output folder: ", + str(e) )
        return
    with open(folder_path + "/master.m3u8", "w+") as f:
        f.write("""#EXTM3U
#EXT-X-STREAM-INF:BANDWIDTH=5000000,RESOLUTION=1920x1080
1080p.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=3000000,RESOLUTION=1280x720
720p.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=1000000,RESOLUTION=854x480
480p.m3u8
""")
    filelist = os.listdir(folder_path)
    for file in filelist:
        full_file_path = "{}/{}".format(folder_path, file, video_id)
        s3_client.upload_file(full_file_path, S3_BUCKET, video_id + "/" + file, ExtraArgs={'ACL': 'public-read'})
    
