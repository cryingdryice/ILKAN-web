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

function formatDate(dateStr?: string) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  const yy = String(date.getFullYear()).slice(2); // 뒤 2자리
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `~${yy}/${mm}/${dd}`;
}

export default function JobsRow({ item }: Props) {
  return (
    <Link to={`/main/jobs/${item.taskId}`}>
      <li className={rowStyle.row} role="row">
        <div className={rowStyle.left} role="cell">
          <h3 className={rowStyle.title} title={item.title}>
            {item.title}
          </h3>
        </div>

        <div className={rowStyle.center} role="cell">
          <span className={rowStyle.price}>{formatKRW(item.price)}</span>
        </div>

        <div className={rowStyle.right} role="cell">
          <time className={rowStyle.deadline}>{formatDate(item.taskEnd)}</time>
        </div>
      </li>
    </Link>
  );
}
