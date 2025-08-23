import styles from "../../css/pages/kanFinalPayPage.module.css";
import Arrow from "../../assets/arrowRight.svg";
import { useLocation } from "react-router-dom";

interface FinalPayState {
  address: string;
  images: {
    cover: string;
    gallery: string[];
  };
  building_name: string;
}

export default function KanFinalPayPage() {
  const location = useLocation();
  const { address, building_name } = location.state as FinalPayState;

  return (
    <div className={styles.wrapper}>
      <div className={styles.checkInOutBox}>
        <div className={styles.dateBox}>
          <div className={styles.dateStart}>2025년 8월 13일 (수)</div>
          {/* api값 들어갈 곳 */}
          <span className={styles.checkTable}>체크인</span>
        </div>
        <img src={Arrow} className={styles.imgBox} alt="우측화살표"></img>
        <div className={styles.dateBox}>
          <div className={styles.dateEnd}>2025년 8월 21일 (토)</div>
          {/* api값 들어갈 곳 */}
          <span className={styles.checkTable}>체크아웃</span>
        </div>
        <div className={styles.checkDate}>9일</div>
        {/* api값 들어갈 곳 */}
      </div>
      <div className={styles.locationBox}>
        <div className={styles.leftSide}>
          <label className={styles.locationSubtitle}>{address}</label>
          <span className={styles.locationTitle}>{building_name}</span>
          <div className={styles.checkArea}>
            <div className={styles.timeArea}>입실시간</div>
            <div className={styles.timeSet}>오전 8시~</div>
          </div>
          <div className={styles.checkArea}>
            <div className={styles.timeArea}>입실시간</div>
            <div className={styles.timeSet}>오전 8시~</div>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.rightSideImg}></div>
        </div>
      </div>
    </div>
  );
}
