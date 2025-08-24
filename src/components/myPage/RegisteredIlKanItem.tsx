import registeredIlKanStyle from "../../css/components/myPage/registedIlKan.module.css";
import StateIcon from "../StateIcon";
export default function RegisteredIlKanItem() {
  return (
    <div className={registeredIlKanStyle.itemDiv}>
      <div className={registeredIlKanStyle.itemHeader}>
        <StateIcon state="심사 완료" evaluation={true} />
      </div>
      <div className={registeredIlKanStyle.itemContent}>
        <div className={registeredIlKanStyle.itemTitle}>
          경산시 공유 오피스 회의실, 모던, 화이트톤, 집중이 잘 되는, 방음
        </div>
        <div className={registeredIlKanStyle.itemPrice}>
          일/<span>50,000원</span>
        </div>
      </div>
    </div>
  );
}
