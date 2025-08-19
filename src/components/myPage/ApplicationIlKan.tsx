import applicationIlKanStyle from "../../css/components/myPage/applicationIlKan.module.css";
import ApplicationIlKanItem from "./ApplicationIlKanItem";

type Props = {
  role: string | null;
};

export default function ApplicationIlKan({ role }: Props) {
  return (
    <div className={applicationIlKanStyle.container}>
      <div className={applicationIlKanStyle.headerDiv}>
        <span>예약중인 일칸이 2개 있어요!</span>
      </div>
      <div className={applicationIlKanStyle.body}>
        <ApplicationIlKanItem
          title="대구 반월당로 번화가 빈칸"
          address="하늘시 비구름동 주륵주륵 304호"
          startTime="09월 02일 08시"
          endTime="09월 03일 15시"
        />
        <ApplicationIlKanItem
          title="대구 경북 경산시 청운2로 4 사진 스튜디오"
          address="하늘시 비구름동 주륵주륵 304호"
          startTime="09월 02일 08시"
          endTime="09월 03일 15시"
        />
      </div>
    </div>
  );
}
