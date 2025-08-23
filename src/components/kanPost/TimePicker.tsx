// src/components/common/TimePicker.tsx
import TimeDropdown, { Opt } from "./TimeDropdown";

export type TimeValue = { ampm: "오전" | "오후"; hour: number; minute: number };

const AMPM: Opt[] = [
  { value: "오전", text: "오전" },
  { value: "오후", text: "오후" },
];

const HOURS_12: Opt[] = Array.from({ length: 12 }, (_, i) => {
  const h = i + 1; // 1~12
  return { value: h, text: `${h}시` };
});

function makeMinuteOptions(step = 10): Opt[] {
  return Array.from({ length: 60 / step }, (_, i) => {
    const m = i * step; // 0,10,20,30,40,50 ...
    return { value: m, text: `${String(m).padStart(2, "0")}분` };
  });
}

export function to24hString({ ampm, hour, minute }: TimeValue) {
  let h = hour % 12;
  if (ampm === "오후") h += 12;
  return `${String(h).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

export default function TimePicker({
  value,
  onChange,
  minuteStep = 10,
}: {
  value: TimeValue;
  onChange: (v: TimeValue) => void;
  minuteStep?: number;
}) {
  const minuteOptions = makeMinuteOptions(minuteStep);

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <TimeDropdown
        ariaLabel="오전/오후 선택"
        value={value.ampm}
        options={AMPM}
        onChange={(v) => onChange({ ...value, ampm: v as "오전" | "오후" })}
        width={72}
      />
      <TimeDropdown
        ariaLabel="시 선택"
        value={value.hour}
        options={HOURS_12}
        onChange={(v) => onChange({ ...value, hour: Number(v) })}
        width={72}
      />
      <TimeDropdown
        ariaLabel="분 선택"
        value={value.minute}
        options={minuteOptions}
        onChange={(v) => onChange({ ...value, minute: Number(v) })}
        width={88}
      />
    </div>
  );
}
