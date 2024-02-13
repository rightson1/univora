"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCustomToast } from "@/components/helpers/functions";
import { useSellerAuth } from "@/utils/sellerAuth";
import { useCreateOrder } from "@/utils/hooks/useOrder";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { useGetProducts } from "@/utils/hooks/useProduct";
import { IOrder, IProductFetched, IVariant } from "@/types";
import toast from "react-hot-toast";
const Create_Custom_Order = () => {
  const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(null);
  const { seller } = useSellerAuth();

  const [selectedProduct, setSelectedProduct] =
    useState<IProductFetched | null>(null);
  const [otherPayments, setOtherPayments] = useState([
    {
      name: "",
      amount: 0,
    },
  ]);

  const [totalAmount, setTotalAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  useEffect(() => {
    let total = selectedProduct?.price || 0;
    if (selectedVariant?.price) {
      total = selectedVariant.price;
    }
    total *= quantity;
    otherPayments.forEach((payment) => {
      total += payment.amount;
    });
    setTotalAmount(total);
  }, [selectedProduct, selectedVariant, otherPayments]);

  const { mutateAsync } = useCreateOrder();
  const { customToast, loading } = useCustomToast();
  const [quantity, setQuantity] = useState(1);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedProduct?.stock && quantity > selectedProduct?.stock) {
      return toast.error(`${selectedProduct.name} are out of stock.`);
    }
    const formData = new FormData(e.currentTarget);
    const customerName = formData.get("customerName") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;
    const product = selectedProduct?._id!;
    const variant = selectedVariant || undefined;
    const paidAmount = parseInt(formData.get("paidAmount") as string);
    const orderData: IOrder = {
      customerName,
      customerPhone: phone,
      message,
      product,
      variant,
      paidAmount,
      otherPayments: otherPayments.filter(
        (payment) => payment.amount !== 0 && payment.name !== ""
      ),
      seller: seller._id,
      school: seller.school._id,
      quantity,
      totalAmount,
      productPrice: selectedProduct?.price || 0,
    };
    customToast({
      func: async () => {
        await mutateAsync(orderData);
      },
    });
  };

  return (
    <form
      className="grid grid-cols-1  w-full  gap-4 p-4"
      onSubmit={handleSubmit}
    >
      <div className="fb">
        <h2 className="h3">Custom Order</h2>
        <Button size={"sm"} type="submit" disabled={loading}>
          {loading ? "Publishing..." : "Publish"}
        </Button>
      </div>

      <GeneralInformation />
      <Product
        {...{
          selectedVariant,
          setSelectedVariant,
          selectedProduct,
          setSelectedProduct,
          setQuantity,
          quantity,
        }}
      />
      <Other_Payments {...{ otherPayments, setOtherPayments }} />
      <Payment_Status {...{ totalAmount, setPaidAmount, paidAmount }} />
    </form>
  );
};
const GeneralInformation = () => {
  const [generalInfo, setGeneralInfo] = useState({
    customerName: "",
    phone: "",
    message: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGeneralInfo({ ...generalInfo, [e.target.name]: e.target.value });
  };
  const { seller } = useSellerAuth();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>General Information*</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full  gap-4">
          <div className="flex flex-col space-y-1.5 ">
            <Label htmlFor="name">Name*</Label>
            <Input
              required
              name="customerName"
              placeholder="Customer Name"
              className="w-full"
              onChange={handleChange}
              value={generalInfo.customerName}
            />
          </div>
          <div className="flex flex-col space-y-1.5 ">
            <Label htmlFor="phone">Phone</Label>
            <Input
              name="phone"
              placeholder="Customer Phone"
              onChange={handleChange}
              className="w-full"
              value={generalInfo.phone}
            />
          </div>

          <div className="flex flex-col space-y-1.5 md:col-span-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              name="message"
              placeholder="Order Message "
              value={generalInfo.message}
            />
          </div>
          <div className="flex w-full justify-end col-span-2">
            <Button
              type="button"
              onClick={() => {
                setGeneralInfo({
                  customerName: "Custom Order Customer",
                  phone: seller.phone,
                  message:
                    "This is a custom order. Please confirm the order before delivery.",
                });
              }}
            >
              Auto Fill Customer Information
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
const Product = ({
  selectedVariant,
  setSelectedVariant,
  selectedProduct,
  setSelectedProduct,
  setQuantity,
  quantity,
}: {
  selectedVariant: IVariant | null;
  setSelectedVariant: React.Dispatch<React.SetStateAction<IVariant | null>>;
  selectedProduct: IProductFetched | null;
  setSelectedProduct: React.Dispatch<
    React.SetStateAction<IProductFetched | null>
  >;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  quantity: number;
}) => {
  const { seller } = useSellerAuth();
  const { data: products, isLoading } = useGetProducts(seller._id);
  console.log(selectedProduct);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Product* </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full  gap-4">
          <div className="flex flex-col space-y-1.5 ">
            <Label htmlFor="name">Name</Label>
            <Select
              name="product"
              required
              onValueChange={(value) => {
                setSelectedProduct(
                  products?.find((product) => product._id === value) || null
                );
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a product/service" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    {isLoading ? "Loading..." : "Select a product/service"}
                  </SelectLabel>

                  {products?.map((product) => (
                    <SelectItem key={product._id} value={product._id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {selectedProduct &&
            (!selectedVariant ||
              !(selectedProduct.productType == "service")) && (
              <div className="flex flex-col space-y-1.5 ">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  name="quantity"
                  placeholder="Customer Quantity"
                  className="w-full"
                  type="number"
                  required
                  value={quantity}
                  onChange={(e) => {
                    let stock = selectedProduct?.stock || 1;

                    if (parseInt(e.target.value) > stock) {
                      toast.error(
                        `There are only ${stock} ${selectedProduct.name} in stock.`
                      );
                      setQuantity(stock);
                    } else {
                      setQuantity(parseInt(e.target.value));
                    }
                  }}
                />
              </div>
            )}
          {!selectedVariant ||
            (!selectedVariant.price && (
              <div className="flex flex-col space-y-1.5 ">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  placeholder="Customer Price"
                  readOnly
                  value={selectedProduct?.price || ""}
                  className="w-full"
                />
              </div>
            ))}
          {selectedProduct?.variants &&
            selectedProduct.variants?.length > 0 && (
              <div className="flex flex-col space-y-1.5 ">
                <Label htmlFor="variant">Variant</Label>
                <Select
                  name="variant"
                  required
                  onValueChange={(value) => {
                    setSelectedVariant(
                      selectedProduct.variants?.find(
                        (variant) => variant.options === value
                      ) || null
                    );
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a variant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Variants</SelectLabel>

                      {selectedProduct.variants?.map((product) => (
                        <SelectItem
                          key={product.options}
                          value={product.options}
                        >
                          {product.options}-{product.price}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
};
const Other_Payments = ({
  otherPayments,
  setOtherPayments,
}: {
  otherPayments: IOrder["otherPayments"];
  setOtherPayments: React.Dispatch<
    React.SetStateAction<IOrder["otherPayments"]>
  >;
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Other Payments </CardTitle>
        <CardDescription>Other Payments (Optional)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="fx-c w-full  gap-4">
          {otherPayments.map((payment, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 w-full  gap-4"
            >
              <div className="flex flex-col space-y-1.5 ">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="e.g delivery fee"
                  className="w-full"
                  onChange={
                    (e) => {
                      setOtherPayments(
                        otherPayments.map((p, i) =>
                          i === index ? { ...p, name: e.target.value } : p
                        )
                      );
                    }
                    // setOtherPayments([...otherPayments, { name: e.target.value }]);
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5 " key={index}>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Amount"
                  className="w-full"
                  onChange={(e) => {
                    setOtherPayments(
                      otherPayments.map((p, i) =>
                        i === index
                          ? { ...p, amount: parseInt(e.target.value) }
                          : p
                      )
                    );
                  }}
                />
              </div>
            </div>
          ))}
          <Button
            onClick={() => {
              setOtherPayments([...otherPayments, { name: "", amount: 0 }]);
            }}
          >
            Add Other Payment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
const Payment_Status = ({
  totalAmount,
  setPaidAmount,
  paidAmount,
}: {
  totalAmount: number;
  setPaidAmount: React.Dispatch<React.SetStateAction<number>>;
  paidAmount: number;
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Order Status</CardTitle>
        <CardDescription>
          The Order Total Amount is {totalAmount}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="fx-c w-full  gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full  gap-4">
            <div className="flex flex-col space-y-1.5 ">
              <Label htmlFor="paidAmount">Paid Amount</Label>
              <Input
                id="paidAmount"
                placeholder="Paid Amount "
                className="w-full"
                type="number"
                name="paidAmount"
                required
                value={paidAmount}
                onChange={(e) => setPaidAmount(parseInt(e.target.value))}
              />
            </div>
            <div className="flex flex-col space-y-1.5 ">
              <Label htmlFor="balance">Balance</Label>
              <Input
                id="balance"
                placeholder="Customer Balance"
                className="w-full"
                readOnly
                value={(totalAmount - paidAmount).toString()}
              />
            </div>
          </div>
          <div className="flex w-full justify-end col-span-2">
            <Button
              type="button"
              onClick={() => {
                setPaidAmount(totalAmount);
              }}
            >
              Auto Fill
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default Create_Custom_Order;
