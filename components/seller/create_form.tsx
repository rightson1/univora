"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useGetSchoolsOpen } from "@/utils/hooks/useSchools";
import { useCustomToast } from "@/components/helpers/functions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useAddSeller } from "@/utils/hooks/useSeller";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const Create_Seller = () => {
  const { data: schools, isLoading } = useGetSchoolsOpen();
  const { customToast, loading } = useCustomToast();
  const { mutateAsync: add_seller } = useAddSeller();
  const router = useRouter();
  const addSeller = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!schools) {
      return toast.error("Please select a school");
    }
    const name = e.currentTarget.displayName.value as string;
    const email = e.currentTarget.email.value as string;
    const school = e.currentTarget.school?.value as string;
    const phone = e.currentTarget.phone.value as string;
    const password = e.currentTarget.password.value as string;
    const data = { name, email, school, phone, password };
    const createAdmin = async () => {
      let id = "";
      await createUserWithEmailAndPassword(auth, email.trim(), password.trim())
        .then(async (userCredential) => {
          const user = userCredential.user;
          const { uid } = user;
          id = uid;
        })
        .catch((error) => {
          const errorMessage = error.message;
          throw new Error(errorMessage);
        });
      await add_seller({ uid: id, ...data });
    };
    customToast({
      func: createAdmin,
      sfunc: () => {
        router.push("/");
      },
    });
  };
  return (
    <form onSubmit={addSeller} className="fc min-h-screen">
      <Card className="w-[90vw] border-none max-w-[500px]">
        <CardHeader>
          <CardTitle>Welcome Aboard</CardTitle>
          <CardDescription>
            Your short on cash, create an account and sell this phone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1  w-full  gap-4">
            <div className="flex flex-col space-y-1.5 ">
              <Label htmlFor="displayName">Name</Label>
              <Input
                id="name"
                required
                placeholder="Name of your Business"
                name="displayName"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="Your Phone"
                name="phone"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Your Email"
                name="email"
                required
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Your Password"
                name="password"
                required
              />
            </div>
            <Select required name="school">
              <SelectTrigger className="bg-muted border-border w-full">
                <SelectValue placeholder="Select School" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    {isLoading ? "Loading..." : "Select School"}
                  </SelectLabel>
                  {schools?.map((school) => (
                    <SelectItem key={school._id} value={school._id}>
                      {school.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={loading}>
            Lets Go
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
