import { Link } from "react-router-dom";
import applicationWorkStyle from "../../css/components/myPage/applicationWork.module.css";
import StateIcon from "../StateIcon";

type Props = {
  item: Items | null;
  role: string | null;
  formattedDate: string | null;
};
interface Items {
  taskId: number;
  title: string;
  price: number;
  recruitmentPeriod: string;
}
export default function ApplicationWorkItem({
  item,
  role,
  formattedDate,
}: Props) {
  return (
    <Link
      to={`/main/jobs/${item?.taskId}`}
      key={item?.taskId}
      className={applicationWorkStyle.itemContainer}
    >
      <span className={applicationWorkStyle.itemTitle}>{item?.title}</span>
      <span className={applicationWorkStyle.price}>
        {`${item?.price.toLocaleString()}원~`}
      </span>
      <span className={applicationWorkStyle.date}>~{formattedDate}</span>
    </Link>
  );
}
