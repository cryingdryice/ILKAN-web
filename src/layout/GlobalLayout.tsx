// src/pages/main/globalLayout/GlobalLayout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/globalLayout/SideBar";
import styles from "../css/GlobalLayout.module.css";
import Footer from "../components/globalLayout/Footer";
import AlarmLogo from "../assets/Alarm-Logo.svg";
import ProfileLogo from "../assets/Profile-Logo.svg";
import { useLocalStorage } from "../store/store";

export default function GlobalLayout() {
  // useLocalStorage();
  return (
    // wrapper를 없애고 Sidebar, Header를 직접 렌더링
    // 이 방식은 fixed된 컴포넌트들을 명확하게 분리하고, content가 독립적으로 위치하게 함
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.icon}>
        <div className={styles.logoBox}>
          <img src={AlarmLogo} className={styles.logo} />
          {/* -> 빨간색 상태표시 이미지는 아직 넣지 않았습니다. */}
          <img src={ProfileLogo} className={styles.logo} />
        </div>
      </div>

      <div className={styles.content}>
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
