"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { TOption } from "@/types/sellerTypes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageInputWithView } from "../utils/image-input";
import { Editor } from "../utils/Editor";
import { ISellerFetched, ISocialLink, InputChangeEventTypes } from "@/types";
import { useSellerAuth } from "@/utils/sellerAuth";
import { useUpdateSeller } from "@/utils/hooks/useSeller";
import {
  deleteFile,
  uploadFile,
  useCustomToast,
} from "@/components/helpers/functions";

export const SettingsForm = () => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const { seller, fetchSeller } = useSellerAuth();
  const [values, setValues] = useState<ISellerFetched>(seller);
  const { mutateAsync: editSeller } = useUpdateSeller();
  const { loading, customToast } = useCustomToast();

  const handleChanges = (e: ChangeEvent<InputChangeEventTypes>) => {
    setValues((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let url = "";
    customToast({
      func: async () => {
        if (thumbnail) {
          seller.profileImage && deleteFile(seller.profileImage);
          url = await uploadFile(thumbnail, `sellers/${values.slug}/thumbnail`);
          await editSeller({
            ...values,
            profileImage: url,
          });
        } else {
          await editSeller(values);
        }
      },
      sfunc: async () => {
        await fetchSeller(seller.uid);
      },
      efunc: async () => {
        url && deleteFile(url);
      },
    });
  };
  return (
    <form className="w-full rounded-lg " onSubmit={submit}>
      <div className="fb">
        <h2 className="h3">Settings</h2>
        <Button disabled={loading} type="submit" size={"sm"}>
          Save Settings
        </Button>
      </div>

      <div className="py-5 fx-c gap-5">
        <GeneralInformation
          values={values}
          setValue={setValues}
          handleChanges={handleChanges}
        />
        <ContactInformation values={values} setValue={setValues} />
        <ThumbNail {...{ thumbnail, setThumbnail }} />
      </div>
    </form>
  );
};
const GeneralInformation = ({
  values,
  setValue,
  handleChanges,
}: {
  values: ISellerFetched;
  setValue: React.Dispatch<SetStateAction<ISellerFetched>>;
  handleChanges: (e: ChangeEvent<InputChangeEventTypes>) => void;
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>General Information*</CardTitle>
        <CardDescription>
          Please enter the general information about your business.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full  gap-4">
            <div className="flex flex-col space-y-1.5  md:col-span-2">
              <Label htmlFor="name">Business Profile Name</Label>
              <Input
                id="name"
                value={values.name}
                onChange={handleChanges}
                placeholder="Name of your business"
              />
            </div>
            <div className="flex flex-col space-y-1.5  md:col-span-2">
              <Label htmlFor="slug">
                Business Name (no spaces\will form link to you business)
              </Label>
              <Input
                value={values.slug}
                onChange={handleChanges}
                id="slug"
                placeholder="Same as @username in twitter/ig"
              />
            </div>
            <div className="flex flex-col space-y-1.5 md:col-span-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={values.phone}
                onChange={handleChanges}
                placeholder="
                Enter the phone number of your business  
                "
              />
            </div>
            <div className="flex flex-col space-y-1.5 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={values.description}
                onChange={handleChanges}
                placeholder="Please enter the products or services offered by your business."
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

const ThumbNail = ({
  thumbnail,
  setThumbnail,
}: {
  thumbnail: File | null;
  setThumbnail: React.Dispatch<SetStateAction<File | null>>;
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Profile Image</CardTitle>
        <CardDescription>
          Please upload a profile image for your business.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ImageInputWithView file={thumbnail} setFile={setThumbnail} />
      </CardContent>
    </Card>
  );
};

const ContactInformation = ({
  values,
  setValue,
}: {
  values: ISellerFetched;
  setValue: React.Dispatch<SetStateAction<ISellerFetched>>;
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const platform = e.target.id as ISocialLink["platform"];
    const updatedSocials = values.socials.map((social) => {
      if (social.platform === platform) {
        return { ...social, link: e.target.value };
      }
      return social;
    });

    if (!updatedSocials.some((social) => social.platform === platform)) {
      updatedSocials.push({ platform, link: e.target.value });
    }
    setValue({
      ...values,
      socials: updatedSocials,
    });
  };

  const getV = (site: ISocialLink["platform"]) => {
    return values.socials.find((social) => social.platform == site)?.link;
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>
          Please enter the contact information of your business.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
            <div className="flex flex-col space-y-1.5 md:col-span-2">
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input
                value={getV("whatsapp")}
                id="whatsapp"
                onChange={handleChange}
                placeholder="+254"
              />
            </div>

            <div className="flex flex-col space-y-1.5 md:col-span-2">
              <Label htmlFor="tiktok">Tiktok</Label>
              <Input
                id="tiktok"
                onChange={handleChange}
                value={getV("tiktok")}
                placeholder="Enter your TikTok username"
              />
            </div>
            <div className="flex flex-col space-y-1.5 md:col-span-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={getV("instagram")}
                onChange={handleChange}
                placeholder="Enter your instagram name
              "
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
