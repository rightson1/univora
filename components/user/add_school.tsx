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
export function Add_School() {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-black px-2">Add</button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] sm:max-w-[425px] blr">
        <form onSubmit={submit}>
          <DialogHeader>
            <DialogTitle>Add School</DialogTitle>
            <DialogDescription>
              Please enter you detail will notify when school is approved
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-1.5 w-full">
              <Input
                id="name"
                placeholder="Name "
                className=" border-border"
                name="displayName"
                required
              />
              <Input
                id="email"
                name="email"
                placeholder="Email "
                className=" border-border"
                required
              />
              <Input
                id="school"
                placeholder="School "
                className=" border-border"
                name="school"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <div className="flex justify-end w-full">
              <Button type="submit">Lets Go</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
