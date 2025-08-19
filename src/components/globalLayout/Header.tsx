import AlarmLogo from "../../assets/Alarm-Logo.svg";
import ProfileLogo from "../../assets/Profile-Logo.svg";
import styles from "../../css/components/globalLayout/Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logoBox}>
        <img src={AlarmLogo} className={styles.logo} />
        <img src={ProfileLogo} className={styles.logo} />
      </div>
    </div>
  );
}
