import styles from "./global.module.scss";
import Header from "./components/header/Header";
import Users from "./components/users/Users";
import { useEffect, useState } from "react";
import Popup from "./components/popup/Popup";
import { TUsers } from "./global";
import api from "./utils/api";

const App = () => {
  const [searchParam, setSearchParam] = useState("");
  const [popup, setPopup] = useState(false);
  const [users, setUsers] = useState<TUsers>([]);

  const getUsers = () => {
    api
      .getUsers(searchParam)
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsers();
  }, [searchParam]);

  useEffect(() => {
    // close Popups by ESC
    const closeByEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPopup(false);
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);
  return (
    <>
      {popup && <Popup setPopup={setPopup} getUsers={getUsers} />}
      <div className={styles.Content}>
        <Header
          searchParam={searchParam}
          setSearchParam={setSearchParam}
          setPopup={setPopup}
        />
        <Users users={users} getUsers={getUsers} />
      </div>
    </>
  );
};

export default App;
