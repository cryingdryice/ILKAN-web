import registeredIlKanStyle from "../../css/components/myPage/registedIlKan.module.css";
import aiIcon from "../../assets/myPage/AI.svg";
export default function RemodelingIlKan() {
  return (
    <div className={registeredIlKanStyle.aiDiv}>
      <img src={aiIcon} alt="ai 리모델링" />
      <div className={registeredIlKanStyle.textDiv}>
        <span>생성형 AI로</span>
        <span>공실 인테리어 보기</span>
      </div>
    </div>
  );
}
