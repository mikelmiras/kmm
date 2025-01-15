from flask import * 


app = Flask(__name__)

@app.get("/api/s3/health")
def checkHealth():
    return make_response({"status":True})


if __name__ == "__main__":
    app.run(port=8000)