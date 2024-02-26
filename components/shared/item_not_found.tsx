import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

const Item_not_found = ({
  link,
  btxt,
  ptxt,
}: {
  link: string;
  btxt: string;
  ptxt: string;
}) => {
  return (
    <div className="p-4 flex items-center justify-center flex-col main-h ">
      <Button>
        <Link href={link} className="text-sm fc ">
          <FaArrowLeftLong className="mr-2" />
          <span>{btxt}</span>
        </Link>
      </Button>
      <p className="text-destructive">{ptxt}</p>
    </div>
  );
};

export default Item_not_found;
