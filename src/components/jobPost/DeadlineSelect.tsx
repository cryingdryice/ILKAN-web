import { useState } from "react";
import styles from "../../css/components/jobPost/deadlineSelect.module.css";

export default function DeadlineSelect({
  name = "deadline",
  onChange,
}: {
  name?: string;
  onChange?: (date: string) => void;
}) {
  const now = new Date();
  const currentYear = now.getFullYear();

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [day, setDay] = useState(now.getDate());

  // 연도 옵션 (예: 올해 ~ 5년 뒤까지)
  const years = Array.from({ length: 6 }, (_, i) => currentYear + i);

  // 월 옵션
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // 해당 월의 마지막 날짜 계산
  const daysInMonth = new Date(year, month, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleChange = (type: "year" | "month" | "day", value: number) => {
    if (type === "year") setYear(value);
    if (type === "month") setMonth(value);
    if (type === "day") setDay(value);

    const newDate = new Date(
      type === "year" ? value : year,
      type === "month" ? value - 1 : month - 1,
      type === "day" ? value : day
    );
    const formatted = newDate.toISOString().split("T")[0]; // yyyy-mm-dd
    onChange?.(formatted);
  };

  return (
    <div className={styles.deadlineWrapper}>
      <select
        value={year}
        onChange={(e) => handleChange("year", Number(e.target.value))}
        className={styles.select}
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y} 년
          </option>
        ))}
      </select>

      <select
        value={month}
        onChange={(e) => handleChange("month", Number(e.target.value))}
        className={styles.select}
      >
        {months.map((m) => (
          <option key={m} value={m}>
            {m} 월
          </option>
        ))}
      </select>

      <select
        value={day}
        onChange={(e) => handleChange("day", Number(e.target.value))}
        className={styles.select}
      >
        {days.map((d) => (
          <option key={d} value={d}>
            {d} 일
          </option>
        ))}
      </select>

      <input
        type="hidden"
        name={name}
        value={`${year}-${String(month).padStart(2, "0")}-${String(
          day
        ).padStart(2, "0")}`}
      />
    </div>
  );
}
