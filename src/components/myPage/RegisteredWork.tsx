import registeredWorkStyle from "../../css/components/myPage/registeredWork.module.css";
import RegisteredWorkItem from "./RegisteredWorkItem";
import StateIcon from "../StateIcon";
import cancelImg from "../../assets/myPage/X.svg";
import handShake from "../../assets/myPage/handshake.svg";
import clock from "../../assets/myPage/clock.svg";
import person from "../../assets/myPage/person.svg";
import check from "../../assets/myPage/performerReady-icon.svg";

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
const mockItems: Item[] = [
  {
    taskId: 123,
    requester: {
      id: 1,
      name: "김이박",
      phoneNumber: "010-1234-1234",
      role: "의뢰자",
    },
    title: "홈페이지 제작",
    description: "기업 홈페이지 리뉴얼 프로젝트",
    createdAt: "2025-08-22T13:37:36.965Z",
    price: 500000,
    status: "OPEN",
    taskStart: "2025-08-22T13:37:36.965Z",
    taskEnd: "2025-09-22T13:37:36.965Z",
    recruitmentPeriod: "2025-08-30T13:37:36.965Z",
  },
  {
    taskId: 124,
    requester: {
      id: 2,
      name: "박민수",
      phoneNumber: "010-5678-5678",
      role: "개인 사업자",
    },
    title: "카페 로고 디자인",
    description: "인스타 감성 카페 로고 제작",
    createdAt: "2025-08-21T10:00:00.000Z",
    price: 300000,
    status: "OPEN",
    taskStart: "2025-08-25T13:37:36.965Z",
    taskEnd: "2025-09-05T13:37:36.965Z",
    recruitmentPeriod: "2025-08-28T13:37:36.965Z",
  },
];

export default function RegisteredWork() {
  return (
    <div className={registeredWorkStyle.container}>
      <div className={registeredWorkStyle.headerDiv}>
        <StateIcon state="신청중" evaluation={false} />
        <span className={registeredWorkStyle.headerTitle}>
          지원을 받고 있는 의뢰가 있어요
        </span>
      </div>

      <div className={registeredWorkStyle.body}>
        {mockItems.map((item) => (
          <RegisteredWorkItem
            key={item.taskId}
            item={item}
            role={item.requester.role}
          />
        ))}
      </div>
    </div>
  );
}
