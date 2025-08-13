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
export type KanItem = {
  id: number;
  title: string;
  writer: string;
  price: string;
  image?: string;
};

// 임시 데이터
const MOCK_LIST: KanItem[] = Array.from({ length: 15 }).map((_, i) => ({
  id: i + 1,
  title: "경산시 공유 오피스 회의실, 모던, 화이트톤, 집중이 잘 되",
  writer: "김성철",
  price: "50,000원",
}));

export default function KanMatchPage() {
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
