"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IOrder } from "@/types";
import { MdDeleteOutline } from "react-icons/md";

export const Payment_Status = ({
  totalAmount,
  setPaidAmount,
  paidAmount,
  submit,
}: {
  totalAmount: number;
  setPaidAmount: React.Dispatch<React.SetStateAction<number>>;
  paidAmount: number;
  edit?: boolean;
  submit?: () => Promise<void>;
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Balance</CardTitle>
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
          <div
            className={`flex w-full col-span-2 ${
              submit ? "fb" : "justify-end"
            }`}
          >
            <Button
              type="button"
              onClick={() => {
                setPaidAmount(totalAmount);
              }}
            >
              Auto Fill
            </Button>
            {submit && (
              <Button
                type="button"
                onClick={() => {
                  submit && submit();
                }}
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export const Other_Payments = ({
  otherPayments,
  setOtherPayments,
  submit,
}: {
  otherPayments: IOrder["otherPayments"];
  setOtherPayments: React.Dispatch<
    React.SetStateAction<IOrder["otherPayments"]>
  >;
  submit?: () => Promise<void>;
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Other Payments </CardTitle>
        <CardDescription>Other Payments (Optional)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="fx-c w-full  gap-4">
          {otherPayments.map((payment, index) => {
            return (
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
                    value={payment.name}
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
                <div className="fx">
                  <div className="flex flex-col space-y-1.5 " key={index}>
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Amount"
                      className="w-full"
                      value={payment.amount}
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
                  <div className="w-full flex justify-end  py-1">
                    <Button
                      onClick={() => {
                        console.log(index);
                        setOtherPayments(
                          otherPayments.filter((_, i) => i !== index)
                        );
                      }}
                      size="icon"
                      className="text-destructive "
                    >
                      <MdDeleteOutline />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}

          <div className={`flex w-full  col-span-2 ${submit ? "fb" : ""}`}>
            <Button
              onClick={() => {
                setOtherPayments([...otherPayments, { name: "", amount: 0 }]);
              }}
            >
              Add
            </Button>
            {submit && (
              <Button
                onClick={() => {
                  submit && submit();
                }}
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
