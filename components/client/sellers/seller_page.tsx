"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IProductFetched, ISellerFetched } from "@/types";
import { platformIcons } from "@/utils/data";
import { useGetProductsBySeller } from "@/utils/hooks/client/useProducts";
import { useGetSeller } from "@/utils/hooks/client/useSellers";
import { Mail, Phone, Search } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { Product_Card } from "../products_card";
import { vArr } from "@/app/api/utils/funcs";
import { T_Input } from "../search/trasparent_input";
import Fuse from "fuse.js";

export const Seller_Comp = ({
  seller_raw,
  products: products_raw,
}: {
  seller_raw: ISellerFetched;
  products: IProductFetched[];
}) => {
  const { data: seller } = useGetSeller(seller_raw.slug, seller_raw);

  const { data: products_fetched } = useGetProductsBySeller(
    seller_raw.slug,
    products_raw
  );
  const [search, setSearch] = React.useState("");
  const [products, setProducts] = React.useState(products_fetched);
  useEffect(() => {
    setProducts(products_fetched);
  }, [products_fetched]);
  React.useEffect(() => {
    if (search && search.length > 0) {
      const includesFiltered = products.filter((school) =>
        school.name.toLowerCase().includes(search.toLowerCase())
      );
      const remainingProducts = products.filter(
        (school) => !includesFiltered.includes(school)
      );
      const fuse = new Fuse(remainingProducts, {
        keys: ["name"],
        threshold: 0.6,
      });
      const fuseFiltered = fuse.search(search).map((res) => res.item);
      setProducts([...includesFiltered, ...fuseFiltered]);
    } else {
      setProducts(products_fetched);
    }
  }, [search, products_fetched]);

  return (
    <div className="w-full md:px-[50px] ">
      <DesktopHero seller={seller} />
      <MobileHero seller={seller} />

      <section className="py-10  p-4 fx-c gap-5 ">
        <Separator className="w-full" />
        <h4 className="h4">
          {`
          ${seller?.name}'s Products  
          `}
          <span className="text-indigo-500">({products?.length})</span>
        </h4>
        <div className="fc  px-4 product-card rounded-md p-2 w-full ">
          <Search className="text-xl text-indigo-300" />
          <T_Input
            handleChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
            sx="bg-transparent w-full p-1"
          />
        </div>
        <div className="  grid  pb-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {vArr(products) ? (
            products?.map((product, index: number) => {
              return (
                <Product_Card
                  key={index}
                  id={product._id}
                  slug={product.slug}
                  price={product.price}
                  description={product.description}
                  image={product.thumbnail}
                  title={product.name}
                  imageStyles="w-full h-[150px] sm:h-[200px] object-cover  rounded-[5px]"
                  descriptionStyles="p-size"
                  imageSizes={{ width: 300, height: 300 }}
                  button={false}
                  variants={product.variants}
                />
              );
            })
          ) : (
            <div className="w-full  py-10 flex justify-center col-span-4">
              <span className="p-size">
                Seller has no products yet. Check back later
              </span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
const Socials = ({
  seller,
  styles,
}: {
  seller: ISellerFetched;
  styles?: string;
}) => {
  return (
    <div className={styles}>
      {seller?.socials
        .filter((s) => {
          return true;
        })
        .map((s) => {
          const platform = platformIcons.find(
            (icon) => icon.title === s.platform
          );
          const platformIcon = platformIcons.find(
            (icon) => icon.title === s.platform
          );
          return (
            <a
              key={s.platform}
              href={`${platform!.link}/${s.link}`}
              className="flex items-center justify-center gap-1"
            >
              {/* showcase icon */}
              {platformIcon && <platformIcon.icon className="w-4 h-4" />}
            </a>
          );
        })}
    </div>
  );
};
const Seller = ({ seller }: { seller: ISellerFetched }) => {
  return (
    <>
      <div className="h3 text-indigo">{seller?.name} </div>

      <p className="p">{seller?.description}</p>

      <Separator className=" w-full" />
      <div className="fb w-full p">
        <a
          href={`tel:${seller?.phone}`}
          className="flex flex-col items-center justify-center gap-1"
        >
          <Phone className="" />
          <span className="ml-2">Call</span>
        </a>
        <a
          href={toWhatsApp(seller)}
          className="flex flex-col items-center justify-center gap-1"
        >
          <Phone className="" />
          <span className="ml-2 p">Whatsapp</span>
        </a>
        {/* mail*/}
        <a
          href={`mailto:${seller?.email}?subject=Hello ${seller?.name}!`}
          className="flex flex-col items-center justify-center gap-1"
        >
          <Mail className="" />
          <span className="ml-2 ">Email</span>
        </a>
        {/* whatsap */}
      </div>
    </>
  );
};
const toWhatsApp = (seller: ISellerFetched) => {
  return `https://wa.me/${
    //if the phone number starts with 0, replace it with 254
    seller.socials
      .find((s) => s.platform === "whatsapp")
      ?.link.replace(/^0/, "254") || seller?.phone.replace(/^0/, "254")
  }`;
};
const DesktopHero = ({ seller }: { seller: ISellerFetched }) => {
  return (
    <div className="md:px-20 pt-[20px]  hidden md:flex">
      <div className="w-full rounded-full   relative  fx-c gap-5">
        <Image
          src={seller?.profileImage || "/non.jpg"}
          alt={seller?.name}
          height={1000}
          width={1000}
          className="h-[300px] w-full object-cover rounded-md 
            hidden md:flex
            "
        />

        <div className="blr flex flex-col gap-3 absolute -top-10 md:right-10 w-full max-w-[400px] rounded-md p-8">
          <Seller seller={seller} />
        </div>
        <Socials
          seller={seller}
          styles="gap-4 p w-full  flex my-3 hidden md:flex"
        />
      </div>
    </div>
  );
};

const MobileHero = ({ seller }: { seller: ISellerFetched }) => {
  return (
    <div className="flex-col-start w-full p md:hidden">
      <Image
        src={seller?.coverImage || "/non.jpg"}
        className="w-full h-[250px] object-cover"
        width={1000}
        height={1000}
        alt="Hello"
      />
      <div className="flex-col-start w-full p-4 gap-3">
        <div className="flex-between w-full">
          <Image
            src={seller?.profileImage || "/non.jpg"}
            className="w-[70px] h-[70px]  object-cover -mt-10 rounded-full"
            width={500}
            height={500}
            alt="Hello"
          />
          <Link href={toWhatsApp(seller)}>
            <Button className="rounded-full">Whatsap</Button>
          </Link>
        </div>
        <div className="flex-col-start">
          <h3 className="h3-size">{seller.name}</h3>
          <span className="text-sm  font-semibold opacity-70">
            {seller.name}
          </span>
        </div>
        <p className="p">{seller?.description}</p>
      </div>
    </div>
  );
};
