import registeredIlKanStyle from "../../css/components/myPage/registedIlKan.module.css";
import StateIcon from "../StateIcon";

type Props = {
  role: string | null;
};
export default function RegisterdIlKan({ role }: Props) {
  const storedName = localStorage.getItem("name");
  return (
    <div className={registeredIlKanStyle.container}>
      <div className={registeredIlKanStyle.header}>
        <span>{storedName}님이 등록하신 건물이에요!</span>
      </div>
      <div className={registeredIlKanStyle.body}>
        <div className={registeredIlKanStyle.itemDiv}>
          <div className={registeredIlKanStyle.itemHeader}>
            <StateIcon state="진행중" evaluation={false} />
            <StateIcon state="신청중" evaluation={false} />
            <StateIcon state="심사중" evaluation={true} />
            <StateIcon state="심사 완료" evaluation={true} />
            <StateIcon state="심사 신청" evaluation={true} />
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
      </div>
    </div>
  );
}
