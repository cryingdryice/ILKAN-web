import alarmStyle from "../../css/components/myPage/alarmItem.module.css";

interface AlarmtData {
  id: number;
  message: string;
  link: string;
  isRead: boolean;
}

interface AlarmItemProps {
  alarms: AlarmtData[];
}

export default function AlarmItem({ alarms }: AlarmItemProps) {
  const mockAlerts: AlarmtData[] = [
    {
      id: 1,
      message:
        "기업 홍보 사진 촬영 사진작가를 구합니다 외주 신청이 수락되었습니다.",
      link: "/task/1",
      isRead: false,
    },
    {
      id: 2,
      message:
        "기업 홍보 사진 촬영 사진작가를 구합니다 외주 신청이 수락되었습니다.",
      link: "/task/2",
      isRead: true,
    },
    {
      id: 3,
      message: "신규 공고 '카페 인테리어 디자이너 구합니다'가 등록되었습니다.",
      link: "/task/3",
      isRead: false,
    },
    {
      id: 4,
      message: "신규 공고 '카페 인테리어 디자이너 구합니다'가 등록되었습니다.",
      link: "/task/4",
      isRead: false,
    },
    {
      id: 1,
      message:
        "기업 홍보 사진 촬영 사진작가를 구합니다 외주 신청이 수락되었습니다.",
      link: "/task/1",
      isRead: false,
    },
    {
      id: 2,
      message:
        "기업 홍보 사진 촬영 사진작가를 구합니다 외주 신청이 수락되었습니다.",
      link: "/task/2",
      isRead: true,
    },
    {
      id: 3,
      message: "신규 공고 '카페 인테리어 디자이너 구합니다'가 등록되었습니다.",
      link: "/task/3",
      isRead: false,
    },
    {
      id: 4,
      message: "신규 공고 '카페 인테리어 디자이너 구합니다'가 등록되었습니다.",
      link: "/task/4",
      isRead: false,
    },
  ];
  const dataToRender = alarms.length > 0 ? alarms : mockAlerts;
  return (
    <div className={alarmStyle.alarmContainer}>
      {dataToRender.map((alarm) => (
        <div
          key={alarm.id}
          className={`${alarmStyle.alarmItem} ${
            alarm.isRead ? alarmStyle.read : ""
          }`}
        >
          <div className={alarmStyle.alarmMessage}>{alarm.message}</div>
          <a href={alarm.link} className={alarmStyle.viewLink}>
            공고 보러가기{" >"}
          </a>
        </div>
      ))}
    </div>
  );
}
