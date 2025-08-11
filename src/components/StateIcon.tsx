import progressImg from "../assets/progress-icon.png";
import completeImg from "../assets/complete-icon.png";
import applicationImg from "../assets/application-icon.png";
import stateIconStyle from "../css/components/stateIcon.module.css";
import { useEffect, useState } from "react";

type Props = {
  state: string;
};

export default function StateIcon({ state }: Props) {
  const [img, setImg] = useState(progressImg);
  useEffect(() => {
    if (state === "신청중") {
      setImg(applicationImg);
    } else if (state === "완료됨") {
      setImg(completeImg);
    } else {
      setImg(progressImg);
    }
  }, [state]);
  return (
    <div className={stateIconStyle.checkDiv}>
      <img src={img} />
      <span>{state}</span>
    </div>
  );
}
