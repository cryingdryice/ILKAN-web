import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../../css/pages/kanDetailPage.module.css";
import Writer from "../../assets/writer.svg";
import Date from "../../assets/date.svg";
import Salary from "../../assets/salary.svg";
import Phone from "../../assets/telephone.svg";
import Email from "../../assets/email.svg";
import CheckIn from "../../assets/check-in.svg";
import CheckOut from "../../assets/check-out.svg";
import ImageSlider from "../../components/kanMatch/imageSlider";

// 예상되는 데이터 타입
export type KanItem = {
  id: number;
  title: string;
  writer: string;
  price: string;
  images: string[];
};

// 임시 데이터
const MOCK_LIST: KanItem[] = Array.from({ length: 15 }).map((_, i) => ({
  id: i + 1,
  title: "경산시 공유 오피스 회의실, 모던, 화이트톤, 집중이 잘 되는 오피스",
  writer: "김성철",
  price: "50,000원",
  images: [
    `https://via.placeholder.com/1000x600?text=Job+ID+${i + 1}_1`,
    `https://via.placeholder.com/1000x600?text=Job+ID+${i + 1}_2`,
    `https://via.placeholder.com/1000x600?text=Job+ID+${i + 1}_3`,
    `https://via.placeholder.com/1000x600?text=Job+ID+${i + 1}_4`,
  ],
}));

export default function KanDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [kanItem, setKanItem] = useState<KanItem | null>(null);

  useEffect(() => {
    if (!id) return;
    const item = MOCK_LIST.find((w) => w.id === Number(id));
    setKanItem(item || null);
  }, [id]);

  if (!kanItem) return <div>공간 정보를 찾을 수 없습니다.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.imageSliderBox}>
        <ImageSlider images={kanItem.images} />
      </div>
      <div className={styles.kanPosting}>
        <div className={styles.kanPostingAddress}>경산시 조영동 348-19</div>
        <div className={styles.kanPostingSubtitle}>{kanItem.title}</div>
        <div className={styles.kanPostingWriter}>
          <img src={Writer}></img>
          <div className={styles.kanPostingWriterName}>{kanItem.writer}</div>
        </div>
        <div className={styles.line}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1000"
            height="2"
            viewBox="0 0 1000 2"
            fill="none"
          >
            <path d="M0 1H1000" stroke="#D9D9D9" />
          </svg>
        </div>
        <div className={styles.infoGrid}>
          <div className={styles.infoBox}>
            <img src={Date} className={styles.infoIcon} alt="날짜 아이콘" />
            <div className={styles.infoContent}>
              <label className={styles.infoLabel}>회의실 유형</label>
              <span className={styles.infoDetail}>공유 오피스</span>
            </div>
          </div>
          <div className={styles.infoBox}>
            <img src={Salary} className={styles.infoIcon} alt="날짜 아이콘" />
            <div className={styles.infoContent}>
              <label className={styles.infoLabel}>대여비</label>
              <div className={styles.infoRentalFee}>
                <span className={styles.infoDate}>일/</span>
                <span className={styles.infoRentalFeeValue}>
                  {kanItem.price}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.infoBox}>
            <img src={Email} className={styles.infoIcon} alt="이메일 아이콘" />
            <div className={styles.infoContent}>
              <label className={styles.infoLabel}>이메일</label>
              <span className={styles.infoDetail}>highfive@naver.com</span>
            </div>
          </div>
          <div className={styles.infoBox}>
            <img src={Phone} className={styles.infoIcon} alt="전화기 아이콘" />
            <div className={styles.infoContent}>
              <label className={styles.infoLabel}>전화</label>
              <span className={styles.infoDetail}>010-0000-5555</span>
            </div>
          </div>
          <div className={styles.infoBox}>
            <img src={CheckIn} className={styles.infoIcon} alt="입실 아이콘" />
            <div className={styles.infoContent}>
              <label className={styles.infoLabel}>입실시간</label>
              <span className={styles.infoDetail}>08:00 ~</span>
            </div>
          </div>
          <div className={styles.infoBox}>
            <img src={CheckOut} className={styles.infoIcon} alt="퇴실 아이콘" />
            <div className={styles.infoContent}>
              <label className={styles.infoLabel}>퇴실시간</label>
              <span className={styles.infoDetail}>~/23:00</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.postingArea}>
        <span className={styles.postingAreaSubtitle}>사진 첨부</span>
        <div className={styles.postingAreaImageGrid}>
          <div className={styles.postingAreaImageBox}></div>
          <div className={styles.postingAreaImageBox}></div>
        </div>
      </div>
      <div className={styles.detailArea}>
        <span className={styles.detailAreaSubtitle}>상세설명</span>
        <div className={styles.detailAreaContent}>
          <h4>[공실 설명]</h4>
          <p>
            경산시 조영동에 위치한 화이트톤의 현대적인 공유 오피스입니다. 넓은
            채광창으로 자연광이 가득 들어와, 회의나 팀작업, 스타트업 사무
            공간으로 최적입니다. 인근에 카페·편의점·버스 정류장이 있어 접근성이
            좋습니다.
          </p>

          <h4>편의시설 및 제공 서비스</h4>
          <ul className={styles.bulletList}>
            <li>• 무료 와이파이: 고속 무선 인터넷 지원</li>
            <li>• 전원 콘센트: 좌석마다 개별 구비</li>
            <li>• 화이트보드 및 마커: 회의·브레인스토밍 가능</li>
            <li>• 에어컨/난방 완비: 사계절 쾌적한 환경 유지</li>
            <li>• 공용 프린터: 흑백/컬러 인쇄 가능(유료)</li>
            <li>• 셀프 카페 코너: 커피·차 제공</li>
          </ul>

          <h4>제한 사항</h4>
          <ul className={styles.bulletList}>
            <li>• 주차 공간 협소 (인근 유료주차장 이용 권장)</li>
            <li>• 흡연 불가 (건물 외부 지정 흡연구역 이용)</li>
            <li>• 반려동물 동반 불가</li>
            <li>• 대형 소음 발생 행사 불가 (음악 공연, 방송 촬영 등)</li>
          </ul>

          <p>*자세한 문의사항은 위 번호로 연락주세요*</p>
        </div>
      </div>
      <Link to={`/main/kanMatch/${id}/application`} className={styles.applyBtn}>
        지원하기
      </Link>
    </div>
  );
}
