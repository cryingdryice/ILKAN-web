import registeredWorkStyle from "../../css/components/myPage/registeredWork.module.css";
import cancelImg from "../../assets/myPage/X.svg";
import handShake from "../../assets/myPage/handshake.svg";
import clock from "../../assets/myPage/clock.svg";
import person from "../../assets/myPage/person.svg";
import check from "../../assets/myPage/performerReady-icon.svg";
import { Link } from "react-router-dom";
type Props = {
  item: Item;
  role: string | null;
};
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
export default function RegisteredWork({ item, role }: Props) {
  return (
    <div key={item.taskId} className={registeredWorkStyle.itemContainer}>
      <img src={cancelImg} alt="닫기" />

      <div className={registeredWorkStyle.itemContent}>
        {/* <div className={registeredWorkStyle.itemTopDiv}>
                <span>
                  {item.requester.name} ({item.requester.role})
                </span>
              </div> */}

        <div className={registeredWorkStyle.itemTitleDiv}>
          <span className={registeredWorkStyle.itemTitle}>{item.title}</span>
          <span className={registeredWorkStyle.price}>
            {item.price.toLocaleString()}원~
          </span>
          <span className={registeredWorkStyle.date}>
            ~{new Date(item.recruitmentPeriod).toLocaleDateString("ko-KR")}
          </span>
        </div>

        <div className={registeredWorkStyle.itemBottomDiv}>
          <div className={registeredWorkStyle.leftDiv}>
            <Link to="#" className={registeredWorkStyle.performerSelectDiv}>
              <img src={person} alt="지원자 n명" />
              <span>지원자 5명 {">"}</span>
            </Link>
            <div className={registeredWorkStyle.dateSelectDiv}>
              <img src={clock} alt="기간 설정" />
              <span>사용자와 협의된 계약기간을 설정해주세요</span>
            </div>
          </div>

          <div className={registeredWorkStyle.readyBtn}>
            <img src={check} alt="준비 완료" />
            <span>준비 완료</span>
          </div>
        </div>
      </div>

      <Link to="#" className={registeredWorkStyle.editDiv}>
        <span>수정하기</span>
        <img src={check} alt="수정하기" />
      </Link>
    </div>
  );
}
