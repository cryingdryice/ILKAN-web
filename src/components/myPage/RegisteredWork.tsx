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
import Modal from "../../components/Modal";
import modalStyle from "../../css/components/modal.module.css";

// -------------------
// 인터페이스 정의
// -------------------
interface Item {
  taskId: number;
  requester: {
    id: number;
    name: string;
    phoneNumber: string;
    role: string;
  };
  performer: {
    id: number | null;
    name: string | null;
    phoneNumber: string | null;
    role: string | null;
  };
  title: string;
  description: string;
  createdAt: string;
  price: number;
  status: string;
  taskStart: string;
  taskEnd: string;
  recruitmentPeriod: string;
}

// -------------------
// 목데이터
// -------------------
// const mockItems: Item[] = [
//   {
//     taskId: 123,
//     requester: {
//       id: 1,
//       name: "김이박",
//       phoneNumber: "010-1234-1234",
//       role: "의뢰자",
//     },
//     performer: {
//       id: null,
//       name: null,
//       phoneNumber: null,
//       role: null,
//     },
//     title: "홈페이지 제작",
//     description: "기업 홈페이지 리뉴얼 프로젝트",
//     createdAt: "2025-08-23T08:03:43.603Z",
//     price: 500000,
//     status: "OPEN",
//     taskStart: "2025-08-23T08:03:43.603Z",
//     taskEnd: "2025-08-23T08:03:43.603Z",
//     recruitmentPeriod: "2025-08-23T08:03:43.603Z",
//   },
//   {
//     taskId: 124,
//     requester: {
//       id: 2,
//       name: "박민수",
//       phoneNumber: "010-5678-5678",
//       role: "개인 사업자",
//     },
//     performer: {
//       id: 2,
//       name: "이지은",
//       phoneNumber: "010-9999-9999",
//       role: "디자이너",
//     },
//     title: "카페 로고 디자인",
//     description: "인스타 감성 카페 로고 제작",
//     createdAt: "2025-08-21T10:00:00.000Z",
//     price: 300000,
//     status: "OPEN",
//     taskStart: "2025-08-25T13:37:36.965Z",
//     taskEnd: "2025-09-05T13:37:36.965Z",
//     recruitmentPeriod: "2025-08-28T13:37:36.965Z",
//   },
// ];

export default function RegisteredWork() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalOnConfirm, setModalOnConfirm] = useState<(() => void) | null>(
    null
  );
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [workList, setWorkList] = useState<Item[]>([]);
  const fetchPerformerList = async () => {
    try {
      const response = await api.get("/myprofile/commissions/upload");
      if (response.status === 200) {
        setWorkList(response.data);
      } else {
        const error = await response.data;
        // alert(error.message);
        setModalTitle("등록한 일거리");
        setModalText(error.message);
        setIsOpen(true);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      // alert(errorMessage);
      setModalTitle("등록한 일거리");
      setModalText(errorMessage);
      setIsOpen(true);
    }
  };
  useEffect(() => {
    fetchPerformerList();
  });
  return (
    <div className={registeredWorkStyle.container}>
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
                setStartDate={setStartDate}
                setEndDate={setEndDate}
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
      <Link to="/main/jobPost" className={registeredWorkStyle.footer}>
        <img src={write} alt="전문가 모집 글쓰기" />
        <span>전문가 모집 글쓰기</span>
      </Link>
    </div>
  );
}
