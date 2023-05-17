export interface Props {
  name: string;
  email: string;
  permissions: { permission: string; id: string }[];
  image: string;
  id: string;
  getUsers: () => void;
}
