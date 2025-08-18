import applicationWorkStyle from "../../css/components/myPage/applicationWork.module.css";
import ApplicationWorkItem from "./ApplicationWorkItem";
import StateIcon from "../StateIcon";
import { useEffect, useState } from "react";
import api from "../../api/api";

type Props = {
  role: string | null;
  onLoaded: () => void;
};

interface Items {
  taskId: number;
  title: string;
  price: string;
  date: string;
}

export default function ApplicationWork({ role, onLoaded }: Props) {
  const [items, setItems] = useState<Items[]>([]);

  // const fetchWorkInfo = async () => {
  //   try {
  //     const response = await api.get("/myprofile/commissions/applied");
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
    <div className={applicationWorkStyle.container}>
      <div className={applicationWorkStyle.headerDiv}>
        <StateIcon state="신청중" />
        <span className={applicationWorkStyle.headerTitle}>
          지원중인 의뢰가 4건 있어요! 수락되면 바로 알림보내드릴게요
        </span>
      </div>
      <div className={applicationWorkStyle.body}></div>
    </div>
  );
}
