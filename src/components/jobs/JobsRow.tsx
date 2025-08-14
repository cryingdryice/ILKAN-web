// JobsRow.tsx
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
    <li className={rowStyle.row} role="row">
      {/* 왼쪽: 기업/공고 */}
      <div className={rowStyle.left} role="cell">
        {/* 소제목: 작성자/기업유형 자리 (작게, 회색) */}
        <div className={rowStyle.subMeta}>
          {/* 예시: (개인 사업자) 대신 writer를 사용 */}
          {item.writer ? `(${item.writer})` : ""}
        </div>

        {/* 타이틀 한 줄 말줄임 */}
        <h3 className={rowStyle.title} title={item.title}>
          {item.title}
        </h3>
      </div>

      {/* 가운데: 보수 */}
      <div className={rowStyle.center} role="cell">
        <span className={rowStyle.price}>{formatKRW(item.price)}</span>
      </div>

      {/* 오른쪽: 기한 (예: ~25/08/30) */}
      <div className={rowStyle.right} role="cell">
        <time className={rowStyle.deadline}>{item.deadline ?? "-"}</time>
      </div>
    </li>
  );
}
