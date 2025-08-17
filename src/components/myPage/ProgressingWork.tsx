import { useEffect, useState } from "react";
import progressingWorkStyle from "../../css/components/progressingWork.module.css";
import StateIcon from "../StateIcon";
import api from "../../api/api";

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
  const [items, setItems] = useState<Items[]>([]);

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
        <span>지금 진행중인 의뢰가 2건 있어요!</span>
      </div>
      <div className={progressingWorkStyle.body}>
        <div className={progressingWorkStyle.inner}>
          <div className={progressingWorkStyle.topDiv}>
            <div className={progressingWorkStyle.checkAndTitleDiv}>
              <StateIcon state="진행중" />
              <div className={progressingWorkStyle.titleDiv}>
                <span>화장품 텍스쳐 상세 정보란 사진 외주 </span>
              </div>
            </div>
            <div className={progressingWorkStyle.priceDiv}>
              <span>500,000원</span>
            </div>
          </div>
          <div className={progressingWorkStyle.contentDiv}>
            <div className={progressingWorkStyle.progressingBarDiv}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
