import { useMemo, useState } from "react";
import kanMatchStyle from "../../css/pages/kanMatchPage.module.css";
import KanMatchNavigation, {
  TABS,
  Tab,
} from "../../components/kanMatch/kanMatchNavigation";
import KanMatchList from "../../components/kanMatch/kanMatchList";
import KanMatchFilter from "../../components/kanMatch/kanMatchFilter";
import KanMatchPagination from "../../components/kanMatch/kanMatchPagination";

/**
 * KanMatchPage — 공간 목록 화면
 * Components: KanMatchNavigation, KanList, KanMatchFilter, KanMatchPagination
 */

// 예상되는 데이터 타입
export type KanItem = {
  id: number;
  title: string;
  writer: string;
  price: string;
  image?: string;
};

const MOCK_LIST: KanItem[] = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  title: "경산시 공유 오피스 회의실, 모던, 화이트톤, 집중이 잘 되",
  writer: "김성철",
  price: i + "0,000원",
}));

const PAGE_SIZE = 15;

export default function KanMatchPage() {
  const [activeTab, setActiveTab] = useState<Tab>("공유 오피스");
  const [sido, setSido] = useState("경북"); // 시/도 선택 상태
  const list = MOCK_LIST;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const paged = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className={kanMatchStyle.kanMatchPageContainer}>
      <div className={kanMatchStyle.filterContainer}>
        <KanMatchFilter selected={sido} onSelect={setSido} buttonLabel={sido} />
      </div>
      <KanMatchNavigation active={activeTab} onChange={setActiveTab} />

      <section className={kanMatchStyle.listContainer}>
        <KanMatchList items={paged} />
      </section>

      <footer>
        {totalPages > 1 && (
          <KanMatchPagination
            current={page}
            total={totalPages}
            onChange={setPage}
          />
        )}
      </footer>
    </div>
  );
}
