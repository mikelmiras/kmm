import VideoPlayer, { NativeVideoPlayer } from "@/components/VideoPlayer";

const VideoPlayerPage = async ({ params }: { params: any }) => {
  const stream_id = await params.video_id;
  return (
    <>
      <h1>Video.js player:</h1>
      <VideoPlayer streamingId={stream_id} />
      <h1>HTML5 Player:</h1>
      <NativeVideoPlayer streamingId={stream_id} />
    </>
  );
};

export default VideoPlayerPage;
