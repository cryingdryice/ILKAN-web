import AlarmLogo from "../../assets/Alarm-Logo.svg";
import ProfileLogo from "../../assets/Profile-Logo.svg";
import styles from "../../css/components/globalLayout/Header.module.css";
import logout from "../../assets/logout.svg";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logoBox}>
        <img src={logout} className={styles.logo} />
      </div>
    </div>
  );
}
