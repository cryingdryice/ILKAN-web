import progressImg from "../assets/progress-icon.png";
import completeImg from "../assets/complete-icon.png";
import applicationImg from "../assets/application-icon.png";
import stateIconStyle from "../css/components/stateIcon.module.css";

type Props = {
  state: string;
};

export default function StateIcon({ state }: Props) {
  const img =
    state === "신청중"
      ? applicationImg
      : state === "완료됨"
      ? completeImg
      : progressImg;

  const bgColor =
    state === "신청중" ? "#A7A7A7" : state === "완료됨" ? "#95BBFF" : "#5290FF";

  return (
    <div
      className={stateIconStyle.checkDiv}
      style={{ backgroundColor: bgColor }}
    >
      <img src={img} alt={state} />
      <span>{state}</span>
    </div>
  );
}
