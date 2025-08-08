import { Outlet } from "react-router-dom";
import styles from "../css/GlobalLayout.module.css";
import ILKAN from "../assets/IL-KAN.png";

export default function GlobalLayout() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <img src={ILKAN} alt="IL-KAN 로고" className={styles.logo} />
        <div className={styles.MYPAGE}>
          <button className={styles.Btn}></button>
          <div className={styles.Font}>MY PAGE</div>
        </div>

        <div className={styles.Line}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="2"
            viewBox="0 0 200 2"
            fill="none"
          >
            <path d="M0 1H200" stroke="#D9D9D9" />
          </svg>
        </div>
      </div>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
