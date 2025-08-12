import jobsListStyle from "../../css/components/jobs/jobsList.module.css";
import type { WorkItem } from "../../pages/main/jobsPage";
import JobsItem from "./JobsItem";

type Props = {
  items: WorkItem[];
  className?: string;
};

export default function JobsList({ items, className }: Props) {
  return (
    <section className={`${jobsListStyle.grid} ${className ?? ""}`}>
      {items.map((item) => (
        <JobsItem key={item.id} item={item} />
      ))}
    </section>
  );
}
