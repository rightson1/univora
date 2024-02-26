"use client";
import { useCustomToast } from "@/components/helpers/functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSendContactEmail } from "@/utils/hooks/client/useEmails";
import React from "react";

export const Contact_Me = () => {
  const { customToast, loading } = useCustomToast();
  const { mutateAsync } = useSendContactEmail();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const name = data.name as string;
    const email = data.email as string;
    const message = data.message as string;
    customToast({
      func: async () => {
        mutateAsync({ name, email, message });
      },
    });
  };
  return (
    <div className="w-full min-h-[70vh] fx-col-c pxs">
      <form onSubmit={handleSubmit} className="gap-3  fx-col-c ">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className=" opacity-70 p-style tc">
          You can contact us by filling the form below
        </p>
        <Input name="name" required placeholder="Your Name" />
        <Input name="email" required placeholder="Your Email" />
        <Textarea name="message" required placeholder="Your Message" />
        <div className="flex-end">
          <Button type="submit" disabled={loading}>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};
