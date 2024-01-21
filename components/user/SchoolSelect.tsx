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
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoSearch } from "react-icons/io5";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function SchoolSelect() {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <button className="flex bg-transparent fc ">
          <IoSearch className=" text-2xl text-border mx-2" />
          <input
            placeholder="Ctrl K, Search.."
            className="w-full bg-transparent outline-none"
          />
        </button>
      </DialogTrigger>
      <DialogContent
        close={false}
        className="mb:w-[85vw] rounded-md sm:max-w-[425px] p-0 "
      >
        <Command className="bg-card border-none">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {["Riara", "KU", "TUK"].map((school) => (
                <CommandItem
                  className="cursor-pointer"
                  key={school}
                  onSelect={() => {
                    localStorage.setItem("school", school);
                    router.push(`/${school}`);
                    setOpen(false);
                  }}
                >
                  {school}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

export const SchoolNavigator = () => {
  const [school, setSchool] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("school")) {
        router.push(`/${localStorage.getItem("school")}`);

        setSchool(true);
      } else {
        setSchool(false);
      }
    }
  }, []);
  return null;
};
