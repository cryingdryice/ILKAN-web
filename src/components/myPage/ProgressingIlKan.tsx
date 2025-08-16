import { useState } from "react";
import progressingIlKanStyle from "../../css/components/myPage/progressingIlKan.module.css";
import checkImg from "../assets/check.png";
import StateIcon from "../StateIcon";
import Tag from "../Tag";

type Props = {
  role: string | null;
  onLoaded: () => void;
};
interface Items {
  reservationId: number;
  buildingId: number;
  buildingAddress: string;
  startTime: string;
  endTime: string;
}

export default function ProgressingIlKan({ role, onLoaded }: Props) {
  const [items, setItems] = useState<Items[]>([]);
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
        <span>지금 빌리고 있는 일칸이 있어요!</span>
      </div>
      <div className={progressingIlKanStyle.body}>
        <div className={progressingIlKanStyle.inner}>
          <div className={progressingIlKanStyle.topDiv}>
            <div className={progressingIlKanStyle.leftDiv}>
              <div className={progressingIlKanStyle.img}>
                <StateIcon state="진행중" />
                <span>공간 사진</span>
              </div>
              <div className={progressingIlKanStyle.textDiv}>
                <div className={progressingIlKanStyle.titleDiv}>
                  <span>경산시 조영동 사진 스튜디오 일칸</span>
                </div>
                <div className={progressingIlKanStyle.tagDiv}>
                  <div className={progressingIlKanStyle.mainDiv}>
                    <Tag category="main" text="포토배경지" />
                    <Tag category="main" text="조명" />
                    <Tag category="main" text="삼각대" />
                  </div>
                  <div className={progressingIlKanStyle.basicDiv}>
                    <Tag category="basic" text="무료 wi-fi" />
                    <Tag category="basic" text="대형 모니터" />
                  </div>
                </div>
                <div className={progressingIlKanStyle.addressDiv}>
                  <span>하늘시 비구름동 주륵주륵 304호</span>
                </div>
              </div>
            </div>
            <div className={progressingIlKanStyle.rightDiv}>
              <div className={progressingIlKanStyle.priceDiv}>
                <span>10,000원</span>
              </div>
            </div>
          </div>
          <div className={progressingIlKanStyle.contentDiv}>
            <div className={progressingIlKanStyle.progressingBarDiv}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
