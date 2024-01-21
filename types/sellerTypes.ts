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
export type TBusiness = {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  status: "approved" | "pending" | "banned";
  visibility: "public" | "private";
  actions: string;
};
export interface IOrderTable {
  id: string;
  customer: string;
  date: string;
  fulfillment: "fulfilled" | "unfulfilled" | "partial";
  payment: "paid" | "unpaid" | "partial";
  total: string;
}
