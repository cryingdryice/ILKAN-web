import { useEffect, useState } from "react";
import progressingWorkStyle from "../../css/components/myPage/progressingWork.module.css";
import StateIcon from "../StateIcon";
import api from "../../api/api";
import ProgressBar from "./ProgressBar";
import performerOkImg from "../../assets/performerReady-icon.svg";
import performerPayed from "../../assets/performerPayed-icon.svg";

type Props = {
  role: string | null;
  onLoaded: () => void;
};

interface Items {
  taskId: number;
  title: string;
  price: number;
  taskStart: string;
  taskEnd: string;
  status: string;
}

export default function ProgressingWork({ role, onLoaded }: Props) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  console.log("오늘 날짜:", formattedDate);
  const [items, setItems] = useState<Items[]>([]);
  const [progresses, setProgresses] = useState<{ [key: number]: number }>({});
  const [paymentReceived, setPaymentReceived] = useState<{
    [key: number]: boolean;
  }>({});
  const mockItems: Items[] = [
    {
      taskId: 101,
      title: "화장품 텍스쳐 상세 정보란 사진 외주 ",
      price: 500000,
      taskStart: "2025-08-01",
      taskEnd: "2025-08-30",
      status: "진행중",
    },
    {
      taskId: 102,
      title: "화장품 텍스쳐 상세 정보란 사진 외주 ",
      price: 500000,
      taskStart: "2025-07-28",
      taskEnd: "2025-08-17",
      status: "완료됨",
    },
  ];
  const dataToRender = items.length > 0 ? items : mockItems;
  const handleProgressChange = (taskId: number, progress: number) => {
    setProgresses((prevProgresses) => ({
      ...prevProgresses,
      [taskId]: progress,
    }));
  };
  const handleButtonClick = (taskId: number, progress: number) => {
    if (progress === 0) {
      console.log(`${taskId}번 작업 '준비 완료' 버튼 클릭!`);
      // 준비 완료 API 호출 로직
    } else if (progress === 100) {
      console.log(`${taskId}번 작업 '수행 완료' 버튼 클릭!`);
      // 수행 완료 API 호출 로직
      setPaymentReceived((prev) => ({
        ...prev,
        [taskId]: true,
      }));
    }
  };
  // const fetchWorkInfo = async () => {
  //   try {
  //     const response = await api.get("/myprofile/commissions/doing");
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
    <div className={progressingWorkStyle.container}>
      <div className={progressingWorkStyle.headerDiv}>
        <StateIcon state="진행중" />
        <span className={progressingWorkStyle.headerTitle}>
          지금 진행중인 의뢰가 2건 있어요!
        </span>
      </div>
      <div className={progressingWorkStyle.body}>
        {dataToRender.map((item) => (
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
                onProgressChange={(progress) =>
                  handleProgressChange(item.taskId, progress)
                } // 콜백 함수 전달
              />
            </div>
            <div className={progressingWorkStyle.itemBtnDiv}>
              {paymentReceived[item.taskId] ? (
                <button
                  className={`${progressingWorkStyle.itemBtn} ${progressingWorkStyle.payedBtn}`}
                >
                  <img src={performerPayed} alt="보수 수령 완료" />
                  보수를 받았음
                </button>
              ) : (
                // 보수가 수령되지 않았을 경우
                <>
                  {progresses[item.taskId] === 0 && (
                    <button
                      className={progressingWorkStyle.itemBtn}
                      type="button"
                      onClick={() => handleButtonClick(item.taskId, 0)}
                    >
                      <img src={performerOkImg} alt="준비 완료" />
                      준비 완료
                    </button>
                  )}

                  {progresses[item.taskId] >= 100 && (
                    <button
                      className={progressingWorkStyle.itemBtn}
                      type="button"
                      onClick={() => handleButtonClick(item.taskId, 100)}
                    >
                      <img src={performerOkImg} alt="수행 완료" />
                      수행 완료
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
