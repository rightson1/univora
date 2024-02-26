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
import { useCustomToast } from "@/components/helpers/functions";
import { useUpdateSchool } from "@/utils/hooks/useSchools";

export const EditSchool = ({ school }: { school: ISchoolFetched }) => {
  const [values, setValues] = useState<ISchoolFetched>(school);
  const { loading, customToast, modalOpen, setModalOpen } = useCustomToast();
  const { mutateAsync: updateSchoolFunc } = useUpdateSchool();
  const edit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    customToast({
      func: async () =>
        updateSchoolFunc({
          _id: school._id,
          name: values.name,
          subdomain: values.subdomain,
          status: values.status,
        }),
      suc: "School updated successfully",
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <CustomModal
      title="Edit Riara University"
      onSubmit={edit}
      disableSubmit={loading}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
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
            name="name"
            placeholder="Riara University"
            value={values.name}
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                status: e.target.value as TSchoolStatus,
              }))
            }
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
