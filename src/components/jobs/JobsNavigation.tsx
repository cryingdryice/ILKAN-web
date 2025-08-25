import jobsNavigationStyle from "../../css/components/jobs/jobsNavigation.module.css";

// 고정 타입들
export const TABS = [
  "전체",
  "디자인",
  "사진/영상",
  "개발",
  "법률",
  "기타",
] as const;
export type Tab = (typeof TABS)[number];

type Props = {
  tabs?: readonly Tab[];
  active: Tab;
  onChange: (tab: Tab) => void;
};

export default function JobsNavigation({
  tabs = TABS,
  active,
  onChange,
}: Props) {
  return (
    <nav className={`${jobsNavigationStyle.tabs}`}>
      <div className={jobsNavigationStyle.tabWrapper}>
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            tabIndex={active === tab ? 0 : -1}
            onClick={() => onChange(tab)}
            className={`${jobsNavigationStyle.tab} ${
              active === tab ? jobsNavigationStyle.active : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
}
