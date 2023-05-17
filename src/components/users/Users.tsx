import User from "../user/User";
import { Props } from "./IProps";

const Users: React.FC<Props> = ({ users, getUsers }) => {
  return (
    <div>
      {users.map((user, index) => (
        <User key={`${index}${user.email}`} {...user} getUsers={getUsers} />
      ))}
    </div>
  );
};

export default Users;
