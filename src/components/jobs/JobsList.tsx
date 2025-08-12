import jobsListStyle from "../../css/components/jobs/jobsList.module.css";
import type { WorkItem } from "../../pages/main/jobsPage";

type Props = {
  items: WorkItem[];
  className?: string;
};

export default function JobsList({ items, className }: Props) {
  return (
    <section className={`${jobsListStyle.grid} ${className ?? ""}`}>
      {items.map((item) => (
        <div key={item.id}>아이템</div>
      ))}
    </section>
  );
}
