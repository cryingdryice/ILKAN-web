import kanMatchPaginationStyle from "../../css/components/kanMatch/kanMatchPagination.module.css";

type Props = {
  current: number;
  total: number;
  onChange: (page: number) => void;
};

export default function KanMatchPagination({
  current,
  total,
  onChange,
}: Props) {
  const go = (p: number) => () => onChange(Math.min(Math.max(1, p), total));

  return (
    <nav className={kanMatchPaginationStyle.pageContainer}>
      <button
        onClick={go(current - 1)}
        disabled={current === 1}
        className={kanMatchPaginationStyle.arrow}
      >
        {"<"}
      </button>

      {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={go(p)}
          className={
            p === current
              ? `${kanMatchPaginationStyle.btn} ${kanMatchPaginationStyle.btnActive}`
              : kanMatchPaginationStyle.btn
          }
        >
          {p}
        </button>
      ))}

      <button
        onClick={go(current + 1)}
        disabled={current === total}
        className={kanMatchPaginationStyle.arrow}
      >
        {">"}
      </button>
    </nav>
  );
}
