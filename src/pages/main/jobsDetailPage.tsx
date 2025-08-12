// JobsDetailPage.tsx
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import type { WorkItem } from "./jobsPage";
import { useEffect, useState } from "react";
import jobsDetailPageStyle from "../../css/pages/jobsDetailPage.module.css";

// mockData 분리 대신 임시 복붙 (실제론 분리 권장)
const MOCK_LIST: WorkItem[] = Array.from({ length: 15 }).map((_, i) => ({
  id: i + 1,
  title: "인스타 분위기 카페 BI 디자인 외주 의뢰",
  writer: "카페 반절 (개인 사업자)",
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
    <div className={jobsDetailPageStyle.Container}>
      <div className={jobsDetailPageStyle.Header}>
        <span className={jobsDetailPageStyle.HeaderTitle}>
          {workItem.title}
        </span>
      </div>
      <div className={jobsDetailPageStyle.Footer}></div>
      <Link
        to={`/main/jobs/${id}/application`}
        className={jobsDetailPageStyle.ApplyButton}
      >
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
