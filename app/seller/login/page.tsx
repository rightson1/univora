"use client";
import { Input } from "@/components/ui/input";

import React from "react";
import { useCustomToast } from "@/components/helpers/functions";
import { Button } from "@/components/ui/button";
import { useSellerAuth } from "@/utils/sellerAuth";

const LOGIN = () => {
  const { customToast, loading } = useCustomToast();
  const { signIn } = useSellerAuth();
  const addAdmin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value as string;
    const password = e.currentTarget.password.value as string;
    customToast({
      func: async () => signIn({ email, password }),
    });
  };
  return (
    <div className="w-full h-screen fc bg-background pxs">
      <div className="flex   w-full h-full mb:max-w-64 md:w-96  flex-col items-center justify-center gap-5">
        <div className="flex flex-col items-center justify-center w-full ">
          <h1 className="text-3xl font-bold text-primary">Login</h1>
          <p className="text-sm text-muted-foreground">Welcome Back</p>
        </div>
        <form
          onSubmit={addAdmin}
          className="flex flex-col items-center justify-center w-full "
        >
          <div className="flex flex-col items-center justify-center w-full"></div>
          <div className="flex flex-col space-y-1.5 w-full">
            <Input
              id="email"
              name="email"
              placeholder="Email "
              className="bg-muted border-border"
              required
            />
            <Input
              id="password"
              name="password"
              placeholder="Password "
              className="bg-muted border-border"
              required
              // type="password"
            />

            <Button disabled={loading}>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LOGIN;
