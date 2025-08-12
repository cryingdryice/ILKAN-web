import jobsListStyle from "../../css/components/jobs/jobsList.module.css";
import type { WorkItem } from "../../pages/main/jobsPage";
import JobsItem from "./JobsItem";

type Props = {
  items: WorkItem[];
};

export default function JobsList({ items }: Props) {
  return (
    <section className={`${jobsListStyle.grid}`}>
      {items.map((item) => (
        <JobsItem key={item.id} item={item} />
      ))}
    </section>
  );
}
