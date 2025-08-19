import { useEffect, useState } from "react";
import progressStyle from "../../css/components/myPage/progressBar.module.css";

interface ProgressBarProps {
  taskStart: string;
  taskEnd: string;
  onProgressChange: (progress: number) => void;
}

export default function ProgressBar({
  taskStart,
  taskEnd,
  onProgressChange,
}: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startDate = new Date(taskStart);
    const endDate = new Date(taskEnd);
    const today = new Date();

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // 총 기간
    const totalDuration = endDate.getTime() - startDate.getTime();
    // 오늘까지의 기간
    const elapsedDuration = today.getTime() - startDate.getTime();

    let progressPercentage = 0;
    if (totalDuration > 0) {
      progressPercentage = (elapsedDuration / totalDuration) * 100;
    }

    // 진행률이 100%를 초과하지 않도록 보정
    progressPercentage = Math.min(100, Math.max(0, progressPercentage));
    console.log("진행률:", progressPercentage);
    onProgressChange(progressPercentage);
    setProgress(progressPercentage);
  }, [taskStart, taskEnd]);

  // TODAY 라벨에 표시될 날짜 포맷
  const formattedToday = new Date()
    .toLocaleDateString("ko-KR", { month: "numeric", day: "numeric" })
    .replace(/\s/g, "")
    .replace(/\./g, "/")
    .slice(0, -1);

  const transformStyle =
    progress === 0
      ? "translateX(0)"
      : progress >= 100
      ? "translateX(-100%)"
      : "translateX(-50%)";
  // console.log("오늘 날짜:", formattedToday);
  // const dateStyle =
  //   formattedToday === taskStart.substring(5).replace("-", "/")
  //     ? "0"
  //     : formattedToday === taskEnd.substring(5).replace("-", "/")
  //     ? "0"
  //     : "0";
  return (
    <div className={progressStyle.progressBarContainer}>
      <div className={progressStyle.progressBar}>
        <div
          className={progressStyle.progressFill}
          style={{ width: `${progress}%` }}
        />
        <div
          className={progressStyle.todayMapper}
          style={{ left: `${progress}%`, transform: transformStyle }}
        >
          <div className={progressStyle.todayDate}>{formattedToday}</div>
          <div className={progressStyle.todayText}>TODAY</div>
        </div>
      </div>
      <div className={progressStyle.dateLabels}>
        <span className={progressStyle.startDate}>
          {taskStart.substring(5).replace("-", "/")}
        </span>
        <span className={progressStyle.endDate}>
          {taskEnd.substring(5).replace("-", "/")}
        </span>
      </div>
    </div>
  );
}
