import { useEffect, useState } from "react";
import progressingIlKanStyle from "../../css/components/myPage/progressingIlKan.module.css";
import StateIcon from "../StateIcon";
import inIcon from "../../assets/myPage/In-icon.svg";
import outIcon from "../../assets/myPage/Out-icon.svg";
import ProgressBar from "./ProgressBar";
import Modal from "../../components/Modal";
import modalStyle from "../../css/components/modal.module.css";
import api from "../../api/api";

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
  buildingImage: string;
}

export default function ProgressingIlKan({ role }: Props) {
  const [items, setItems] = useState<Items[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalOnConfirm, setModalOnConfirm] = useState<(() => void) | null>(
    null
  );

  const fetchWorkInfo = async () => {
    try {
      const response = await api.get("/myprofile/buildings/using");
      if (response.status === 200) {
        setItems(response.data.content);
      } else {
        const error = await response.data;
        // alert(error.message);
        setModalTitle("빌리고 있는 일칸");
        setModalText(error.message);
        setIsOpen(true);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      // alert(errorMessage);
      setModalTitle("빌리고 있는 일칸");
      setModalText(errorMessage);
      setIsOpen(true);
    }
  };

  useEffect(() => {
    fetchWorkInfo();
  }, []);
  return (
    <div className={progressingIlKanStyle.container}>
      {isOpen && (
        <div className={modalStyle.overlay}>
          <Modal
            setIsOpen={setIsOpen}
            text={modalText}
            title={modalTitle}
            onConfirm={modalOnConfirm || undefined}
          />
        </div>
      )}
      <div className={progressingIlKanStyle.headerDiv}>
        <StateIcon state="진행중" evaluation={false} />
        <span className={progressingIlKanStyle.headerTitle}>
          지금 빌리고 있는 일칸이 {items.length}개 있어요!
        </span>
      </div>
      <div className={progressingIlKanStyle.body}>
        {items.map((item) => (
          <div
            key={item.reservationId}
            className={progressingIlKanStyle.itemContainer}
          >
            <div className={progressingIlKanStyle.itemHeader}>
              <div className={progressingIlKanStyle.itemImgDiv}>
                <img src={item.buildingImage} alt="사진"></img>
              </div>
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
                performerReady={true} // 이 줄을 추가하면 됩니다.
              />
            </div>
            <div className={progressingIlKanStyle.footer}>
              <a
                href={`/main/kanMatch/${item.buildingId}`}
                className={progressingIlKanStyle.viewLink}
              >
                공고 보러가기{" >"}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
