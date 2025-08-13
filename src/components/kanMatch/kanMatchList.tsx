import jobsListStyle from "../../css/components/jobs/jobsList.module.css";
import type { KanItem } from "../../pages/main/kanMatchPage";
import KanMatchItem from "./kanMatchItem";

type Props = {
  items: KanItem[];
};

export default function KanMatchList({ items }: Props) {
  return (
    <section className={`${jobsListStyle.grid}`}>
      {items.map((item) => (
        <KanMatchItem key={item.id} item={item} />
      ))}
    </section>
  );
}
