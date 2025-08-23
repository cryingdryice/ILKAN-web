// src/components/common/TimeDropdown.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "../../css/components/kanPost/timeDropdown.module.css";

export type Opt = { value: number | string; text: string };

type Props = {
  value?: number | string;
  options: Opt[];
  onChange: (v: number | string) => void;
  ariaLabel?: string;
  placeholder?: string;
  width?: number | string; // 예: 72 또는 "88px"
};

export default function TimeDropdown({
  value,
  options,
  onChange,
  ariaLabel,
  placeholder = "선택",
  width,
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(
    () => options.find((o) => o.value === value),
    [options, value]
  );

  // 외부 클릭/ESC 닫기
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      className={styles.wrap}
      ref={wrapRef}
      style={width ? { width } : undefined}
    >
      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        className={`${styles.trigger} ${open ? styles.open : ""}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={`${styles.value} ${!selected ? styles.placeholder : ""}`}
        >
          {selected?.text ?? placeholder}
        </span>
        <svg
          className={styles.chev}
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.28571 1.14283L7.23809 7.09521L13.1905 1.14283"
            stroke="#092F63"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul className={styles.menu} role="listbox" aria-label={ariaLabel}>
          {options.map((o) => {
            const sel = o.value === selected?.value;
            return (
              <li
                key={o.value}
                className={`${styles.item} ${sel ? styles.selected : ""}`}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                aria-selected={sel}
              >
                {o.text}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
