// JobsList.tsx
import jobsListStyle from "../../css/components/jobs/jobsList.module.css";
import type { WorkItem } from "../../pages/main/jobsPage";
import JobsRow from "../jobs/JobsRow";

type Props = { items: WorkItem[] };

export default function JobsList({ items }: Props) {
  return (
    <section className={jobsListStyle.listContainer}>
      {/* 헤더 */}
      <header className={jobsListStyle.head} role="row">
        <div className={jobsListStyle.headColLeft}>기업명/ 공고</div>
        <div className={jobsListStyle.headColCenter}>보수</div>
        <div className={jobsListStyle.headColRight}>기한</div>
      </header>

      {/* 행 */}
      {items.map((item) => (
        <JobsRow key={item.id} item={item} />
      ))}
    </section>
  );
}
