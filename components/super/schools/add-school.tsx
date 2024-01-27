"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CustomModal } from "@/components/shared/CustomModal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { ISchool, TSchoolStatus } from "@/types";
import { useAddSchool } from "@/utils/hooks/useSchools";
import { customToast } from "@/components/helpers/functions";

export const AddSchool = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { mutateAsync: addSchoolFunc } = useAddSchool();
  const addSchool = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const school: ISchool = {
      name: data.get("name") as string,
      subdomain: data.get("subdomain") as string,
      status: data.get("status") as TSchoolStatus,
    };
    customToast({
      func: async () => addSchoolFunc(school),
      suc: "School added successfully",
      sfunc: () => setModalOpen(false),
      efunc: () => setModalOpen(true),
    });
  };

  return (
    <CustomModal
      title="Add School"
      trigger={<Button size={"sm"}>Add School</Button>}
      onSubmit={addSchool}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
    >
      <div className="grid md:grid-cols-1 w-full  gap-4 py-5">
        <div className="flex flex-col space-y-1.5 ">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            placeholder="Name of your school"
            required
            name="name"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="subdomain">Subdomian</Label>
          <Input
            id="subdomain"
            placeholder="Subdomain of  school"
            name="subdomain"
          />
        </div>
        {/* <div className="flex flex-col space-y-1.5">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Location of the school" />
          </div> */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">Status</Label>
          <select
            name="status"
            className="w-full h-10 px-3 
            mb-3 border-border border-[1px] rounded-lg 
            bg-background
             focus:outline-none focus:shadow-outline"
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
