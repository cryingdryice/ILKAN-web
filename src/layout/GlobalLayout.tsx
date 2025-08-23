// src/pages/main/globalLayout/GlobalLayout.tsx
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/globalLayout/SideBar";
import styles from "../css/GlobalLayout.module.css";
import Footer from "../components/globalLayout/Footer";
import AlarmLogo from "../assets/Alarm-Logo.svg";
import ProfileLogo from "../assets/Profile-Logo.svg";
import { useLocalStorage } from "../store/store";
import logoutImg from "../assets/logout.svg";
import { useStore } from "../store/store";

export default function GlobalLayout() {
  const navigate = useNavigate();
  const logout = useStore((state) => state.logout);
  const handleLogOut = () => {
    logout();
    navigate("/login", { replace: true });
  };
  // useLocalStorage();
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.icon}>
        <div className={styles.logoBox}>
          <img src={logoutImg} className={styles.logo} />
          <div className={styles.logout} onClick={handleLogOut}>
            로그아웃
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
