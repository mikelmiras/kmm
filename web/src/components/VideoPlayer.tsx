"use client";
import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-hls-quality-selector";

const VideoPlayer = ({ streamingId }: { streamingId: string }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    // Initialize the Video.js player
    const player = videojs(videoRef.current, {
      autoplay: false, // Allow the user to control playback
      controls: true,
      preload: "auto",
      fluid: true,
    }) as any;

    player.hlsQualitySelector({
      displayCurrentQuality: true,
    });

    player.on("fullscreenchange", () => {
      if (player.isFullscreen()) {
        player.muted(false);
      }
    });

    playerRef.current = player;

    return () => {
      if (player) {
        player.dispose(); // Dispose player on component unmount
      }
    };
  }, [streamingId]);

  return (
    <div className="video-container">
      <link
        href="https://vjs.zencdn.net/8.16.1/video-js.css"
        rel="stylesheet"
      />
      <video
        ref={videoRef}
        id="videoPlayer"
        className="video-js vjs-default-skin vjs-big-play-centered"
        controls
        preload="auto"
        width="640"
        height="360"
        data-setup="{}"
      >
        <source
          src={`https://streaming-eu.mikelm.dev/hls/test/${streamingId}/master.m3u8`}
          type="application/x-mpegURL"
        />
      </video>
    </div>
  );
};

export default VideoPlayer;
