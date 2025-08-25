import kanMatchNavigationStyle from "../../css/components/kanMatch/kanMatchNavigation.module.css";

// 고정 타입들
export const TABS = [
  "전체",
  "공유 오피스",
  "촬영 스튜디오",
  "팝업 스토어",
  "파티룸",
  "녹음실",
  "기타",
] as const;
export type Tab = (typeof TABS)[number];

type Props = {
  tabs?: readonly Tab[];
  active: Tab;
  onChange: (tab: Tab) => void;
};

export default function KanMatchNavigation({
  tabs = TABS,
  active,
  onChange,
}: Props) {
  return (
    <nav className={`${kanMatchNavigationStyle.tabs}`}>
      <div className={kanMatchNavigationStyle.tabWrapper}>
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            tabIndex={active === tab ? 0 : -1}
            onClick={() => onChange(tab)}
            className={`${kanMatchNavigationStyle.tab} ${
              active === tab ? kanMatchNavigationStyle.active : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
}
