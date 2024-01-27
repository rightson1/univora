import toast from "react-hot-toast";

export const customToast = ({
  func,
  sfunc,
  loading,
  suc,
  err,
  efunc,
}: {
  func: () => Promise<any>;
  sfunc?: () => void;
  loading?: string;
  suc?: string;
  err?: string;
  efunc?: () => void | (() => Promise<any>);
}) => {
  return toast.promise(
    func()
      .then((res) => {
        const data = res.data;
        if (!data.success) {
          throw new Error(data.message);
        }
        if (sfunc) sfunc();
      })
      .catch((e) => {
        console.log(e);
        if (efunc) efunc();
        throw e;
      }),

    {
      loading: loading || "Loading...",
      success: suc || "Success",
      error: (e) => {
        setTimeout(() => {
          toast.dismiss();
        }, 3000);
        return e.message || err || "An error occurred";
      },
    },
    {
      duration: 3000,
    }
  );
};
