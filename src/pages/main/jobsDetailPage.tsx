import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../../css/pages/jobsDetailPage.module.css";

type WorkItem = {
  id: number;
  title: string;
  writer: string;
  price: string;
  images?: string[];
};

const MOCK_LIST: WorkItem[] = Array.from({ length: 15 }).map((_, i) => ({
  id: i + 1,
  title: "[카페 반절] 인스타 분위기 카페 BI 로고 디자인 외주 의뢰",
  writer: "카페 반절 경산 임당역 점",
  price: "500,000원~",
  images: [
    `https://via.placeholder.com/300x200?text=Job+ID+${i + 1}_1`,
    `https://via.placeholder.com/300x200?text=Job+ID+${i + 1}_2`,
  ],
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

      <div className={styles.footer}>
        <span className={styles.footerSubtitle}>상세 모집 내용</span>
        <div className={styles.thumbcontainer}>
          {workItem.images && workItem.images.length > 0 ? (
            workItem.images.map((imgUrl, idx) => (
              <div key={idx} className={styles.thumb}>
                <img
                  src={imgUrl}
                  alt={`${workItem.title} 이미지 ${idx + 1}`}
                  className={styles.img}
                />
              </div>
            ))
          ) : (
            <div className={styles.noImagePlaceholder}>이미지가 없습니다.</div>
          )}
        </div>
        <div className={styles.footerText}>
          신생 대형카페 준비중인 반절 사장입니다~~ 가게의 분위를 보고 브랜드
          디자인을 해줄 디자이너를 구합니다! 자세한 문의는 전화나 메일로
          받겠습니다!
        </div>
      </div>

      <Link to={`/main/jobs/${id}/application`} className={styles.applyBtn}>
        지원하기
      </Link>
    </div>
  );
}
