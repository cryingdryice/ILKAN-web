import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import jobsPageStyle from "../../css/pages/jobsPage.module.css";
import JobsNavigation, { Tab } from "../../components/jobs/JobsNavigation";
import JobsList from "../../components/jobs/JobsList";
import JobPagination from "../../components/jobs/JobPagination";
import api from "../../api/api";
import { useLoading } from "../../context/LoadingContext"; // ⬅️ 전역 로딩

export type WorkItem = {
  taskId: number;
  title: string;
  price: number;
  recruitmentPeriod: string;
};

const PAGE_SIZE = 10;

// 라벨 ↔ enum 양방향 매핑
const TAB_TO_ENUM: Record<Tab, string> = {
  전체: "",
  디자인: "DESIGN",
  "사진/영상": "PHOTO_VIDEO",
  개발: "DEVELOPMENT",
  법률: "LAW",
  기타: "ETC",
};
const ENUM_TO_TAB: Record<string, Tab> = {
  "": "전체",
  DESIGN: "디자인",
  PHOTO_VIDEO: "사진/영상",
  DEVELOPMENT: "개발",
  LAW: "법률",
  ETC: "기타",
};

export default function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ===== URL → 상태 파생 =====
  const categoryEnum = (searchParams.get("category") ??
    "") as keyof typeof ENUM_TO_TAB;
  const activeTab = useMemo<Tab>(
    () => ENUM_TO_TAB[categoryEnum] ?? "전체",
    [categoryEnum]
  );
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  const [items, setItems] = useState<WorkItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [errorText, setErrorText] = useState<string | null>(null);

  const { setLoading } = useLoading(); // ⬅️ 전역 로딩 제어

  // ===== 공통 쿼리 갱신 함수 =====
  const updateParams = (next: { category?: string; page?: number }) => {
    const sp = new URLSearchParams(searchParams);

    if (next.category !== undefined) {
      if (next.category) sp.set("category", next.category);
      else sp.delete("category"); // 전체 → 파라미터 제거
      sp.set("page", "1"); // 카테고리 바뀌면 페이지 리셋
    }

    if (next.page !== undefined) {
      sp.set("page", String(next.page));
    }

    setSearchParams(sp);
  };

  // ===== 데이터 페치 (URL 변화에 반응) =====
  useEffect(() => {
    const controller = new AbortController();

    const fetchWorks = async () => {
      setLoading(true); // ⬅️ 전역 스피너 ON
      setErrorText(null);
      try {
        const params: Record<string, any> = {
          page: page - 1,
          size: PAGE_SIZE,
          // sort: ["createdAt,DESC"],
        };
        if (categoryEnum) params.category = categoryEnum;

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
        setLoading(false); // ⬅️ 전역 스피너 OFF
      }
    };

    fetchWorks();
    return () => controller.abort();
  }, [categoryEnum, page, setLoading]);

  return (
    <div className={jobsPageStyle.jobsPageContainer}>
      <JobsNavigation
        active={activeTab}
        onChange={(tab) => {
          const nextEnum = TAB_TO_ENUM[tab] ?? "";
          updateParams({ category: nextEnum });
        }}
      />

      <section className={jobsPageStyle.listContainer}>
        {errorText && <div>{errorText}</div>}
        {!errorText && <JobsList items={items} />}
      </section>

      {totalPages > 1 && (
        <footer>
          <JobPagination
            current={page}
            total={totalPages}
            onChange={(p) => updateParams({ page: p })}
          />
        </footer>
      )}
    </div>
  );
}
