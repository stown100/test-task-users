import React, { ChangeEvent, MouseEvent, useState } from "react";
import styles from "./popup.module.scss";
import globalStyles from "../../global.module.scss";
import { Props } from "./IProps";
import api from "../../utils/api";
import closeImg from "../../images/close.svg";
import bottonArrowImg from "../../images/arrow-bottom.svg";
import emptyImg from "../../images/empty.svg";
import filledImg from "../../images/filled.svg";

interface Permission {
  permission: string;
  id: string;
}

const allPermissions: Permission[] = [
  { permission: "Все", id: "1" },
  { permission: "Модерация объявлений", id: "2" },
  { permission: "Блог", id: "3" },
  { permission: "Тех. поддержка", id: "4" },
  { permission: "Обращение клиентов", id: "5" },
  { permission: "Аналитика", id: "6" },
  { permission: "Акции", id: "7" },
];

const Popup: React.FC<Props> = ({ setPopup, getUsers }) => {
  const [email, setEmail] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [displayPermissions, setDisplayPermissions] = useState(false);

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const handlePermissionClick = (permission: Permission) => {
    setPermissions((prev) => [...prev, permission]);
    if (selectedPermissions.includes(permission.id)) {
      setSelectedPermissions(
        selectedPermissions.filter((id) => id !== permission.id)
      );
    } else {
      setSelectedPermissions([...selectedPermissions, permission.id]);
    }
  };

  const closeByOverlay = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      setPopup(false);
    }
  };

  const onClickByPopup = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      setDisplayPermissions(false);
    }
  };
  const closePopup = () => {
    setPopup(false);
  };

  const hanldeChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleAddPermition = (
    e: MouseEvent,
    email: string,
    permissions: Permission[]
  ) => {
    e.preventDefault();
    api
      .addUser(email, permissions)
      .then((res) => {
        setPopup(false);
        getUsers();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.Popup} onClick={closeByOverlay}>
      <form className={styles.PopupForm} onClick={onClickByPopup}>
        <img
          className={styles.PopupFormClose}
          src={closeImg}
          alt="close"
          onClick={closePopup}
        />
        <h2 className={styles.PopupFormTitle}>Отправьте приглашение</h2>
        <input
          className={styles.PopupFormInput}
          placeholder="Email"
          value={email}
          onChange={hanldeChangeInput}
        />
        <div className={styles.PopupFormSelect}>
          <input
            defaultValue={permissions
              .map((permission) => permission.permission)
              .join(", ")}
            onClick={() => setDisplayPermissions(!displayPermissions)}
            className={styles.PopupFormInput}
            placeholder="Выберите права доступа"
          ></input>
          <img
            onClick={() => setDisplayPermissions(!displayPermissions)}
            className={styles.PopupFormSelectImg}
            src={bottonArrowImg}
            alt="arrow"
          />
          {displayPermissions && (
            <div className={styles.PopupFormSelectPermissions}>
              {allPermissions.map((item) => (
                <div
                  className={styles.PopupFormSelectPermissionsPermission}
                  key={item.id}
                >
                  <img
                    className={styles.PopupFormSelectPermissionsPermissionImg}
                    src={
                      selectedPermissions.includes(item.id)
                        ? filledImg
                        : emptyImg
                    }
                    alt="img"
                    onClick={() => handlePermissionClick(item)}
                  />
                  <span
                    className={styles.PopupFormSelectPermissionsPermissionSpan}
                  >
                    {item.permission}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className={`${globalStyles.Button} ${styles.PopupFormButton}`}
          onClick={(e) => handleAddPermition(e, email, permissions)}
        >
          Отправить приглашение
        </button>
      </form>
    </div>
  );
};

export default Popup;
