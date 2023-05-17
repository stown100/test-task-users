import { MouseEvent, useState } from "react";
import styles from "./user.module.scss";
import dotsImg from "../../images/dots.svg";
import dafaultAvatar from "../../images/default-avatar.svg";
import api from "../../utils/api";
import { Props } from "./IProps";

const User = (user: Props) => {
  const { name, image, email, permissions, id, getUsers } = user;
  const [popup, setPopup] = useState(false);

  const openPopup = () => {
    setPopup(!popup);
  };
  const closePopup = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      setPopup(false);
    }
  };

  const handleDeleteUser = (userId: string) => {
    api
      .deleteUser(userId)
      .then((res) => getUsers())
      .catch((err) => console.log(err));
  };

  return (
    <>
      {popup && <div className={styles.Popup} onClick={closePopup}></div>}
      <div className={styles.User} onClick={closePopup}>
        <div className={styles.UserInfo}>
          <img
            className={
              image ? styles.UserInfoAvatar : styles.UserInfoDefaultAvatar
            }
            src={image ? image : dafaultAvatar}
            alt="avatar"
          />
          <div className={styles.UserInfoContent}>
            <div className={styles.UserInfoContacts}>
              <h3 className={styles.UserInfoName}>
                {name ? name : "Пользователь"}
              </h3>
              <span className={styles.UserInfoEmail}>{email}</span>
            </div>
            <div className={styles.UserInfoPermissions}>
              {permissions?.map((permission) => (
                <div
                  key={permission.id}
                  className={`${styles.UserInfoPermission} ${
                    permission.permission === "Администратор" &&
                    styles.UserInfoPermissionAdmin
                  }`}
                >
                  {permission.permission}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.UserPopupAndBtn}>
          <button className={styles.UserBtn} onClick={openPopup}>
            <img src={dotsImg} alt="dots" />
          </button>
          {popup && (
            <div className={styles.UserPopup}>
              <span>Изменить права доступа</span>
              <span>Отправить код повторно</span>
              <span onClick={() => handleDeleteUser(id)}>Удалить</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default User;
