import { Link } from "react-router-dom";
import applicationIlKanStyle from "../../css/components/applicationIlKan.module.css";
import StateIcon from "../StateIcon";

type Props = {
  title: string;
  address: string;
  startTime: string;
  endTime: string;
};

export default function ApplicationIlKanItem({
  title,
  address,
  startTime,
  endTime,
}: Props) {
  return (
    <div className={applicationIlKanStyle.itemDiv}>
      <div className={applicationIlKanStyle.topDiv}>
        <StateIcon state="신청중" />
      </div>
      <div className={applicationIlKanStyle.bottomDiv}>
        <div className={applicationIlKanStyle.bottomInner}>
          <div className={applicationIlKanStyle.titleDiv}>
            <span>{title}</span>
          </div>
          <div className={applicationIlKanStyle.addressDiv}>
            <span>{address}</span>
          </div>
          <div className={applicationIlKanStyle.startTime}>
            <label>입실</label>
            <span>{startTime}</span>
          </div>
          <div className={applicationIlKanStyle.endTime}>
            <label>퇴실</label>
            <span>{endTime}</span>
          </div>
          <div className={applicationIlKanStyle.confirmApplication}>
            <Link to="#">예약 확인하기</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
