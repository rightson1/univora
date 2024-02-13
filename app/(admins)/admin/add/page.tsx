"use client";
import { Input } from "@/components/ui/input";
import { useGetSchoolsOpen } from "@/utils/hooks/useSchools";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import toast from "react-hot-toast";
import { useCustomToast } from "@/components/helpers/functions";
import { Button } from "@/components/ui/button";
import { useAddAdmin } from "@/utils/hooks/useAdmin";

const New_ADMIN = () => {
  const { data: schools, isLoading } = useGetSchoolsOpen();
  const { customToast, loading } = useCustomToast();
  const { mutateAsync: add } = useAddAdmin();
  const addAdmin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = e.currentTarget.displayName.value as string;
    const email = e.currentTarget.email.value as string;
    const school = e.currentTarget.school?.value as string;
    const password = e.currentTarget.password.value as string;
    const pass = e.currentTarget.pass.value as string;

    const createAdmin = async () => {
      let uid = "";
      await createUserWithEmailAndPassword(auth, email.trim(), password.trim())
        .then(async (userCredential) => {
          const user = userCredential.user;
          const { email, uid: id } = user;
          uid = id;
        })
        .catch((error) => {
          const errorMessage = error.message;
          throw new Error(errorMessage);
        });
      await add({
        displayName: name,
        email: email,
        school: school,
        role: "admin",
        uid,
        pass,
      });
    };
    customToast({
      func: createAdmin,
    });
  };
  return (
    <div className="w-full h-screen fc bg-background pxs">
      <div className="flex   w-full h-full mb:max-w-64 md:w-96  flex-col items-center justify-center gap-5">
        <div className="flex flex-col items-center justify-center w-full ">
          <h1 className="text-3xl font-bold text-primary">New Admin</h1>
          <p className="text-sm text-muted-foreground">
            Add a new admin to the system
          </p>
        </div>
        <form
          onSubmit={addAdmin}
          className="flex flex-col items-center justify-center w-full "
        >
          <div className="flex flex-col items-center justify-center w-full"></div>
          <div className="flex flex-col space-y-1.5 w-full">
            <Input
              id="name"
              placeholder="Name "
              className="bg-muted border-border"
              name="displayName"
              required
            />
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
              type="password"
            />
            <Input
              id="pass"
              name="pass"
              placeholder="Pass "
              className="bg-muted border-border"
              required
            />
            <Select required name="school">
              <SelectTrigger className="bg-muted border-border w-full">
                <SelectValue placeholder="Select School" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Schools</SelectLabel>
                  {schools?.map((school) => (
                    <SelectItem key={school._id} value={school._id}>
                      {school.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button disabled={loading}>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default New_ADMIN;
