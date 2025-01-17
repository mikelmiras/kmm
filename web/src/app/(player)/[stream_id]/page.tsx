import StreamingPlayer from "@/components/StreamingPlayer"

export default async function StreamPage ({params} : any) {
    const stream_id = await params.stream_id
    return(
        <>
        <StreamingPlayer streamingId={stream_id} />
        </>
    )
}