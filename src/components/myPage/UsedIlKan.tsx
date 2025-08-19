import { useState } from "react";
import progressingIlKanStyle from "../../css/components/myPage/progressingIlKan.module.css";
import StateIcon from "../StateIcon";
import inIcon from "../../assets/myPage/In-icon.svg";
import outIcon from "../../assets/myPage/Out-icon.svg";
import ProgressBar from "./ProgressBar";

type Props = {
  role: string | null;
};
interface Items {
  reservationId: number;
  buildingId: number;
  buildingName: string;
  buildingAddress: string;
  startTime: string;
  endTime: string;
}

export default function UsedIlKan({ role }: Props) {
  const [items, setItems] = useState<Items[]>([]);
  const mockItems: Items[] = [
    {
      reservationId: 201,
      buildingId: 301,
      buildingName: "경산시 조영동 사진 스튜디오 일칸",
      buildingAddress: "하늘시 비구름동 주륵주륵 304호",
      startTime: "2025-07-17",
      endTime: "2025-08-30",
    },
    {
      reservationId: 202,
      buildingId: 302,
      buildingName: "서울 강남구 프리랜서 작업실",
      buildingAddress: "서울특별시 강남구 테헤란로 123",
      startTime: "2025-07-17",
      endTime: "2025-09-17",
    },
  ];
  const dataToRender = items.length > 0 ? items : mockItems;
  // const fetchWorkInfo = async () => {
  //   try {
  //     const response = await api.get("/myprofile/buildings/using");
  //     if (response.status === 200) {
  //       setItems(response.data);
  //     } else {
  //       const error = await response.data;
  //       alert(error.message);
  //     }
  //   } catch (error: any) {
  //     const errorMessage =
  //       error.response?.data?.message ||
  //       error.message ||
  //       "알 수 없는 오류 발생";
  //     alert(errorMessage);
  //   } finally {
  //     onLoaded();
  //   }
  // };

  // useEffect(() => {
  //   fetchWorkInfo();
  // }, []);
  return (
    <div className={progressingIlKanStyle.container}>
      <div className={progressingIlKanStyle.headerDiv}>
        <StateIcon state="진행중" />
        <span className={progressingIlKanStyle.headerTitle}>
          나의 칸을 빌리고 있어요!
        </span>
      </div>
      <div className={progressingIlKanStyle.body}>
        {dataToRender.map((item) => (
          <div
            key={item.reservationId}
            className={progressingIlKanStyle.itemContainer}
          >
            <div className={progressingIlKanStyle.itemHeader}>
              <div className={progressingIlKanStyle.itemImgDiv}></div>
              <div className={progressingIlKanStyle.itemRightDiv}>
                <div className={progressingIlKanStyle.itemTitle}>
                  <span>{item.buildingName}</span>
                </div>
                <div className={progressingIlKanStyle.itemAddress}>
                  <span>{item.buildingAddress}</span>
                </div>
                <div className={progressingIlKanStyle.itemTime}>
                  <div className={progressingIlKanStyle.time}>
                    <img src={inIcon} alt="입실" />
                    <span>입실시간 | 08:00~</span>
                  </div>
                  <div className={progressingIlKanStyle.time}>
                    <img src={outIcon} alt="퇴실" />
                    <span>퇴실시간 | ~23:00</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={progressingIlKanStyle.itemContent}>
              <ProgressBar
                taskStart={item.startTime}
                taskEnd={item.endTime}
                onProgressChange={() => {}}
              />
            </div>
            <div className={progressingIlKanStyle.footer}>
              <a href="#" className={progressingIlKanStyle.viewLink}>
                공고 보러가기{" >"}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
