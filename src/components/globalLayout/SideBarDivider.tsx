import styles from "../../css/components/globalLayout/SideBarDivider.module.css";

export default function SidebarDivider() {
  return (
    <div className={styles.divider}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 2" fill="none">
        <path d="M0 1H200" />
      </svg>
    </div>
  );
}
