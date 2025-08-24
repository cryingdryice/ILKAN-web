import registeredWorkStyle from "../../css/components/myPage/registeredWork.module.css";
import RegisteredWorkItem from "./RegisteredWorkItem";
import StateIcon from "../StateIcon";
import cancelImg from "../../assets/myPage/X.svg";
import handShake from "../../assets/myPage/handshake.svg";
import clock from "../../assets/myPage/clock.svg";
import person from "../../assets/myPage/person.svg";
import check from "../../assets/myPage/performerReady-icon.svg";
import write from "../../assets/myPage/write.svg";
import { Link } from "react-router-dom";
import { use, useEffect, useState } from "react";
import api from "../../api/api";

interface Item {
  taskId: number;
  requester: {
    id: number;
    name: string;
    phoneNumber: string;
    role: string;
  };
  performer: {
    id: number;
    name: string;
    phoneNumber: string;
    role: string;
  } | null;
  title: string;
  description: string;
  createdAt: string;
  price: number;
  status: string;
  taskStart: string | null;
  taskEnd: string | null;
  recruitmentPeriod: string;
}

export default function RegisteredWork() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [workList, setWorkList] = useState<Item[]>([]);
  const fetchPerformerList = async () => {
    try {
      const response = await api.get("/myprofile/commissions/upload");
      if (response.status === 200) {
        console.log(response.data.content);
        setWorkList(response.data.content);
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
      // setIsLoadingProfile(false);
    }
  };
  useEffect(() => {
    fetchPerformerList();
  }, []);
  return (
    <div className={registeredWorkStyle.container}>
      {workList.length > 0 ? (
        <>
          <div className={registeredWorkStyle.headerDiv}>
            <StateIcon state="신청중" evaluation={false} />
            <span className={registeredWorkStyle.headerTitle}>
              지원을 받고 있는 의뢰가 있어요
            </span>
          </div>

          <div className={registeredWorkStyle.body}>
            {workList.map((item) => (
              <RegisteredWorkItem
                key={item.taskId}
                item={item}
                role={item.requester.role}
                startDate={startDate}
                endDate={endDate}
                // setStartDate={setStartDate}
                // setEndDate={setEndDate}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className={registeredWorkStyle.headerDiv}>
            <StateIcon state="신청중" evaluation={false} />
            <span className={registeredWorkStyle.headerTitle}>
              등록한 의뢰가 없어요
            </span>
          </div>
          <div className={registeredWorkStyle.body}></div>
        </>
      )}
      <Link to="#" className={registeredWorkStyle.footer}>
        <img src={write} alt="전문가 모집 글쓰기" />
        <span>전문가 모집 글쓰기</span>
      </Link>
    </div>
  );
}
