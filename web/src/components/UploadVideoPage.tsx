"use client";

import { useUser } from "@/context/userContext";
import { chunkFile } from "@/util/file";
import { Progress } from "@nextui-org/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCloudCircleSharp } from "react-icons/io5";

export default function UploadVideoPage() {
  const user = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    if (user.loaded && !user.user) redirect("/signin");
  }, [user]);

  async function uploadChunks(file: File, filename:string, extension: string) {
    const chunks = await chunkFile(file);
    console.log("File split into chunks:", chunks);
    let i = 0;
    let percent = 0
    while (i < chunks.length) {
      const chunk = chunks[i]
      console.log(`Trying to upload chunk ${i}/${chunks.length}`);
      const formdata = new FormData();
      formdata.append("chunkId", i.toString());
      formdata.append("fileId", filename);
      formdata.append("file", chunk as any, file.name);
      const r = await fetch("/api/s3/chunk", {
        method: "POST",
        body: formdata,
      })
        const data = await r.json()

          if (!data.error) {
            i += 1;
            percent = (i / (chunks.length + 1)) * 100;
            setPercentage(percent)
          } else {
            // wait 2 seconds
            await wait(2000)
          }
    }


    const build = await fetch("/api/s3/rebuild/" + filename + "/" + extension)
    const res = await build.json()
    if (!res.status) {
      setPercentage(0)
      alert("An error occurred uploading the video")
    }else{
      setPercentage(100)
      alert("File uploaded successfully")
      setTimeout(()=>{
        setPercentage(0)
        setFile(null)
      }, 200)
    }
  }

  function wait(ms : number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <>
      <div className="w-[75%] flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Upload video</h1>

        <input
          id="video-input"
          type="file"
          accept="video/*"
          onChange={async (e) => {
            const files = e.currentTarget.files;
            if (!files) return;
            const f = files[0]
            setFile(files[0]);
            const id = crypto.randomUUID().toString()
            const extension = f.name.split(".")[f.name.split(".").length - 1]
            const filename = id + "." + extension
            setPercentage(0)
            uploadChunks(f, filename, extension)
          }}
          className="hidden"
        />
        <div
          onClick={() => {
            document.getElementById("video-input")?.click();
          }}
          className="flex w-full cursor-pointer text-center flex-col border-[0.1rem] border-dotted rounded-lg content-center justify-center items-center"
        >
          <span className="text-5xl">
            <IoCloudCircleSharp />
          </span>
          Click here to select a video
        </div>
        <Progress size="sm" value={percentage} />
      </div>
    </>
  );
}
