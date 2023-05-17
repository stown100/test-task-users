export type TUsers = {
  name: string;
  email: string;
  permissions: { permission: string; id: string }[];
  image: string;
  id: string;
}[];

export type TUser = {
  name: string;
  email: string;
  permissions: { permission: string; id: string }[];
  image: string;
  id: string;
};
