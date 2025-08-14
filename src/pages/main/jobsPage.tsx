import { useState } from "react";
import jobsPageStyle from "../../css/pages/jobsPage.module.css";
import JobsNavigation, {
  TABS,
  Tab,
} from "../../components/jobs/JobsNavigation";
import JobsList from "../../components/jobs/JobsList";

/**
 * JobsPage — 일거리 목록 화면
 * Components: JobsNavigation, JobsList
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

// 임시 데이터
const MOCK_LIST: WorkItem[] = Array.from({ length: 15 }).map((_, i) => ({
  id: i + 1,
  title: "[카페 반절] 인스타 분위기 카페 BI 및 로고 디자인 외주 의뢰",
  writer: "카페 반절 (개인 사업자)",
  price: "500,000원~",
  deadline: "~25/08/30",
}));

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("디자인");
  const list = MOCK_LIST;

  return (
    <div className={jobsPageStyle.jobsPageContainer}>
      <JobsNavigation active={activeTab} onChange={setActiveTab} />

      <section className={jobsPageStyle.listContainer}>
        <JobsList items={list} />
      </section>
    </div>
  );
}
