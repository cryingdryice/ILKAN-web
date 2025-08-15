import { useMemo, useState } from "react";
import jobsPageStyle from "../../css/pages/jobsPage.module.css";
import JobsNavigation, {
  TABS,
  Tab,
} from "../../components/jobs/JobsNavigation";
import JobsList from "../../components/jobs/JobsList";
import JobPagination from "../../components/jobs/JobPagination";

/**
 * JobsPage — 일거리 목록 화면
 * Components: JobsNavigation, JobsList, JobPagination
 */

// 예상되는 데이터 타입
export type WorkItem = {
  id: number;
  title: string;
  writer: string;
  price: string;
  image?: string;
  deadline: string;
};

const MOCK_LIST: WorkItem[] = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  title: "[카페 반절] 인스타 분위기 카페 BI 및 로고 디자인 외주 의뢰",
  writer: "카페 반절 (개인 사업자)",
  price: i + "00,000원~",
  deadline: "~25/08/30",
}));

const PAGE_SIZE = 13;

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("디자인");
  const list = MOCK_LIST;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const paged = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className={jobsPageStyle.jobsPageContainer}>
      <JobsNavigation active={activeTab} onChange={setActiveTab} />

      <section className={jobsPageStyle.listContainer}>
        <JobsList items={paged} />
      </section>

      <footer>
        {totalPages > 1 && (
          <JobPagination current={page} total={totalPages} onChange={setPage} />
        )}
      </footer>
    </div>
  );
}
