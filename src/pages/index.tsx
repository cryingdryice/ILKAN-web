import { Link } from "react-router-dom";
import indexVideo from "../assets/index.mp4";
import indexStyle from "../css/style.module.css";
import { useEffect, useState } from "react";

export default function Index() {
  const [shouldRenderLink, setShouldRenderLink] = useState(false);
  const [animateLink, setAnimateLink] = useState(false);

  useEffect(() => {
    const renderTimer = setTimeout(() => {
      setShouldRenderLink(true);

      const animateTimer = setTimeout(() => {
        setAnimateLink(true);
      }, 50);

      return () => clearTimeout(animateTimer);
    }, 7000);
    return () => clearTimeout(renderTimer);
  }, []);

  return (
    <div className={indexStyle.videoContainer}>
      <video className={indexStyle.video} autoPlay muted playsInline>
        <source src={indexVideo} type="video/mp4" />
      </video>

      {shouldRenderLink && (
        <div className={indexStyle.content}>
          <Link
            to="/login"
            className={`${indexStyle.startButton} ${
              animateLink ? indexStyle.show : ""
            }`}
          >
            시작하기
          </Link>
        </div>
      )}
    </div>
  );
}
