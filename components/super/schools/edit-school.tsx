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
import { ISchoolFetched, TSchoolStatus } from "@/types";

export const EditSchool = ({ school }: { school: ISchoolFetched }) => {
  const [values, setValues] = useState<ISchoolFetched>(school);
  return (
    <CustomModal
      title="Edit Riara University"
      trigger={
        <Button
          variant={"ghost"}
          size={"sm"}
          className="w-full justify-start gap-2"
        >
          <MdEdit />
          Edit
        </Button>
      }
    >
      <div className="grid md:grid-cols-1 w-full  gap-4 py-5">
        <div className="flex flex-col space-y-1.5 ">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            placeholder="Riara University"
            value={values.name}
            required
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="subdomain">Subdomian</Label>
          <Input
            id="subdomain"
            placeholder="Subdomain of your "
            value={values.subdomain}
            name="subdomain"
            required
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">Status</Label>
          <select
            name="status"
            className="w-full h-10 px-3 
            mb-3 border-border border-[1px] rounded-lg 
            bg-background
             focus:outline-none focus:shadow-outline"
            required
          >
            {(["active", "paused"] as TSchoolStatus[]).map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </CustomModal>
  );
};
