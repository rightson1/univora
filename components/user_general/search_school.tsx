"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { Checkbox } from "../ui/checkbox";
import { Add_School } from "../user/add_school";
export function SearchSchool() {
  const { data: schools, isLoading } = useGetSchoolsOpen();
  const [school, setSchool] = useState("");
  const router = useRouter();
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!school) {
      return toast.error("Please select a school, dont make me angry");
    }
    if (remember) {
      Cookies.set("school", school);
    }
    router.push(`http://${school}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
  };
  const params = useSearchParams();
  const noredirect = params.get("noredirect");
  useEffect(() => {
    if (noredirect) {
      Cookies.remove("school");
    }
  }, [noredirect]);
  const [remember, setRemember] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"indigo"} className="rounded-full text-white">
          Select School
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] sm:max-w-[500px] blr">
        <form onSubmit={submit}>
          <DialogHeader>
            <DialogTitle>Select your School</DialogTitle>
            <DialogDescription>
              Cant find your school?
              <Add_School />
            </DialogDescription>
          </DialogHeader>
          {/* <div className="grid gap-4 py-4">
            <Select
              required
              name="school "
              onValueChange={(value) => setSchool(value)}
            >
              <SelectTrigger className="border-border w-full">
                <SelectValue placeholder="Select School" />
              </SelectTrigger>
              <SelectContent className="blr max-w-[85vw] max-h-[50vh] overflow-y-auto">
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
          </div> */}
          <div className="grid gap-4 py-4 w-full">
            <select
              required
              name="school"
              onChange={(e) => setSchool(e.target.value)}
              className="blr p-2 rounded-md outline-none w-full"
              value={school || ""}
            >
              <option value="" disabled>
                Select school
              </option>
              {!isLoading ? (
                schools
                  ?.sort((a, b) => {
                    if (a.subdomain === "test") return -1;
                    if (b.subdomain === "test") return 1;
                    return a.name.localeCompare(b.name);
                  })
                  .map((school) => (
                    <option
                      value={school.subdomain}
                      key={school.subdomain}
                      className="blr"
                    >
                      {school.name}{" "}
                    </option>
                  ))
              ) : (
                <option value="" disabled>
                  Loading...
                </option>
              )}
            </select>
          </div>
          <DialogFooter>
            <div className="fb w-full">
              <div className="flex gap-2  w-full">
                <Checkbox
                  id="profile"
                  checked={remember}
                  onCheckedChange={(e) => setRemember(e as boolean)}
                />
                <label
                  htmlFor="profile"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember My School
                </label>
              </div>
              <Button type="submit">Lets Go</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
