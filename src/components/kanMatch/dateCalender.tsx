import { useState } from "react";
import styles from "../../css/components/kanMatch/dateCalender.module.css";

interface DateCalendarProps {
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
}

export default function DateCalendar({ onDateChange }: DateCalendarProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const generateDates = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dates: (Date | null)[] = [];
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = 0; i < offset; i++) {
      dates.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(new Date(year, month, i));
    }
    return dates;
  };

  const handleDayClick = (day: Date | null) => {
    if (!day) return;
    const clickedDate = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate()
    );

    // ✅ 시작일과 종료일이 모두 선택된 상태에서 다시 클릭하면 초기화하고 하루만 선택
    if (startDate && endDate) {
      setStartDate(clickedDate);
      setEndDate(clickedDate);
      onDateChange(clickedDate, clickedDate);
      return;
    }

    // ✅ 첫 번째 날짜 선택 시 시작일과 종료일 모두에 할당하여 하루만 선택한 것으로 처리
    if (!startDate) {
      setStartDate(clickedDate);
      setEndDate(clickedDate);
      onDateChange(clickedDate, clickedDate);
      return;
    }

    // ✅ 두 번째 날짜 선택 (시작일보다 과거를 선택하면 초기화)
    if (clickedDate.getTime() < startDate.getTime()) {
      setStartDate(clickedDate);
      setEndDate(clickedDate);
      onDateChange(clickedDate, clickedDate);
      return;
    }

    // ✅ 두 번째 날짜 선택 (시작일과 같거나 미래를 선택하면 종료일로 설정)
    if (clickedDate.getTime() >= startDate.getTime()) {
      setEndDate(clickedDate);
      onDateChange(startDate, clickedDate);
    }
  };

  const getDayClasses = (day: Date) => {
    const classes = [styles.day];
    const normDay = new Date(day).setHours(0, 0, 0, 0);
    const normStart = startDate
      ? new Date(startDate).setHours(0, 0, 0, 0)
      : null;
    const normEnd = endDate ? new Date(endDate).setHours(0, 0, 0, 0) : null;

    // ✅ 시작일과 종료일이 같을 경우 (한 날짜만 선택)
    if (
      normStart !== null &&
      normEnd !== null &&
      normStart === normEnd &&
      normDay === normStart
    ) {
      classes.push(styles.selected);
    }
    // 시작일만 선택되었을 경우
    else if (normStart !== null && normEnd === null && normDay === normStart) {
      classes.push(styles.selected);
    }
    // 시작일과 종료일이 다를 경우 (범위 선택)
    else if (
      normStart !== null &&
      normEnd !== null &&
      normDay >= normStart &&
      normDay <= normEnd
    ) {
      classes.push(styles.inRange);
      if (normDay === normStart) classes.push(styles.start);
      if (normDay === normEnd) classes.push(styles.end);
    }

    const wd = day.getDay();
    if (wd === 6) classes.push(styles.saturday); // 토요일
    if (wd === 0) classes.push(styles.sunday); // 일요일

    return classes.join(" ");
  };

  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
  const dates = generateDates();

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.header}>
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
            )
          }
        >
          {"<"}
        </button>
        <span className={styles.monthYear}>
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </span>
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
            )
          }
        >
          {">"}
        </button>
      </div>
      <div className={styles.calendar}>
        <div className={styles.weekDays}>
          {weekDays.map((wd, i) => (
            <div
              key={i}
              className={`${styles.weekDay} ${
                wd === "S" && i === 5
                  ? styles.saturday
                  : wd === "S" && i === 6
                  ? styles.sunday
                  : ""
              }`}
            >
              {wd}
            </div>
          ))}
        </div>
        <div className={styles.days}>
          {dates.map((day, idx) => (
            <div
              key={idx}
              className={
                day ? getDayClasses(day) : `${styles.day} ${styles.empty}`
              }
              onClick={() => handleDayClick(day)}
            >
              {day && <span className={styles.dayNumber}>{day.getDate()}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
