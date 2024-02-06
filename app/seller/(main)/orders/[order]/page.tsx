import { Button } from "@/components/ui/button";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GoDotFill } from "react-icons/go";
import { EditGeneralInfo } from "@/components/seller/product/edit-general-info";
import { MdDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Image from "next/image";
import { EditThumbnail } from "@/components/seller/product/edit-thumbnail";
import { EditMedia } from "@/components/seller/product/edit-media";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
const Order = () => {
  return (
    <div className="p-4">
      <button className="text-sm fc">
        <FaArrowLeftLong className="mr-2" />
        <span>Back To Orders</span>
      </button>
      <div className="py-5 fx-c gap-5">
        <div className="flex gap-5 flex-col md:flex-row w-full">
          <div className="fx-c flex-[2] gap-5">
            <GeneralInfo />
            <Summary />
          </div>
          <div className="fx-c flex-1 gap-5">
            <Notes />
          </div>
        </div>
      </div>
    </div>
  );
};

const GeneralInfo = () => {
  return (
    <Card className="w-full h-auto ">
      <CardHeader className="mb:p-4">
        <div className="fb">
          <h4 className="h3 text-foreground">#2</h4>
          <div className="fc">
            <Button variant="ghost" className="hidden md:flex">
              <GoDotFill className="mr-2 text-indigo" />
              Pending
            </Button>
            {/* <EditGeneralInfo /> */}
          </div>
        </div>
        <CardDescription>20th may 2023 12:00pm</CardDescription>
      </CardHeader>
      <CardContent className="fx-c gap-4 w-full h-auto ">
        <h4 className="h4">Details</h4>
        <div className="flex mb:gap-5 flex-wrap md:flex-row  items-center md:space-x-4 text-sm">
          <div className="flex gap-5">
            <div className="fx-c">
              <p>Email</p>
              <h5>
                <span className="text-foreground">
                  <a href="mailto:chari.rightson@gmail.com">
                    chari.rightson@gmail.com
                  </a>
                </span>
              </h5>
            </div>
            <Separator
              orientation="vertical"
              className="hidden md:block h-10"
            />
          </div>
          <div className="flex gap-5">
            <div className="fx-c">
              <p>Phone</p>
              <h5>
                <span className="text-foreground">
                  <a href="tel: 0791568168">0791568168</a>
                </span>
              </h5>
            </div>
            <Separator
              orientation="vertical"
              className="hidden md:block h-10"
            />
          </div>

          <div>
            <p>Payment</p>
            <h5>
              <span className="text-foreground">System</span>
            </h5>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
const Summary = () => {
  return (
    <Card className="w-full h-auto ">
      <CardHeader className="mb:p-4">
        <div className="fb">
          <h4 className="h3 text-foreground">Summary</h4>
          <div className="fc">
            <Button variant="ghost" className="hidden md:flex">
              <GoDotFill className="mr-2 text-indigo" />
              Paid
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="fx-c gap-5 w-full h-auto ">
        <div className="fb w-full">
          <div className="flex gap-5">
            <Image
              src="/imgs/3.png"
              width={200}
              height={200}
              alt="Image"
              className="w-16 object-cover  rounded-lg"
            />
            <div className="fx-c gap-2">
              <p className="p">Black Jeans</p>
              <Badge>Size 32, Black</Badge>
            </div>
          </div>
          <p>
            <span className="text-foreground">Ksh 500</span>
          </p>
        </div>

        <div className="flex gap-5 w-full fb">
          <div className="fx-c gap-2">
            <p className="p">Subtotal</p>
            <p className="p">Total</p>
          </div>
          <div className="fx-c gap-2">
            <p className="p">
              <span className="text-foreground">Ksh 500</span>
            </p>

            <p className="p">
              <span className="text-foreground">Ksh 600</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
const Notes = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="fb">
          <CardTitle>Timeline</CardTitle>
        </div>
        <CardDescription className="pt-5"></CardDescription>
      </CardHeader>
    </Card>
  );
};

export default Order;
