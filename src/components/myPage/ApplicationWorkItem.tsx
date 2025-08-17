import applicationWorkStyle from "../../css/components/applicationWork.module.css";
import StateIcon from "../StateIcon";

type Props = {
  title: string;
  price: string;
};

export default function ApplicationWorkItem({ title, price }: Props) {
  return (
    <div className={applicationWorkStyle.itemDiv}>
      <div className={applicationWorkStyle.itemInner}>
        <div className={applicationWorkStyle.itemTitle}>
          <span>{title}</span>
        </div>
        <StateIcon state="신청중" />
        <div className={applicationWorkStyle.priceDiv}>
          <span>{price}원</span>
        </div>
      </div>
    </div>
  );
}
