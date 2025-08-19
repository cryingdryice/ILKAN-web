// Logo.tsx
import { Link } from "react-router-dom";
import ILKAN from "../../assets/IL-KAN.png";
import Styles from "../../css/components/globalLayout/Logo.module.css";

export default function Logo() {
  return (
    <Link to="/main/myPage">
      <img src={ILKAN} alt="Logo" className={Styles.logo} />
    </Link>
  );
}
