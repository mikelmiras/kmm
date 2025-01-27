import React from "react";
import ReactDOM from "react-dom";
import WebcamStreamer from "@/components/StreamWebcam";

const StreamPage = () => {
  return (
    <div>
      <h1>RTMP Webcam Streaming</h1>
      <WebcamStreamer rtmpUrl="rtmp://188.245.127.64/live/webcam" />
    </div>
  );
};

export default StreamPage;
