import { useEffect, useState } from "react";
import progressingWorkStyle from "../../css/components/myPage/progressingWork.module.css";
import StateIcon from "../StateIcon";
import api from "../../api/api";
import ProgressBar from "./ProgressBar";
import performerOkImg from "../../assets/myPage/performerReady-icon.svg";
import performerPayed from "../../assets/myPage/performerPayed-icon.svg";
import Modal from "../../components/Modal";
import modalStyle from "../../css/components/modal.module.css";

type Props = {
  role: string | null;
};

interface Items {
  taskId: number;
  title: string;
  price: number;
  taskStart: string | null;
  taskEnd: string | null;
  status: string;
}

export default function ProgressingWork({ role }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalOnConfirm, setModalOnConfirm] = useState<(() => void) | null>(
    null
  );
  const [items, setItems] = useState<Items[]>([]);
  const [progresses, setProgresses] = useState<{ [key: number]: number }>({});

  const handleProgressChange = (taskId: number, progress: number) => {
    setProgresses((prev) => ({
      ...prev,
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
        {items.map((item) => {
          const progress = progresses[item.taskId] ?? 0;

          // 🔥 디버깅 로그
          console.log("=== Debug Ready Button ===");
          console.log("taskId:", item.taskId);
          console.log("progress:", progress);
          console.log("taskStart:", item.taskStart);
          console.log("taskEnd:", item.taskEnd);
          console.log("status:", item.status);
          console.log(
            "showReadyButton?",
            progress <= 0 &&
              item.taskStart == null &&
              item.taskEnd == null &&
              item.status === "ASSIGNED"
          );

          const showReadyButton =
            progress <= 0 &&
            item.taskStart == null &&
            item.taskEnd == null &&
            item.status === "ASSIGNED";

          return (
            <div
              key={item.taskId}
              className={progressingWorkStyle.itemContainer}
            >
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
                  taskStart={item.taskStart || ""}
                  taskEnd={item.taskEnd || ""}
                  onProgressChange={(p) => handleProgressChange(item.taskId, p)}
                />
              </div>
              <div className={progressingWorkStyle.itemBtnDiv}>
                {role === "PERFORMER" && (
                  <>
                    {showReadyButton && (
                      <button
                        className={progressingWorkStyle.itemBtn}
                        type="button"
                        onClick={() => handleButtonClick(item.taskId)}
                      >
                        <img src={performerOkImg} alt="준비 완료" />
                        준비 완료
                      </button>
                    )}
                    {progress >= 100 && (
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
                {role === "REQUESTER" && progress >= 100 && (
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
                <a
                  href={`/main/jobs/${item.taskId}`}
                  className={progressingWorkStyle.viewLink}
                >
                  공고 보러가기{" >"}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
