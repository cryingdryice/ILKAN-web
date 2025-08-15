import { useEffect, useState } from "react";
import jobsPageStyle from "../../css/pages/jobsPage.module.css";
import JobsNavigation, { Tab } from "../../components/jobs/JobsNavigation";
import JobsList from "../../components/jobs/JobsList";
import JobPagination from "../../components/jobs/JobPagination";

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
        const url = new URL(`${BASE_URL}/works`);
        url.searchParams.set("page", String(page - 1));
        url.searchParams.set("size", String(PAGE_SIZE));
        // url.searchParams.set("sort", String(null)); // 지금은 정렬 필요없음

        const res = await fetch(url, {
          method: "GET",
        });

        if (res.ok) {
          const data = await res.json();

          setItems(data.content || []);
          setTotalPages(Math.max(1, data.totalPages ?? 1));
        } else {
          throw new Error(`HTTP ${res.status}`);
        }
      } catch (e: any) {
        if (e.name !== "AbortError") {
          throw new Error(e);
        }
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
