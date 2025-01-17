import VideoPlayer from "@/components/VideoPlayer"

const VideoPlayerPage = async ({params}:{params:any}) => {
    const stream_id = await params.video_id
    return(<>
    <VideoPlayer streamingId={stream_id} />
    </>)
}


export default VideoPlayerPage