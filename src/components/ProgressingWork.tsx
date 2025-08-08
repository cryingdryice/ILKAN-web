import progressingWorkStyle from "../css/components/progressingWork.module.css";

export default function ProgressingWork() {
  return (
    <div className={progressingWorkStyle.container}>
      <div className={progressingWorkStyle.headerDiv}>
        <span>지금 진행중인 의뢰가 2건 있어요!</span>
      </div>
      <div className={progressingWorkStyle.body}>
        <div className={progressingWorkStyle.top}>
          <div className={progressingWorkStyle.checkDiv}></div>
          <div className={progressingWorkStyle.priceDiv}></div>
        </div>
        <div className={progressingWorkStyle.contentDiv}></div>
      </div>
    </div>
  );
}
