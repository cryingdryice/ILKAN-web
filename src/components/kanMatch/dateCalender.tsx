import { useState } from "react";
import styles from "../../css/components/kanMatch/dateCalender.module.css";
import { Link } from "react-router-dom";
import next from "../../assets/next.svg";
import prev from "../../assets/prev.svg";
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
    // 일요일(0)을 마지막 요일로, 월요일(1)을 첫 번째 요일로 설정
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

    const today = new Date();
    today.setHours(0, 0, 0, 0); // 오늘 날짜의 시간을 0으로 초기화

    const clickedDate = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate()
    );

    // ✅ 과거 날짜 클릭 방지 로직
    if (clickedDate.getTime() < today.getTime()) {
      return;
    }

    // 첫 번째 클릭: startDate와 endDate 모두 null일 때
    if (!startDate && !endDate) {
      setStartDate(clickedDate);
      onDateChange(clickedDate, null);
      return;
    }

    // 이미 시작일이 선택된 상태
    const normalizedStartDate = startDate
      ? new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
        )
      : null;

    if (normalizedStartDate) {
      if (clickedDate.getTime() === normalizedStartDate.getTime()) {
        alert("동일한 날짜에 입실/퇴실은 불가능합니다.");
        setStartDate(null);
        setEndDate(null);
        onDateChange(null, null);
      } else if (clickedDate.getTime() > normalizedStartDate.getTime()) {
        // 시작일보다 미래 날짜를 클릭하면 종료일로 설정/수정
        setEndDate(clickedDate);
        onDateChange(normalizedStartDate, clickedDate);
      } else {
        // 시작일보다 과거 날짜를 클릭하면 초기화
        alert("날짜 선택이 초기화되었습니다.");
        setStartDate(null);
        setEndDate(null);
        onDateChange(null, null);
      }
    }
  };

  const getDayClasses = (day: Date) => {
    const classes = [styles.day];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 오늘 날짜의 시간을 0으로 초기화
    const normDay = new Date(day).setHours(0, 0, 0, 0);
    const normStart = startDate
      ? new Date(startDate).setHours(0, 0, 0, 0)
      : null;
    const normEnd = endDate ? new Date(endDate).setHours(0, 0, 0, 0) : null;

    // ✅ 과거 날짜에 대한 클래스 추가
    if (normDay < today.getTime()) {
      classes.push(styles.pastDate);
    }

    if (normStart !== null && normEnd === null && normDay === normStart) {
      classes.push(styles.selected);
    }
    if (
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
    if (wd === 6) classes.push(styles.saturday);
    if (wd === 0) classes.push(styles.sunday);

    return classes.join(" ");
  };

  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
  const dates = generateDates();

  return (
    <div className={styles.rentalBox}>
      <div className={styles.rentalLabelBox}>예약날짜</div>
      <div className={styles.rentalCalender}>
        <div className={styles.calendarContainer}>
          <div className={styles.header}>
            <img
              src={prev}
              alt="이전"
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1
                  )
                )
              }
            />

            <span className={styles.monthYear}>
              {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
            </span>

            <img
              src={next}
              alt="다음"
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1
                  )
                )
              }
            />
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
                  {day && (
                    <span className={styles.dayNumber}>{day.getDate()}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
