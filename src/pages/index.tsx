import { Link } from "react-router-dom";
import indexVideo from "../assets/index.mp4"; // 동영상 파일 import
import indexStyle from "../css/style.module.css"; // CSS 모듈 import

export default function Index() {
  return (
    <div className={indexStyle.videoContainer}>
      <video className={indexStyle.video} autoPlay muted playsInline>
        <source src={indexVideo} type="video/mp4" />
      </video>
      <div className={indexStyle.content}>
        <Link to="/login" className={indexStyle.startButton}>
          시작하기
        </Link>
      </div>
    </div>
  );
}
