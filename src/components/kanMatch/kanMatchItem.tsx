import kanMatchItemStyle from "../../css/components/kanMatch/kanMatchItem.module.css";
import type { KanItem } from "../../pages/main/kanMatchPage";
import { Link } from "react-router-dom";

type Props = { item: KanItem };

export default function KanMatchItem({ item }: Props) {
  return (
    <Link to={`/main/kanMatch/${item.id}`}>
      <article className={kanMatchItemStyle.card}>
        <div className={kanMatchItemStyle.thumb}>
          {item.buildingImage && (
            <img
              src={item.buildingImage}
              alt={item.buildingName}
              className={kanMatchItemStyle.img}
            />
          )}
        </div>

        <div className={kanMatchItemStyle.body}>
          <p className={kanMatchItemStyle.title} title={item.buildingName}>
            {item.buildingName}
            <p className={kanMatchItemStyle.address}>{item.buildingAddress}</p>
          </p>

          <div className={kanMatchItemStyle.meta}>
            {/* <span className={kanMatchItemStyle.dot} /> */}
            <span>{item.owner}</span>
          </div>

          <div className={kanMatchItemStyle.price}>
            일/{" "}
            <span>
              {item.buildingPrice != null
                ? `${item.buildingPrice.toLocaleString("ko-KR")}원`
                : "-"}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
