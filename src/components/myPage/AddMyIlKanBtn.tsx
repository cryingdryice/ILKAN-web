import registeredIlKanStyle from "../../css/components/myPage/registedIlKan.module.css";
import addIcon from "../../assets/myPage/addIlKan.svg";
export default function AddMyIlKanBtn() {
  return (
    <div className={registeredIlKanStyle.addDiv}>
      <img src={addIcon} alt="일칸 추가" />
      <span>나의 공실 추가하기</span>
    </div>
  );
}
