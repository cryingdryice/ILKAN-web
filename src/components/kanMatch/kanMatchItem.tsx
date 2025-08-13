import jobsItemStyle from "../../css/components/jobs/jobsItem.module.css";
import type { KanItem } from "../../pages/main/kanMatchPage";

type Props = { item: KanItem };

export default function KanMatchItem({ item }: Props) {
  return (
    <article className={jobsItemStyle.card}>
      <div className={jobsItemStyle.thumb}>
        {item.image && <img src={item.image} className={jobsItemStyle.img} />}
      </div>

      <div className={jobsItemStyle.body}>
        <h3 className={jobsItemStyle.title} title={item.title}>
          {item.title}
        </h3>

        <div className={jobsItemStyle.meta}>
          <span className={jobsItemStyle.dot} />
          <span>{item.writer}</span>
        </div>

        <div className={jobsItemStyle.price}>{item.price}</div>
      </div>
    </article>
  );
}
