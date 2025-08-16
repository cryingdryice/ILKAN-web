import { useEffect, useState } from "react";
import progressStyle from "../../css/components/myPage/progressBar.module.css";

interface ProgressBarProps {
  taskStart: string;
  taskEnd: string;
}

export default function ProgressBar({ taskStart, taskEnd }: ProgressBarProps) {
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

    setProgress(progressPercentage);
  }, [taskStart, taskEnd]);

  return (
    <div className={progressStyle.progressBarContainer}>
      <div className={progressStyle.progressBar}>
        <div
          className={progressStyle.progressFill}
          style={{ width: `${progress}%` }}
        />
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
