'use client';

import React, { useRef, useState } from 'react';
import { createFFmpeg, FFmpeg } from '@ffmpeg/ffmpeg'; // Import the types for FFmpeg

interface WebcamStreamerProps {
  rtmpUrl: string; // RTMP server URL
}

const WebcamStreamer: React.FC<WebcamStreamerProps> = ({ rtmpUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null); // Reference to the video element
  const mediaRecorderRef = useRef<MediaRecorder | null>(null); // Reference to MediaRecorder
  const [isStreaming, setIsStreaming] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null); // Webcam MediaStream

  const startStreaming = async () => {
    try {
      // Access the user's webcam
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream; // Display webcam on the video element
      }
      setMediaStream(stream);

      // Dynamically import FFmpeg and use the correct types
      const { createFFmpeg } = (await import('@ffmpeg/ffmpeg')) as typeof import('@ffmpeg/ffmpeg');
      const ffmpeg: FFmpeg = createFFmpeg({ log: true });
      await ffmpeg.load();

      // Set up MediaRecorder to capture the stream
      const options: MediaRecorderOptions = {
        mimeType: 'video/webm; codecs=vp8',
      };
      const mediaRecorder = new MediaRecorder(stream, options);

      mediaRecorder.ondataavailable = async (event) => {
        if (event.data && event.data.size > 0) {
          // Transcode video data to RTMP
          const videoBlob = new Blob([event.data], { type: 'video/webm' });
          const file = new Uint8Array(await videoBlob.arrayBuffer());
          ffmpeg.FS('writeFile', 'input.webm', file);

          await ffmpeg.run(
            '-i',
            'input.webm',
            '-c:v',
            'libx264',
            '-preset',
            'ultrafast',
            '-f',
            'flv',
            rtmpUrl
          );
        }
      };

      mediaRecorder.start(1000); // Record in chunks of 1 second
      mediaRecorderRef.current = mediaRecorder;
      setIsStreaming(true);
    } catch (err) {
      console.error('Error accessing webcam or starting stream:', err);
    }
  };

  const stopStreaming = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop(); // Stop the MediaRecorder
    }
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop()); // Stop webcam
    }
    setIsStreaming(false);
  };

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ width: '100%', height: 'auto', border: '1px solid black' }}
      ></video>
      <div style={{ marginTop: '10px' }}>
        {!isStreaming ? (
          <button onClick={startStreaming}>Start Streaming</button>
        ) : (
          <button onClick={stopStreaming}>Stop Streaming</button>
        )}
      </div>
    </div>
  );
};

export default WebcamStreamer;
