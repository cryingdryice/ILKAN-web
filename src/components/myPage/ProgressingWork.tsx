import { useEffect, useState } from "react";
import progressingWorkStyle from "../../css/components/myPage/progressingWork.module.css";
import StateIcon from "../StateIcon";
import api from "../../api/api";
import ProgressBar from "./ProgressBar";
import performerOkImg from "../../assets/myPage/performerReady-icon.svg";
import performerPayed from "../../assets/myPage/performerPayed-icon.svg";
import confirmStandby from "../../assets/myPage/confirmStandby.svg";
import Modal from "../../components/Modal";
import modalStyle from "../../css/components/modal.module.css";

type Props = {
  role: string | null;
};

interface Items {
  taskId: number;
  title: string;
  price: number;
  taskStart: string;
  taskEnd: string;
  status: string;
}

export default function ProgressingWork({ role }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalOnConfirm, setModalOnConfirm] = useState<(() => void) | null>(
    null
  );
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  // console.log("오늘 날짜:", formattedDate);
  const [items, setItems] = useState<Items[]>([]);
  const [progresses, setProgresses] = useState<{ [key: number]: number }>({});
  const [paymentReceived, setPaymentReceived] = useState<{
    [key: number]: boolean;
  }>({});

  const handleProgressChange = (taskId: number, progress: number) => {
    setProgresses((prevProgresses) => ({
      ...prevProgresses,
      [taskId]: progress,
    }));
  };

  const handleButtonClick = async (taskId: number) => {
    const apiAddress =
      role === "PERFORMER"
        ? `/myprofile/commissions/${taskId}/status/performer`
        : `/myprofile/commissions/${taskId}/status/requester`;
    try {
      const response = await api.patch(apiAddress, {});
      if (response.status === 200) {
        setItems(response.data.content);
        window.location.reload();
      } else {
        const error = await response.data;
        alert(error.message);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      alert(errorMessage);
    } finally {
    }
  };
  const fetchWorkInfo = async () => {
    const apiAddress =
      role === "PERFORMER"
        ? "/myprofile/commissions/doing"
        : "/myprofile/commissions/working";
    try {
      const response = await api.get(apiAddress);
      if (response.status === 200) {
        setItems(response.data.content);
      } else {
        const error = await response.data;
        alert(error.message);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      alert(errorMessage);
    } finally {
    }
  };

  useEffect(() => {
    fetchWorkInfo();
  }, []);
  return (
    <div className={progressingWorkStyle.container}>
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
      <div className={progressingWorkStyle.headerDiv}>
        <StateIcon state="진행중" evaluation={false} />
        <span className={progressingWorkStyle.headerTitle}>
          지금 진행중인 의뢰가 {items.length}건 있어요!
        </span>
      </div>
      <div className={progressingWorkStyle.body}>
        {items.map((item) => (
          <div key={item.taskId} className={progressingWorkStyle.itemContainer}>
            <div className={progressingWorkStyle.itemHeader}>
              <span className={progressingWorkStyle.itemTitle}>
                {item.title}
              </span>
              <span className={progressingWorkStyle.itemPrice}>
                {`${item.price.toLocaleString()}원`}
              </span>
            </div>
            <div className={progressingWorkStyle.itemContent}>
              <ProgressBar
                taskStart={item.taskStart}
                taskEnd={item.taskEnd}
                // status={item.status} // 추가
                onProgressChange={(progress) =>
                  handleProgressChange(item.taskId, progress)
                } // 콜백 함수 전달
              />
            </div>
            <div className={progressingWorkStyle.itemBtnDiv}>
              {role === "PERFORMER" && (
                <>
                  {progresses[item.taskId] <= 0 && (
                    <button
                      className={progressingWorkStyle.itemBtn}
                      type="button"
                      onClick={() => handleButtonClick(item.taskId)}
                    >
                      <img src={performerOkImg} alt="준비 완료" />
                      준비 완료
                    </button>
                  )}

                  {progresses[item.taskId] >= 100 && (
                    <button
                      className={
                        item.status === "PAY_WAITING"
                          ? `${progressingWorkStyle.payedBtn} ${progressingWorkStyle.itemBtn}`
                          : progressingWorkStyle.itemBtn
                      }
                      type="button"
                      onClick={() => handleButtonClick(item.taskId)}
                    >
                      <img
                        src={
                          item.status === "PAY_WAITING"
                            ? performerPayed
                            : performerOkImg
                        }
                        alt="수행 완료"
                      />
                      {item.status === "PAY_WAITING"
                        ? "보수를 받았음"
                        : "수행 완료"}
                    </button>
                  )}
                </>
              )}
              {role === "REQUESTER" && (
                <>
                  {progresses[item.taskId] >= 100 && (
                    <button
                      className={progressingWorkStyle.itemBtn}
                      type="button"
                      onClick={() => handleButtonClick(item.taskId)}
                    >
                      <img src={performerOkImg} alt="보수 지급" />
                      {item.status === "COMPLETE_WAITING"
                        ? "지급 완료"
                        : "보수 지급"}
                    </button>
                  )}
                </>
              )}
              <a
                href={`/main/jobs/${item.taskId}`}
                className={progressingWorkStyle.viewLink}
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
