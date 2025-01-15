"use client";
import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const StreamingPlayer = ({ streamingId }: { streamingId: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    // Initialize the Video.js player
    const player = videojs(videoRef.current, {
      autoplay: true,
      controls: true,
      muted: true,
      preload: "auto",
      poster: "/path-to-default-poster.jpg", // Initial poster image
      sources: [
        {
          src: `https://streaming-eu.mikelm.dev/hls/${streamingId}.m3u8`,
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

    // Disable seeking functionality
    player.ready(() => {
      player.on("seeking", () => {
        if (!player.liveTracker || !player.liveTracker.isLive()) {
          player.currentTime(player.liveTracker.liveCurrentTime());
        }
      });

      if (player.liveTracker && player.liveTracker.isLive()) {
        player.liveTracker.seekToLiveEdge();
      }
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
        className="video-js vjs-default-skin"
        controls
        muted
        autoPlay
        width="640"
        height="360"
        data-setup="{}"
      ></video>
    </div>
  );
};

export default StreamingPlayer;
