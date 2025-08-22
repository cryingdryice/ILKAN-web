import { useEffect, useMemo, useState } from "react";
import jobsPageStyle from "../../css/pages/jobsPage.module.css";
import JobsNavigation, { Tab } from "../../components/jobs/JobsNavigation";
import JobsList from "../../components/jobs/JobsList";
import JobPagination from "../../components/jobs/JobPagination";
import api from "../../api/api";

/**
 * JobsPage — 일거리 목록 화면 (KanMatchPage 형식으로 정리)
 */

export type WorkItem = {
  taskId: number; // Number → number 권장
  title: string;
  price: number;
  taskEnd: string;
};

const PAGE_SIZE = 10;

// 탭 라벨 → 백엔드 category(enum) 매핑
const CATEGORY_MAP: Record<Tab, string> = {
  전체: "",
  디자인: "DESIGN",
  "사진/영상": "PHOTO_VIDEO",
  개발: "DEVELOPMENT",
  법률: "LAW",
  기타: "ETC",
};

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("전체");
  const [items, setItems] = useState<WorkItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  // 탭 → 카테고리 파라미터 메모
  const category = useMemo(() => CATEGORY_MAP[activeTab], [activeTab]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchWorks = async () => {
      setLoading(true);
      setErrorText(null);
      try {
        const params: Record<string, any> = {
          page: page - 1,
          size: PAGE_SIZE,
          category: category,
          // sort: ["createdAt,DESC"], // 스웨거 기본 정렬이면 생략 가능
        };
        // if (category) params.category = category; // "전체"면 미포함

        const res = await api.get("/works", {
          params,
          signal: controller.signal,
        });

        const data = res.data;
        setItems(data?.content ?? []);
        setTotalPages(Math.max(1, data?.totalPages ?? 1));
      } catch (e: any) {
        if (e.name === "CanceledError" || e.code === "ERR_CANCELED") return;
        const msg =
          e.response?.data?.message ||
          e.message ||
          "일거리 목록을 불러오지 못했습니다.";
        setErrorText(msg);
        setItems([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
    return () => controller.abort();
  }, [page, category]);

  return (
    <div className={jobsPageStyle.jobsPageContainer}>
      <JobsNavigation
        active={activeTab}
        onChange={(tab) => {
          setActiveTab(tab);
          setPage(1); // 탭 바꾸면 1페이지로
        }}
      />

      <section className={jobsPageStyle.listContainer}>
        {loading && <div>불러오는 중…</div>}
        {!loading && errorText && <div>{errorText}</div>}
        {!loading && !errorText && <JobsList items={items} />}
      </section>

      {totalPages > 1 && (
        <footer>
          <JobPagination current={page} total={totalPages} onChange={setPage} />
        </footer>
      )}
    </div>
  );
}
