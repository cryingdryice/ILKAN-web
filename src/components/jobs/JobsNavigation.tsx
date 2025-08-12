import jobsNavigationStyle from "../../css/components/jobs/jobsNavigation.module.css";

export const TABS = ["디자인", "사진/영상", "개발", "법률", "기타"] as const;
export type Tab = (typeof TABS)[number];

type Props = {
  tabs?: readonly Tab[];
  active: Tab;
  onChange: (tab: Tab) => void;
  className?: string; // 필요시 추가 클래스 전달
};

export default function JobsNavigation({
  tabs = TABS,
  active,
  onChange,
  className,
}: Props) {
  return (
    <nav
      className={`${jobsNavigationStyle.tabs} ${className ?? ""}`}
      role="tablist"
      aria-label="카테고리"
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          role="tab"
          aria-selected={active === tab}
          tabIndex={active === tab ? 0 : -1}
          onClick={() => onChange(tab)}
          className={`${jobsNavigationStyle.tab} ${
            active === tab ? jobsNavigationStyle.active : ""
          }`}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}
