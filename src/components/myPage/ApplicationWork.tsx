import applicationWorkStyle from "../../css/components/myPage/applicationWork.module.css";
import ApplicationWorkItem from "./ApplicationWorkItem";
import StateIcon from "../StateIcon";
import { useEffect, useState } from "react";
import api from "../../api/api";

type Props = {
  role: string | null;
};

interface Items {
  taskId: number;
  title: string;
  price: number;
  recruitmentPeriod: string;
}

export default function ApplicationWork({ role }: Props) {
  const [items, setItems] = useState<Items[]>([]);
  const mockItems: Items[] = [
    {
      taskId: 1,
      title: "[카페 반절] 인스타 분위기 카페 BI 및 로고 디자인 외주 의뢰",
      price: 500000,
      recruitmentPeriod: "2025-08-30T13:40:22.276Z",
    },
    {
      taskId: 2,
      title: "[카페 반절] 인스타 분위기 카페 BI 및 로고 디자인 외주 의뢰",
      price: 500000,
      recruitmentPeriod: "2025-08-17T13:40:22.276Z",
    },
    {
      taskId: 3,
      title: "[카페 반절] 인스타 분위기 카페 BI 및 로고 디자인 외주 의뢰",
      price: 500000,
      recruitmentPeriod: "2025-08-17T13:40:22.276Z",
    },
  ];
  const dataToRender = items.length > 0 ? items : mockItems;
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
        <StateIcon state="신청중" evaluation={false} />
        <span className={applicationWorkStyle.headerTitle}>
          지원중인 의뢰가 있어요!
        </span>
      </div>
      <div className={applicationWorkStyle.body}>
        {dataToRender.map((item) => {
          const date = new Date(item.recruitmentPeriod);
          const year = date.getFullYear().toString().slice(2);
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          const formattedDate = `${year}/${month}/${day}`;

          return (
            <ApplicationWorkItem
              key={item.taskId}
              item={item}
              role={role}
              formattedDate={formattedDate}
            />
          );
        })}
      </div>
    </div>
  );
}
