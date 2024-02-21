import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAutoComplete } from "@/utils/hooks/client/useProducts";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

export function Auto_Complete({
  open,
  setOpen,
  query,
  school,
  setQuery,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  school: string;
}) {
  const { data: products, isInitialLoading } = useAutoComplete({
    search: query,
    school,
  });
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setQuery(query);
      setOpen(true);
      setOpen(false);
    }
  };

  return (
    <Dialog onOpenChange={(open) => setOpen(open)} open={open}>
      <DialogContent
        close={false}
        className=" mb:w-[85vw] top-[30%]  rounded-md sm:max-w-[425px] p-0 blr  overflow-hidden "
      >
        <div className="flex flex-col w-full">
          <div className="flex gap-2  flex-col md:flex-row">
            <input
              className="  px-4 bg-transparent rounded-md  w-full outline-none py-2"
              placeholder="Search products"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyDown}
            />
          </div>
          <div className=" ">
            {products ? (
              <div className="">
                <div className="w-full blr  h-[.5px]"></div>
                <span className="fc gap-2 py-2 text-[13px] text-indigo">
                  Suggestions
                </span>
                {products.length > 0 && (
                  <div className="w-full blr  h-[.5px]"></div>
                )}
                <div className="fx-c gap-2 w-full py-1">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      onClick={() => {
                        setQuery(product.name);
                        setOpen(false);
                      }}
                      className={`space-x-1 flex w-full items-center px-4 fb cursor-pointer hover:bg-background }`}
                    >
                      <div className="fc gap-2">
                        {" "}
                        <div className="flex flex-col gap-1">
                          <h6 className="p-size text-gray-800">
                            {product.name}
                          </h6>
                        </div>
                        <ArrowRightIcon className="h-8 -rotate-45 w-5 text-gray-500 " />
                      </div>
                      <Image
                        width={50}
                        height={50}
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-[30px] h-[30px] object-cover rounded-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
