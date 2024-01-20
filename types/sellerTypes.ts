export type IProductTable = {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
  status: "published" | "unpublish" | "draft";
  inventory: string;
  actions: string;
};
export type TOption = {
  title: string;
  variations: { id: string; text: string }[];
};
