"use client";
import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import 'videojs-hls-quality-selector'

const VideoPlayer = ({ streamingId }: { streamingId: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    // Initialize the Video.js player
    const player = videojs(videoRef.current, {
      sources: [
        {
          src: `https://cdn.mikelm.dev/${streamingId}/master.m3u8`,
          type: "application/x-mpegURL",
        },
      ],
    }) as any;


    // Handle fullscreen change to unmute in fullscreen
    player.on("fullscreenchange", () => {
      if (player.isFullscreen()) {
        player.muted(false);
      }
    });


    player.hlsQualitySelector({
      displayCurrentQuality: true, // Display the current quality in the control bar
    });


    // Handle player errors
    player.on("error", () => {
      // Set a custom poster when there's an error
      player.poster("/globe.svg");
    });

    

    playerRef.current = player;

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [streamingId]);

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        className="video-js vjs-default-skin vjs-big-play-centered"
        width="640"
        height="360"
        controls
        preload="auto"
        data-setup="{}"
      >
      </video>
    </div>
  );
};

export default VideoPlayer;
