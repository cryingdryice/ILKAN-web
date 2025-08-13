import { useState } from "react";
import kanMatchStyle from "../../css/pages/kanMatchPage.module.css";
import KanMatchNavigation, {
  TABS,
  Tab,
} from "../../components/kanMatch/kanMatchNavigation";
import KanMatchList from "../../components/kanMatch/kanMatchList";

/**
 * KanMatchPage — 공간 목록 화면
 * Components: KanMatchNavigation, KanList
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
  const [activeTab, setActiveTab] = useState<Tab>("공유 오피스");
  const list = MOCK_LIST;

  return (
    <div className={kanMatchStyle.kanMatchPageContainer}>
      <KanMatchNavigation active={activeTab} onChange={setActiveTab} />

      <section className={kanMatchStyle.listContainer}>
        <KanMatchList items={list} />
      </section>
    </div>
  );
}
