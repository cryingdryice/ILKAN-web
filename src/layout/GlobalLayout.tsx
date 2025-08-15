import { Outlet } from "react-router-dom";
import Sidebar from "../components/globalLayout/SideBar";
import styles from "../css/GlobalLayout.module.css";
import Footer from "../components/Footer";
export default function GlobalLayout() {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.content}>
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
