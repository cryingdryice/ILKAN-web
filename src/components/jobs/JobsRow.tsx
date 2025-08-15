import { Link } from "react-router-dom";
import rowStyle from "../../css/components/jobs/jobsRow.module.css";
import type { WorkItem } from "../../pages/main/jobsPage";

type Props = { item: WorkItem };

function formatKRW(v?: string | number) {
  if (v === undefined || v === null) return "-";
  const n = typeof v === "number" ? v : Number(String(v).replace(/[^\d]/g, ""));
  if (Number.isNaN(n)) return String(v);
  return `${n.toLocaleString("ko-KR")}원~`;
}

export default function JobsRow({ item }: Props) {
  return (
    <Link to={`/main/jobs/${item.id}`}>
      <li className={rowStyle.row} role="row">
        <div className={rowStyle.left} role="cell">
          <div className={rowStyle.subMeta}>
            {item.writer ? `${item.writer}` : ""}
          </div>

          <h3 className={rowStyle.title} title={item.title}>
            {item.title}
          </h3>
        </div>

        <div className={rowStyle.center} role="cell">
          <span className={rowStyle.price}>{formatKRW(item.price)}</span>
        </div>

        <div className={rowStyle.right} role="cell">
          <time className={rowStyle.deadline}>{item.deadline ?? "-"}</time>
        </div>
      </li>
    </Link>
  );
}
