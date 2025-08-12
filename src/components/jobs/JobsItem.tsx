// 파일명: JobsItem.tsx

// ★ react-router-dom에서 Link 컴포넌트를 임포트합니다.
import { Link } from "react-router-dom";
import jobsItemStyle from "../../css/components/jobs/jobsItem.module.css";
import type { WorkItem } from "../../pages/main/jobsPage";

type Props = { item: WorkItem };

export default function JobsItem({ item }: Props) {
  return (
    // ★ <Link> 컴포넌트로 <article> 전체를 감쌉니다.
    // to 속성에 이동할 경로를 지정하고, 각 카드의 id를 넣어주면 됩니다.
    <Link to={`/main/jobs/${item.id}`}>
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
    </Link>
  );
}
