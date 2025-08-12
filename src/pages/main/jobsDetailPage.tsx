import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import type { WorkItem } from "./jobsPage";
import { useEffect, useState } from "react";
import styles from "../../css/pages/jobsDetailPage.module.css";

// mockData 분리 대신 임시 복붙 (실제론 분리 권장)
const MOCK_LIST: WorkItem[] = Array.from({ length: 15 }).map((_, i) => ({
  id: i + 1,
  title: "[카페 반절] 인스타 분위기 카페 BI 로고 디자인 외주 의뢰",
  writer: "카페 반절 경산 임당역 점",
  price: "500,000원~",
  image: `https://via.placeholder.com/600x400?text=Job+ID+${i + 1}`,
}));

export default function JobsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [workItem, setWorkItem] = useState<WorkItem | null>(null);

  useEffect(() => {
    if (!id) return;
    const item = MOCK_LIST.find((w) => w.id === Number(id));
    setWorkItem(item || null);
  }, [id]);

  if (!workItem) return <div>일거리 정보를 찾을 수 없습니다.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerSubtitle}>{workItem.writer}</div>
        {/* 위 부분이 장소를 나타내는곳인데 따로 어느 정보를 받아서 넣어야 할지 애매해서 우선 writer 넣어뒀습니다.*/}
        <div className={styles.headerTitle}>{workItem.title}</div>
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
            <div className={styles.infoIcon}></div>
            <div className={styles.infoContent}>
              <label className={styles.infoLabel}>작업기간</label>
              <span className={styles.infoDate}>1~3개월</span>
            </div>
          </div>
          <div className={styles.infoBox}>
            <div className={styles.infoIcon}></div>
            <div className={styles.infoContent}>
              <label className={styles.infoLabel}>작업보수</label>
              <span className={styles.infoSalary}>500,000원~</span>
            </div>
          </div>
          <div className={styles.infoBox}>
            <div className={styles.infoIcon}></div>
            <div className={styles.infoContent}>
              <label className={styles.infoLabel}>연락처</label>
              <span className={styles.infoPhone}>010-2905-8025</span>
            </div>
          </div>
          <div className={styles.infoBox}>
            <div className={styles.infoIcon}></div>
            <div className={styles.infoContent}>
              <label className={styles.infoLabel}>이메일</label>
              <span className={styles.infoEmail}>apple@naver.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer}></div>
      <Link to={`/main/jobs/${id}/application`} className={styles.applyBtn}>
        지원하기
      </Link>
      {/* 일단 링크 부분 기능 없이 겉으로만 구현 해두었습니다 이 부분 수정해서 작업 이어 나가시면 됩니다. */}
    </div>
  );
}

{
  /* 
{workItem.image && (
          <img
            src={workItem.image}
            alt={workItem.title}
            className={jobsDetailPageStyle.image}
          />
        )}
      </div>
      <div className={jobsDetailPageStyle.content}>
        <h1>{workItem.title}</h1>
        <p>작성자: {workItem.writer}</p>
        <p>가격: {workItem.price}</p>
      </div> */
}
