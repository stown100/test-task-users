import React from "react";
import styles from "./header.module.scss";
import globalStyles from "../../global.module.scss";
import searchIcon from "../../images/search-icon.svg";
import { Props } from "./IProps";

const Header: React.FC<Props> = ({ searchParam, setSearchParam, setPopup }) => {
  const openPopup = () => {
    setPopup(true);
  };
  return (
    <div className={styles.Header}>
      <h1 className={styles.HeaderTitle}>Команда</h1>
      <div className={styles.HeaderBlock}>
        <input
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          className={styles.HeaderInput}
          type="search"
          placeholder="Поиск по Email"
        />
        {!searchParam && (
          <img
            className={styles.HeaderInputImg}
            src={searchIcon}
            alt="search"
          />
        )}
      </div>
      <button
        className={`${styles.HeaderButton} ${globalStyles.Button}`}
        onClick={openPopup}
      >
        Добавить пользователя
      </button>
    </div>
  );
};

export default Header;
