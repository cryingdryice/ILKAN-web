// StateIcon.jsx
import progressImg from "../assets/components/progress-icon.svg";
import applicationImg from "../assets/components/application-icon.svg";
import completeImg from "../assets/components/complete-icon.svg";
import blueProgressImg from "../assets/components/blueProgress-icon.svg";
import stateIconStyle from "../css/components/stateIcon.module.css";

type Props = {
  state: string;
  evaluation: boolean;
};

export default function StateIcon({ state, evaluation }: Props) {
  const containerClass = `${stateIconStyle.checkDiv} ${
    evaluation ? stateIconStyle.ownerStyle : ""
  }`;

  const img =
    state === "신청중" || state === "심사 신청"
      ? applicationImg
      : state === "진행중"
      ? progressImg
      : state === "심사중"
      ? blueProgressImg
      : completeImg;

  const bgColor =
    state === "신청중"
      ? "#A7A7A7"
      : state === "진행중" || state === "심사 완료"
      ? "#5290FF"
      : state === "심사 신청"
      ? "#808080"
      : "#ffffff";

  const fontColor = state === "심사중" ? "#5290FF" : "#ffffff";
  const margin = state === "심사중" ? "12px" : "";

  return (
    <div className={containerClass} style={{ backgroundColor: bgColor }}>
      {img && <img src={img} alt={state} style={{ fill: fontColor }} />}
      <span style={{ color: fontColor, marginLeft: margin }}>{state}</span>
    </div>
  );
}
