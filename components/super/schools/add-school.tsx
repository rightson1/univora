"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdDeleteOutline, MdEdit, MdOutlineMoreHoriz } from "react-icons/md";
import Image from "next/image";
import { CustomModal } from "@/components/shared/CustomModal";
import { IoIosAdd } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const AddSchool = () => {
  return (
    <CustomModal
      title="Add School"
      trigger={<Button size={"sm"}>Add School</Button>}
    >
      <form>
        <div className="grid md:grid-cols-1 w-full  gap-4">
          <div className="flex flex-col space-y-1.5 ">
            <Label htmlFor="name">Name *</Label>
            <Textarea id="name" placeholder="Name of your school" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="subdomain">Subdomian</Label>
            <Input
              id="subdomain"
              placeholder="Subdomain of your product in Kg"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="county">County</Label>
            <Input id="county" placeholder="County of your product in Kg" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="visibility">Visibility</Label>
            <select
              className="w-full h-10 px-3 
            mb-3 border-border border-[1px] rounded-lg 
            bg-background
             focus:outline-none focus:shadow-outline"
            >
              {["Public", "Private"].map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </CustomModal>
  );
};
