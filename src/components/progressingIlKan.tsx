import progressingIlKanStyle from "../css/components/progressingIlKan.module.css";
import checkImg from "../assets/check.png";

export default function ProgressingIlKan() {
  return (
    <div className={progressingIlKanStyle.container}>
      <div className={progressingIlKanStyle.headerDiv}>
        <span>지금 빌리고 있는 일칸이 있어요!</span>
      </div>
      <div className={progressingIlKanStyle.body}>
        <div className={progressingIlKanStyle.inner}></div>
      </div>
    </div>
  );
}
