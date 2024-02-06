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

export const SettingsForm = () => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [media, setMedia] = useState<File[]>([]);
  return (
    <div className="w-full rounded-lg ">
      <div className="fb">
        <h2 className="h3">Settings</h2>
        <Button size={"sm"}>Save Settings</Button>
      </div>

      <div className="py-5 fx-c gap-5">
        <GeneralInformation />
        <Description />
        <ContactInformation />
        <ThumbNail {...{ thumbnail, setThumbnail }} />
      </div>
    </div>
  );
};
const GeneralInformation = () => {
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
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your business" />
            </div>
            <div className="flex flex-col space-y-1.5 md:col-span-2">
              <Label htmlFor="shortDescription">
                Products or Services Offered
              </Label>
              <Textarea
                id="productsOrServicesOffered"
                placeholder="
                  Please enter the products or services offered by your business."
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export const Description = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Description</CardTitle>
        <CardDescription>
          Please enter the description of your business.
        </CardDescription>
      </CardHeader>
      <CardContent>{/* <Editor /> */}</CardContent>
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
        <CardTitle>Thumbnail</CardTitle>
        <CardDescription>
          Used to represent your product during checkout, social sharing and
          more.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ImageInputWithView file={thumbnail} setFile={setThumbnail} />
      </CardContent>
    </Card>
  );
};

const ContactInformation = () => {
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
              <Input id="whatsapp" placeholder="WhatsApp Number" />
            </div>
            <div className="flex flex-col space-y-1.5 md:col-span-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="Phone Number" />
            </div>
            <div className="flex flex-col space-y-1.5 md:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Email" />
            </div>
            <div className="flex flex-col space-y-1.5 md:col-span-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" placeholder="Website" />
            </div>
            <div className="flex flex-col space-y-1.5 md:col-span-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input id="instagram" placeholder="Instagram" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
