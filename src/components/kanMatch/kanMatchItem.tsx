import kanMatchItemStyle from "../../css/components/kanMatch/kanMatchItem.module.css";
import type { KanItem } from "../../pages/main/kanMatchPage";

type Props = { item: KanItem };

export default function KanMatchItem({ item }: Props) {
  return (
    <article className={kanMatchItemStyle.card}>
      <div className={kanMatchItemStyle.thumb}>
        {item.image && (
          <img src={item.image} className={kanMatchItemStyle.img} />
        )}
      </div>

      <div className={kanMatchItemStyle.body}>
        <h3 className={kanMatchItemStyle.title} title={item.title}>
          {item.title}
        </h3>

        <div className={kanMatchItemStyle.meta}>
          <span className={kanMatchItemStyle.dot} />
          <span>{item.writer}</span>
        </div>

        <div className={kanMatchItemStyle.price}>
          일/ <span>{item.price}</span>
        </div>
      </div>
    </article>
  );
}
