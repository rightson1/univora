import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { IoClose } from "react-icons/io5";
export const CustomModal = ({
  title,
  children,
  trigger,
  onSubmit,
}: {
  title: string;
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  trigger: React.ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        // asChild
        close={false}
        className="mb:w-[85vw]  mb:max-h-[80vh] 
    max-h-[90vh] rounded-md sm:max-w-[725px] p-4 flex flex-col"
      >
        <form onSubmit={onSubmit}>
          <DialogHeader className="border-b pb-4">
            <div className="fb">
              <h4 className="h3">{title}</h4>
              <DialogClose asChild>
                <Button variant="outline" size="icon" className="w-8 h-8">
                  <IoClose className="text-xl" />
                </Button>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="overflow-y-auto flex-grow px-2">{children}</div>
          <DialogFooter className="border-t pt-4 mb:flex-row mb:justify-end">
            <Button variant="outline" className="mr-2">
              Cancel
            </Button>
            <DialogClose>
              <Button type="submit">Save</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
