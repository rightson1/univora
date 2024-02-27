import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoSearch } from "react-icons/io5";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSellerAuth } from "@/utils/sellerAuth";
import { useGetProducts } from "@/utils/hooks/useProduct";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { vArr } from "@/app/api/utils/funcs";

export function PageSearch() {
  const { seller } = useSellerAuth();
  const { data: products } = useGetProducts(seller?._id);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <Dialog onOpenChange={(open) => setOpen(open)} open={open}>
      <DialogTrigger asChild>
        <button className="flex bg-transparent fc p-4 ">
          <IoSearch className=" text-2xl text-border mx-2" />
          <input
            placeholder="Ctrl K, Search.."
            className="w-full bg-transparent outline-none"
          />
        </button>
      </DialogTrigger>
      <DialogContent
        close={false}
        className="mb:w-[85vw] rounded-md sm:max-w-[425px] p-0 "
      >
        <Command className="bg-card border-none ">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Pages">
              {pages.map((page) => (
                <CommandItem
                  onSelect={(value) => {
                    const link = pages.find(
                      (p) => p.name.toLocaleLowerCase() === value
                    )?.href;
                    router.push(link!);
                  }}
                  key={page.name}
                >
                  {page.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              {vArr(products) &&
                products.map((product) => (
                  <CommandItem
                    onSelect={(value) => {
                      const link = products.find(
                        (p) => p.name.toLocaleLowerCase() === value
                      )?._id;
                      router.push(`/products/${link}`);
                    }}
                    key={product.name}
                    value={product.name}
                  >
                    {product.name}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
const pages = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Orders",
    href: "/orders",
  },
  {
    name: "Products",

    href: "/products",
  },
  {
    name: "Settings",
    href: "/settings",
  },
];
