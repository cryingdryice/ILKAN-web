// StateIcon.jsx
import progressImg from "../assets/components/progress-icon.svg";
import applicationImg from "../assets/components/application-icon.svg";
import stateIconStyle from "../css/components/stateIcon.module.css";

type Props = {
  state: string;
};

export default function StateIcon({ state }: Props) {
  const img =
    state === "신청중"
      ? applicationImg
      : state === "진행중"
      ? progressImg
      : null; // '완료됨' 상태일 때 이미지가 없다고 가정

  const bgColor =
    state === "신청중"
      ? "#A7A7A7"
      : state === "진행중"
      ? "#5290FF"
      : "#00000000";

  return (
    <div
      className={stateIconStyle.checkDiv}
      style={{ backgroundColor: bgColor }}
    >
      {img && <img src={img} alt={state} />}
      <span>{state}</span>
    </div>
  );
}
