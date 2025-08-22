import { useEffect, useMemo, useState } from "react";
import kanMatchStyle from "../../css/pages/kanMatchPage.module.css";
import KanMatchNavigation, {
  Tab,
} from "../../components/kanMatch/kanMatchNavigation";
import KanMatchList from "../../components/kanMatch/kanMatchList";
import KanMatchFilter from "../../components/kanMatch/kanMatchFilter";
import KanMatchPagination from "../../components/kanMatch/kanMatchPagination";
import api from "../../api/api";

/**
 * KanMatchPage — 공간 목록 화면 (API 연동, 매핑 제거)
 */

// 서버 응답 그대로 사용
export type KanItem = {
  id: number;
  owner: string;
  buildingImage: string;
  buildingPrice: number;
  region: string;
  tag: string;
  buildingName: string;
};

// 프론트 탭 → 백엔드 tag 매핑
const tagMap: Record<Tab, string> = {
  전체: "",
  "공유 오피스": "OFFICE_SPACE",
  "촬영 스튜디오": "PHOTO_STUDIO",
  "팝업 스토어": "POPUP_STORE",
  파티룸: "PARTY_ROOM",
  녹음실: "RECORDING_STUDIO",
  기타: "ETC",
};

// 한글 시/도 → 백엔드 region 매핑 (스웨거 표기)
const regionMap: Record<string, string> = {
  서울: "SEOUL",
  부산: "BUSAN",
  대구: "DAEGU",
  인천: "INCHEON",
  광주: "GWANGJU",
  대전: "DAEJEON",
  울산: "ULSAN",
  세종: "SEJONG",
  경기: "GYEONGGI",
  강원: "GANGWON",
  충북: "CHUNGBUK",
  충남: "CHUNGNAM",
  전북: "JEONBUK",
  전남: "JEONNAM",
  경북: "GYEONGBUK",
  경남: "GYEONGNAM",
  제주: "JEJU",
  전국: "",
};

const PAGE_SIZE = 15;

export default function KanMatchPage() {
  const [activeTab, setActiveTab] = useState<Tab>("전체");
  const [sido, setSido] = useState("전국");
  const [items, setItems] = useState<KanItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const region = useMemo(() => regionMap[sido] ?? undefined, [sido]);
  const tag = useMemo(() => tagMap[activeTab], [activeTab]);

  useEffect(() => {
    let canceled = false;

    const fetchBuildings = async () => {
      setLoading(true);
      setErrorText(null);
      try {
        const res = await api.get("/buildings", {
          params: {
            page: page - 1,
            size: PAGE_SIZE,
            region,
            tag,
          },
        });

        const data = res.data;
        console.log(data);

        if (!canceled) {
          setItems(data?.content ?? []);
          setTotalPages(Math.max(1, data?.totalPages ?? 1));
        }
      } catch (e: any) {
        if (!canceled) {
          const msg =
            e.response?.data?.message ||
            e.message ||
            "공간 목록을 불러오지 못했습니다.";
          setErrorText(msg);
          setItems([]);
          setTotalPages(1);
        }
      } finally {
        if (!canceled) setLoading(false);
      }
    };

    fetchBuildings();
    return () => {
      canceled = true;
    };
  }, [page, region, tag]);

  return (
    <div className={kanMatchStyle.kanMatchPageContainer}>
      <div className={kanMatchStyle.filterContainer}>
        <KanMatchFilter
          selected={sido}
          onSelect={(v) => {
            setSido(v);
            setPage(1);
          }}
          buttonLabel={sido}
        />
      </div>

      <KanMatchNavigation
        active={activeTab}
        onChange={(tab) => {
          setActiveTab(tab);
          setPage(1);
        }}
      />

      <section className={kanMatchStyle.listContainer}>
        {loading && <div>불러오는 중…</div>}
        {!loading && errorText && <div>{errorText}</div>}
        {!loading && !errorText && <KanMatchList items={items} />}
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
