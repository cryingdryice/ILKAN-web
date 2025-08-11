import applicationIlKanStyle from "../css/components/applicationIlKan.module.css";

export default function ApplicationIlKan() {
  return (
    <div className={applicationIlKanStyle.container}>
      <div className={applicationIlKanStyle.headerDiv}>
        <span>예약중인 일칸이 2개 있어요!</span>
      </div>
      <div className={applicationIlKanStyle.body}></div>
    </div>
  );
}
