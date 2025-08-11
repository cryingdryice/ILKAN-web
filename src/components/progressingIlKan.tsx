import progressingIlKanStyle from "../css/components/progressingIlKan.module.css";
import checkImg from "../assets/check.png";
import EnvironmentTag from "./EnvironmentTag";

export default function ProgressingIlKan() {
  return (
    <div className={progressingIlKanStyle.container}>
      <div className={progressingIlKanStyle.headerDiv}>
        <span>지금 빌리고 있는 일칸이 있어요!</span>
      </div>
      <div className={progressingIlKanStyle.body}>
        <div className={progressingIlKanStyle.inner}>
          <div className={progressingIlKanStyle.topDiv}>
            <div className={progressingIlKanStyle.leftDiv}>
              <div className={progressingIlKanStyle.img}>공간 사진</div>
              <div className={progressingIlKanStyle.textDiv}>
                <div className={progressingIlKanStyle.titleDiv}>
                  <span>경산시 조영동 사진 스튜디오 일칸</span>
                </div>
                <div className={progressingIlKanStyle.tagDiv}>
                  <div className={progressingIlKanStyle.environmentDiv}>
                    <EnvironmentTag text="포토배경지" />
                    <EnvironmentTag text="조명" />
                    <EnvironmentTag text="삼각대" />
                  </div>
                  <div className={progressingIlKanStyle.itemsDiv}></div>
                </div>
                <div className={progressingIlKanStyle.addressDiv}>
                  하늘시 비구름동 주륵주륵 304호
                </div>
              </div>
            </div>
            <div className={progressingIlKanStyle.rightDiv}>d</div>
          </div>
          <div className={progressingIlKanStyle.contentDiv}>
            <div className={progressingIlKanStyle.progressingBarDiv}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
