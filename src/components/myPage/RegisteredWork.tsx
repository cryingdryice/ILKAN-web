import registeredWorkStyle from "../../css/components/myPage/registeredWork.module.css";
import StateIcon from "../StateIcon";
import cancelImg from "../../assets/myPage/X.svg";
import handShake from "../../assets/myPage/handshake.svg";
import clock from "../../assets/myPage/clock.svg";
import person from "../../assets/myPage/person.svg";
import check from "../../assets/myPage/performerReady-icon.svg";

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
        <div className={registeredWorkStyle.itemContainer}>
          <img src={cancelImg} alt="닫기" />
          <div className={registeredWorkStyle.itemContent}>
            <div className={registeredWorkStyle.itemTopDiv}>
              <span>카페 반절 (개인 사업자)</span>
            </div>
            <div className={registeredWorkStyle.itemTitleDiv}>
              <span className={registeredWorkStyle.itemTitle}>
                [카페 반절] 인스타 분위기 카페 BI 및 로고 디자인 외주 의뢰
              </span>
              <span className={registeredWorkStyle.price}>500,000원~</span>
              <span className={registeredWorkStyle.date}>~25/08/30</span>
            </div>
            <div className={registeredWorkStyle.itemBottomDiv}>
              <div className={registeredWorkStyle.leftDiv}>
                <div className={registeredWorkStyle.performerSelectDiv}>
                  <img src={person} alt="지원자 n명" />
                  <span>지원자 5명 {" >"}</span>
                </div>
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
          <div className={registeredWorkStyle.editDiv}>
            <span>수정하기</span>
            <img src={check} alt="수정하기" />
          </div>
        </div>
      </div>
    </div>
  );
}
