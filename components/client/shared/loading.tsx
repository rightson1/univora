"use client";
import React, { useEffect } from "react";
import { loadingMessages } from "@/utils/loadingMessages";
export const Loading = () => {
  const [loadingMessage, setLoadingMessage] = React.useState<
    string | undefined
  >("");
  useEffect(() => {
    const randomMessage =
      loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    setLoadingMessage(randomMessage);
  }, []);
  return (
    <div className="main-h  py-10 fx-col-c gap-5 relative">
      <span className="load"></span>
      <p className="pxs text-center text-indigo">{"loading... "}</p>
    </div>
  );
};
