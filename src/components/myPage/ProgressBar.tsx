import { useEffect, useState } from "react";
import progressStyle from "../../css/components/myPage/progressBar.module.css";

interface ProgressBarProps {
  taskStart: string | null;
  taskEnd: string | null;
  onProgressChange: (progress: number) => void;
  performerReady: boolean;
}
export default function ProgressBar({
  performerReady,
  taskStart,
  taskEnd,
  onProgressChange,
}: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!taskStart || !taskEnd) return; // null이면 계산 스킵
    console.log(performerReady);
    const startDate = new Date(taskStart);
    const endDate = new Date(taskEnd);
    const today = new Date();

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsedDuration = today.getTime() - startDate.getTime();

    let progressPercentage = 0;
    if (totalDuration > 0) {
      progressPercentage = (elapsedDuration / totalDuration) * 100;
    }

    progressPercentage = Math.min(100, Math.max(0, progressPercentage));
    onProgressChange(progressPercentage);
    setProgress(progressPercentage);
  }, [taskStart, taskEnd]);

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

  return (
    <div className={progressStyle.progressBarContainer}>
      <div className={progressStyle.progressBar}>
        <div
          className={progressStyle.progressFill}
          style={{ width: `${progress}%` }}
        />
        {/* performerReady === true 일 때만 보여주기 */}
        {performerReady && (
          <div
            className={progressStyle.todayMapper}
            style={{ left: `${progress}%`, transform: transformStyle }}
          >
            <div className={progressStyle.todayDate}>{formattedToday}</div>
            <div className={progressStyle.todayText}>TODAY</div>
          </div>
        )}
      </div>
      <div className={progressStyle.dateLabels}>
        <span className={progressStyle.startDate}>
          {taskStart
            ? taskStart.substring(0, 10).substring(5).replace("-", "/")
            : "-"}
        </span>
        <span className={progressStyle.endDate}>
          {taskEnd
            ? taskEnd.substring(0, 10).substring(5).replace("-", "/")
            : "-"}
        </span>
      </div>
    </div>
  );
}
