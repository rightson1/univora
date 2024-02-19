"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetSchoolsOpen } from "@/utils/hooks/useSchools";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
export function SearchSchool() {
  const { data: schools, isLoading } = useGetSchoolsOpen();
  const [school, setSchool] = useState("");
  const router = useRouter();
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!school) {
      return toast.error("Please select a school, dont make me angry");
    }
    Cookies.set("school", school);
    router.push(`http://${school}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"indigo"} className="rounded-full text-white">
          Search School
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] blr">
        <form onSubmit={submit}>
          <DialogHeader>
            <DialogTitle>Search for a school</DialogTitle>
            <DialogDescription>
              Search for you school and select it to continue
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Select
              required
              name="school "
              onValueChange={(value) => setSchool(value)}
            >
              <SelectTrigger className="border-border w-full">
                <SelectValue placeholder="Select School" />
              </SelectTrigger>
              <SelectContent className="blr">
                <SelectGroup>
                  <SelectLabel>
                    {isLoading ? "Loading..." : "Schools"}
                  </SelectLabel>
                  {schools?.map((school) => (
                    <SelectItem key={school.subdomain} value={school.subdomain}>
                      {school.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit">Lets Go</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
