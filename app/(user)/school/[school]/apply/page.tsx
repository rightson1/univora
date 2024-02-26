"use client";
import { useCustomToast } from "@/components/helpers/functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSendContactEmail } from "@/utils/hooks/client/useEmails";
import { useGetSchool } from "@/utils/hooks/client/useSchool";
import { useParams } from "next/navigation";
import React from "react";

const Contact = () => {
  const { customToast, loading } = useCustomToast();
  const { mutateAsync } = useSendContactEmail();
  const { school: subdomain } = useParams();
  const { data: school } = useGetSchool(subdomain as string);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const name = data.name as string;
    const email = data.email as string;
    let message = data.message as string;
    const reg = data.reg as string;
    message = `
    You have a new admin application from ${name} with email ${email} and registration number ${reg} for ${
      school?.name || "the school"
    }.
    `;

    customToast({
      func: async () => {
        mutateAsync({ name, email, message });
      },
    });
  };
  return (
    <div className="w-full min-h-[70vh] fx-col-c pxs">
      <form onSubmit={handleSubmit} className="gap-3  fx-col-c max-w-[700px]">
        <h1 className="text-4xl font-bold">
          Admin For {school?.name || "School"}
        </h1>
        <p className=" opacity-70 p-style text-center">
          If you get approved to be an admin, you will be able to manage the
          sellers and products in the school.You will receive payments when
          Univora starts making profit .You must be a student at
          {" " + school?.name || "the school"} to be approved.
        </p>
        <Input name="name" required placeholder="Your Name" />
        <Input name="email" required placeholder="Your Email" />
        <Input name="reg" required placeholder="Your Admission Number" />
        <Input name="phone" required placeholder="Your Phone Number" />

        <div className="flex-end">
          <Button type="submit" disabled={loading}>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
