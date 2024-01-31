"use client";
import { Button } from "@/components/ui/button";
import { useSuperAuth } from "@/utils/SuperAuth";
import React from "react";

const Login = () => {
  const { handleSignInSuper } = useSuperAuth();
  return (
    <div className="flex justify-center w-full h-screen items-center">
      <div className="flex items-center justify-center h-full w-full">
        <Button onClick={handleSignInSuper}>Continue With Google</Button>
      </div>
    </div>
  );
};

export default Login;
