"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
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
import {
  useGetSingleProduct,
  useUpdateProduct,
} from "@/utils/hooks/useProduct";
import { IVariant, IVariantFetched } from "@/types";
import { DashboardLoading } from "@/components/shared/dashboard_loading";
import { IProductEdit, TOption } from "@/types/sellerTypes";
import { X } from "lucide-react";
import { deleteFile, useCustomToast } from "@/components/helpers/functions";
import { Product_Options } from "@/components/seller/product/product_options";
import Link from "next/link";
import Item_not_found from "@/components/shared/item_not_found";
import { Product_Variants_Trial } from "@/components/seller/product/product_variant_trial";
import { fv } from "@/utils/helpers";
const EditProduct = ({
  params,
}: {
  params: {
    product: string;
  };
}) => {
  const { data: product, isLoading } = useGetSingleProduct(params.product);
  const [options, setOptions] = useState<TOption[]>([]);
  useEffect(() => {
    if (product) {
      setOptions(product.options || []);
    }
  }, [product]);

  if (isLoading) return <DashboardLoading />;
  if (product) {
    return (
      <div className="p-4">
        <div className="flex">
          <Link href="/products" className="text-sm fc">
            <FaArrowLeftLong className="mr-2" />
            <span>Back To Products</span>
          </Link>
        </div>
        <div className="py-5 fx-c gap-5">
          <div className="flex gap-5 flex-col md:flex-row w-full">
            <div className="fx-c flex-[2] gap-5">
              <GeneralInfo product={product} />
              {product.longDescription && <Description product={product} />}
              <Options
                product={product}
                options={options}
                setOptions={setOptions}
              />
              {/* <Variants product={product} options={options} /> */}
            </div>
            <div className="fx-c flex-1 gap-5">
              <Tumbnail product={product} />
              <Media product={product} />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Item_not_found
        link="/products"
        btxt="Back To Products"
        ptxt="This product does not exist or has been deleted."
      />
    );
  }
};

const GeneralInfo = ({ product }: IProductEdit) => {
  return (
    <Card className="w-full ">
      <CardHeader className="mb:p-4">
        <div className="fb">
          <h4 className="h3 text-foreground">{product.name}</h4>
          <div className="fc">
            <Button variant="ghost" className="flex">
              <GoDotFill className="mr-2 text-indigo" />
              {product.status}
            </Button>
            <EditGeneralInfo product={product} />
          </div>
        </div>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="fx-c gap-4 w-full ">
        <h4 className="h4">Details</h4>
        <div className="fx-c gap-5 w-full">
          <div className="fb w-full">
            <h5 className="p">Price:</h5>
            <span>
              <span className="text-foreground">ksh</span> {product.price}
            </span>
          </div>
          <div className="fb w-full">
            <h5 className="p">Category:</h5>
            <span>{product.category?.name}</span>
          </div>
          <div className="fb w-full">
            <h5 className="p">Stock:</h5>
            <span>{product.stock}</span>
          </div>
          {product.brand && (
            <div className="fb w-full">
              <h5 className="p">Brand:</h5>
              <span>{product.brand}</span>
            </div>
          )}

          {product.variants && (
            <div className="fb w-full">
              <h5 className="p">Variants:</h5>
              <span>{product.variants.length}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
const Description = ({ product }: IProductEdit) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Long Description</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div
            dangerouslySetInnerHTML={{ __html: product.longDescription! }}
            className="p-size prose"
            style={{ width: "100%" }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};
const Tumbnail = ({ product }: IProductEdit) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="fb">
          <CardTitle>Thumbnail</CardTitle>
          <div className="flex gap-1">
            <EditThumbnail product={product} />
          </div>
        </div>
        <CardDescription className="pt-5">
          <Image
            src={product.thumbnail}
            width={200}
            height={200}
            alt="Image"
            className="w-16 object-cover  rounded-lg"
          />
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
const Media = ({ product }: IProductEdit) => {
  const { mutateAsync } = useUpdateProduct();
  const { customToast, loading } = useCustomToast();
  const deleteMedia = (url: string) => async () => {
    customToast({
      func: async () => {
        await deleteFile(url);
        await mutateAsync({
          _id: product._id,
          media: product.media?.filter((item) => item !== url),
        });
      },
    });
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="fb">
          <CardTitle>Media</CardTitle>
          <div className="flex gap-1">
            <EditMedia product={product} />
          </div>
        </div>
        <CardDescription className="flex flex-wrap pt-5  gap-2">
          {product.media &&
            product.media?.map((item) => (
              <div className="relative" key={item}>
                <div className="absolute top">
                  <Button
                    size={"icon"}
                    variant={"destructive"}
                    className="h-4 w-4"
                    disabled={loading}
                  >
                    <X className="h-3" onClick={deleteMedia(item)} />
                  </Button>
                </div>
                <Image
                  src={item}
                  width={200}
                  height={200}
                  alt="Image"
                  className="w-16 object-cover  rounded-lg"
                />
              </div>
            ))}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
const Options = ({
  product,
  setOptions,
  options,
}: IProductEdit & {
  setOptions: React.Dispatch<React.SetStateAction<TOption[]>>;
  options: TOption[];
}) => {
  const [variants, setVariants] = useState<IVariant[]>(product.variants);
  const { mutateAsync } = useUpdateProduct();
  const { customToast, loading } = useCustomToast();

  const editVariants = async () => {
    let minPrice = Math.min(...fv(variants).map((item) => item.price));
    minPrice = minPrice == 0 ? product.price : minPrice;
    const stock = variants.reduce((acc, curr) => acc + curr.stock, 0);
    customToast({
      func: async () => {
        await mutateAsync({
          _id: product._id,
          variants: variants as IVariantFetched[],
          options,
          price: minPrice,
          stock,
        });
      },
    });
  };

  return (
    <div className="fx-c gap-5 border rounded-lg py-4 w-full">
      <Product_Options
        options={options}
        setOptions={setOptions}
        productType={product.productType}
        edit={true}
      />
      <Product_Variants_Trial
        options={options}
        variants={variants}
        setVariants={setVariants}
        productType={product.productType}
        initialVariants={product.variants}
        edit={true}
      />
      <div className="w-full p-4 flex justify-end">
        <Button onClick={editVariants} disabled={loading}>
          <MdEdit className="mr-2" />
          Save Variants
        </Button>
      </div>
    </div>
  );
};

export default EditProduct;
