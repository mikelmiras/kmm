import StreamingPlayer from "@/components/StreamingPlayer";
import Image from "next/image";

export default function Home() {
  return (
   <>
   <StreamingPlayer streamingId="obs_stream" />
   </>     
  )
}
