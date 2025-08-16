import { useEffect, useState } from "react";
import jobsPageStyle from "../../css/pages/jobsPage.module.css";
import JobsNavigation, { Tab } from "../../components/jobs/JobsNavigation";
import JobsList from "../../components/jobs/JobsList";
import JobPagination from "../../components/jobs/JobPagination";
import api from "../../api/api";

export type WorkItem = {
  taskId: Number;
  title: string;
  price: number;
  taskEnd: string;
};

const PAGE_SIZE = 10;

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("디자인");
  const [items, setItems] = useState<WorkItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchWorks = async () => {
      setLoading(true);
      try {
        const res = await api.get("/works", {
          params: {
            page: page - 1,
            size: PAGE_SIZE,
            // sort: null, // 필요 시 사용
          },
        });

        const data = res.data;
        setItems(data?.content ?? []);
        setTotalPages(Math.max(1, data?.totalPages ?? 1));
      } catch (e: any) {
        if (e.name === "CanceledError") return;
        console.error("[works] fetch error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchWorks();
  }, [page, activeTab]);

  return (
    <div className={jobsPageStyle.jobsPageContainer}>
      <JobsNavigation
        active={activeTab}
        onChange={(tab) => {
          setActiveTab(tab);
          setPage(1);
        }}
      />

      <section className={jobsPageStyle.listContainer}>
        {loading ? <div>불러오는 중…</div> : <JobsList items={items} />}
      </section>

      {totalPages > 1 && (
        <footer>
          <JobPagination current={page} total={totalPages} onChange={setPage} />
        </footer>
      )}
    </div>
  );
}
