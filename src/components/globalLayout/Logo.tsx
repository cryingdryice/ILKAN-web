// Logo.tsx
import ILKAN from "../../assets/IL-KAN.png";
import Styles from "../../css/components/globalLayout/Logo.module.css";

export default function Logo() {
  return <img src={ILKAN} alt="Logo" className={Styles.logo} />;
}
