import { useState } from "react";
import jobsPageStyle from "../../css/pages/jobsPage.module.css";
import JobsNavigation, {
  TABS,
  Tab,
} from "../../components/jobs/JobsNavigation";
import JobsList from "../../components/jobs/JobsList";

export type WorkItem = {
  id: number;
  title: string;
  writer: string;
  price: string;
  image?: string;
};

const MOCK_LIST: WorkItem[] = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  title: "인스타 분위기 카페 BI 디자인 외주 의뢰",
  writer: "카페 반절 (개인 사업자)",
  price: "500,000원~",
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
