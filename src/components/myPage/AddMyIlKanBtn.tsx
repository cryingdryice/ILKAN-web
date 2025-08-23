import registeredIlKanStyle from "../../css/components/myPage/registedIlKan.module.css";
import addIcon from "../../assets/myPage/addIlKan.svg";
import { Link } from "react-router-dom";
export default function AddMyIlKanBtn() {
  return (
    <Link
      to="/main/kanPost"
      className={registeredIlKanStyle.addDiv}
      aria-label="나의 공실 추가하기"
    >
      <img src={addIcon} alt="" aria-hidden="true" />
      <span>나의 공실 추가하기</span>
    </Link>
  );
}
