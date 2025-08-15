import applicationWorkStyle from "../../css/components/applicationWork.module.css";
import ApplicationWorkItem from "./ApplicationWorkItem";
import StateIcon from "../StateIcon";

export default function ApplicationWork() {
  return (
    <div className={applicationWorkStyle.container}>
      <div className={applicationWorkStyle.headerDiv}>
        <span>지원중인 의뢰가 4건 있어요! 수락되면 바로 알림보내드릴게요</span>
      </div>
      <div className={applicationWorkStyle.body}>
        <ApplicationWorkItem
          title="요아정 배달 업체 등록 사진 촬영 외주"
          price="500,000"
        />
        <ApplicationWorkItem
          title="요아정 배달 업체 등록 사진 촬영 외주"
          price="500,000"
        />
        <ApplicationWorkItem
          title="요아정 배달 업체 등록 사진 촬영 외주"
          price="500,000"
        />
        <ApplicationWorkItem
          title="요아정 배달 업체 등록 사진 촬영 외주"
          price="500,000"
        />
      </div>
    </div>
  );
}
