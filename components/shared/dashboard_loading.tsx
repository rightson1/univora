"use client";
import React, { useEffect } from "react";
import { loadingMessages } from "@/utils/loadingMessages";
export const DashboardLoading = () => {
  const [loadingMessage, setLoadingMessage] = React.useState<
    string | undefined
  >("");
  useEffect(() => {
    const randomMessage =
      loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    setLoadingMessage(randomMessage);
  }, []);
  return (
    <div className="h-screen  py-10 fx-col-c gap-5 relative">
      <span className="loader"></span>
      <p className="pxs text-center">{"Loading... " + loadingMessage}</p>
    </div>
  );
};
