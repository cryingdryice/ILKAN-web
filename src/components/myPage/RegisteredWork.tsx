import registeredWorkStyle from "../../css/components/myPage/registeredWork.module.css";
import StateIcon from "../StateIcon";

export default function RegisteredWork() {
  return (
    <div className={registeredWorkStyle.container}>
      <div className={registeredWorkStyle.headerDiv}>
        <StateIcon state="신청중" evaluation={false} />
        <span className={registeredWorkStyle.headerTitle}>
          지원을 받고 있는 의뢰가 있어요
        </span>
      </div>
      <div className={registeredWorkStyle.body}></div>
    </div>
  );
}
