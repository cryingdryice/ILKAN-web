import progressingWorkStyle from "../css/components/progressingWork.module.css";
import StateIcon from "./StateIcon";

export default function ProgressingWork() {
  return (
    <div className={progressingWorkStyle.container}>
      <div className={progressingWorkStyle.headerDiv}>
        <span>지금 진행중인 의뢰가 2건 있어요!</span>
      </div>
      <div className={progressingWorkStyle.body}>
        <div className={progressingWorkStyle.inner}>
          <div className={progressingWorkStyle.topDiv}>
            <div className={progressingWorkStyle.checkAndTitleDiv}>
              <StateIcon state="진행중" />
              <div className={progressingWorkStyle.titleDiv}>
                <span>화장품 텍스쳐 상세 정보란 사진 외주 </span>
              </div>
            </div>
            <div className={progressingWorkStyle.priceDiv}>
              <span>500,000원</span>
            </div>
          </div>
          <div className={progressingWorkStyle.contentDiv}>
            <div className={progressingWorkStyle.progressingBarDiv}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
