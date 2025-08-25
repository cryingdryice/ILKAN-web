import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import kanMatchStyle from "../../css/pages/kanMatchPage.module.css";
import KanMatchNavigation, {
  Tab,
} from "../../components/kanMatch/kanMatchNavigation";
import KanMatchList from "../../components/kanMatch/kanMatchList";
import KanMatchFilter from "../../components/kanMatch/kanMatchFilter";
import KanMatchPagination from "../../components/kanMatch/kanMatchPagination";
import api from "../../api/api";
import { useLoading } from "../../context/LoadingContext"; // ⬅️ 전역 로딩

/**
 * KanMatchPage — 공간 목록 화면 (URL 쿼리 기반 필터/페이징)
 */

export type KanItem = {
  id: number;
  owner: string;
  buildingImage: string;
  buildingPrice: number;
  region: string;
  tag: string;
  buildingName: string;
  buildingAddress: string;
};

// 프론트 탭 ↔ 백엔드 tag 매핑 (양방향)
const TAB_TO_TAG: Record<Tab, string> = {
  전체: "",
  "공유 오피스": "OFFICE_SPACE",
  "촬영 스튜디오": "PHOTO_STUDIO",
  "팝업 스토어": "POPUP_STORE",
  파티룸: "PARTY_ROOM",
  녹음실: "RECORDING_STUDIO",
  기타: "ETC",
};
const TAG_TO_TAB: Record<string, Tab> = {
  "": "전체",
  OFFICE_SPACE: "공유 오피스",
  PHOTO_STUDIO: "촬영 스튜디오",
  POPUP_STORE: "팝업 스토어",
  PARTY_ROOM: "파티룸",
  RECORDING_STUDIO: "녹음실",
  ETC: "기타",
};

// 시/도 라벨 ↔ 백엔드 region 매핑 (양방향)
const REGION_LABEL_TO_ENUM: Record<string, string> = {
  전국: "",
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
};
const REGION_ENUM_TO_LABEL: Record<string, string> = {
  "": "전국",
  SEOUL: "서울",
  BUSAN: "부산",
  DAEGU: "대구",
  INCHEON: "인천",
  GWANGJU: "광주",
  DAEJEON: "대전",
  ULSAN: "울산",
  SEJONG: "세종",
  GYEONGGI: "경기",
  GANGWON: "강원",
  CHUNGBUK: "충북",
  CHUNGNAM: "충남",
  JEONBUK: "전북",
  JEONNAM: "전남",
  GYEONGBUK: "경북",
  GYEONGNAM: "경남",
  JEJU: "제주",
};

const PAGE_SIZE = 15;

export default function KanMatchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ===== URL → 파생 상태 =====
  const tagEnum = (searchParams.get("tag") ?? "") as keyof typeof TAG_TO_TAB;
  const regionEnum = searchParams.get("region") ?? "";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  const activeTab: Tab = useMemo(
    () => TAG_TO_TAB[tagEnum] ?? "전체",
    [tagEnum]
  );
  const sidoLabel = useMemo(
    () => REGION_ENUM_TO_LABEL[regionEnum] ?? "전국",
    [regionEnum]
  );

  // ===== 화면 데이터 상태 =====
  const [items, setItems] = useState<KanItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [errorText, setErrorText] = useState<string | null>(null);

  const { setLoading } = useLoading(); // ⬅️ 전역 로딩 제어

  // ===== 공통 쿼리 갱신 함수 =====
  const updateParams = (next: {
    tag?: string;
    region?: string;
    page?: number;
  }) => {
    const sp = new URLSearchParams(searchParams);

    if (next.tag !== undefined) {
      if (next.tag) sp.set("tag", next.tag);
      else sp.delete("tag"); // 전체 → 파라미터 제거
      sp.set("page", "1"); // 태그 변경 시 페이지 리셋
    }

    if (next.region !== undefined) {
      if (next.region) sp.set("region", next.region);
      else sp.delete("region"); // 전국 → 파라미터 제거
      sp.set("page", "1"); // 지역 변경 시 페이지 리셋
    }

    if (next.page !== undefined) {
      sp.set("page", String(next.page));
    }

    setSearchParams(sp);
  };

  // ===== 데이터 페치 (URL 변화에 반응) =====
  useEffect(() => {
    const controller = new AbortController();

    const fetchBuildings = async () => {
      setLoading(true); // ⬅️ 전역 스피너 ON
      setErrorText(null);
      try {
        const params: Record<string, any> = {
          page: page - 1,
          size: PAGE_SIZE,
        };
        if (tagEnum) params.tag = tagEnum;
        if (regionEnum) params.region = regionEnum;

        const res = await api.get("/buildings", {
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
          "공간 목록을 불러오지 못했습니다.";
        setErrorText(msg);
        setItems([]);
        setTotalPages(1);
      } finally {
        setLoading(false); // ⬅️ 전역 스피너 OFF
      }
    };

    fetchBuildings();
    return () => controller.abort();
  }, [tagEnum, regionEnum, page, setLoading]);

  return (
    <div className={kanMatchStyle.kanMatchPageContainer}>
      <div className={kanMatchStyle.filterContainer}>
        <KanMatchFilter
          selected={sidoLabel}
          onSelect={(label) => {
            const region = REGION_LABEL_TO_ENUM[label] ?? "";
            updateParams({ region });
          }}
          buttonLabel={sidoLabel}
        />
      </div>

      <KanMatchNavigation
        active={activeTab}
        onChange={(tab) => {
          const nextTag = TAB_TO_TAG[tab] ?? "";
          updateParams({ tag: nextTag });
        }}
      />

      <section className={kanMatchStyle.listContainer}>
        {errorText && <div>{errorText}</div>}
        {!errorText && <KanMatchList items={items} />}
      </section>

      <footer>
        {totalPages > 1 && (
          <KanMatchPagination
            current={page}
            total={totalPages}
            onChange={(p) => updateParams({ page: p })}
          />
        )}
      </footer>
    </div>
  );
}
