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

  useEffect(() => {
    if (user.loaded && !user.user) redirect("/signin");
  }, [user]);

  return (
    <>
      <div className="w-[75%] flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Upload video</h1>

        <input
          id="video-input"
          type="file"
          accept="video/*"
          onChange={(e) => {
            const files = e.currentTarget.files;
            if (!files) return;
            setFile(files[0]);

            chunkFile(files[0])
              .then((chunks) => {
                console.log("File split into chunks:", chunks);
              })
              .catch((error) => {
                console.error("Error splitting file:", error);
              });
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
        <Progress size="sm" value={0} />
      </div>
    </>
  );
}
