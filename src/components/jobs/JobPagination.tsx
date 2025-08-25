import jobPaginationStyle from "../../css/components/jobs/jobPagination.module.css";

type Props = {
  current: number;
  total: number;
  onChange: (page: number) => void;
};

export default function JobPagination({ current, total, onChange }: Props) {
  const go = (p: number) => () => onChange(Math.min(Math.max(1, p), total));

  return (
    <nav className={jobPaginationStyle.pageContainer}>
      <button
        onClick={go(current - 1)}
        disabled={current === 1}
        className={jobPaginationStyle.arrow}
      >
        {"<"}
      </button>

      {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={go(p)}
          className={
            p === current
              ? `${jobPaginationStyle.btn} ${jobPaginationStyle.btnActive}`
              : jobPaginationStyle.btn
          }
        >
          {p}
        </button>
      ))}

      <button
        onClick={go(current + 1)}
        disabled={current === total}
        className={jobPaginationStyle.arrow}
      >
        {">"}
      </button>
    </nav>
  );
}
