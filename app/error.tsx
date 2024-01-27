"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="h-[calc(100vh-100px)]  flex flex-col items-center justify-center gap-3 pxs">
      <p className="text-xl  text-center">There was a problem</p>
      <h1 className="text-xl text-red-500 tc">
        {error.message || "Something went wrong"}
      </h1>
      <div className="flex gap-2">
        <Button onClick={() => reset()}>Retry</Button>
        <Button onClick={() => window.location.reload()}>Reload</Button>
      </div>
    </div>
  );
}
