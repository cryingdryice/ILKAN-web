import kanMatchListStyle from "../../css/components/kanMatch/kanMatchList.module.css";
import type { KanItem } from "../../pages/main/kanMatchPage";
import KanMatchItem from "./kanMatchItem";

type Props = {
  items: KanItem[];
};

export default function KanMatchList({ items }: Props) {
  return (
    <section className={`${kanMatchListStyle.grid}`}>
      {items.map((item) => (
        <KanMatchItem key={item.id} item={item} />
      ))}
    </section>
  );
}
