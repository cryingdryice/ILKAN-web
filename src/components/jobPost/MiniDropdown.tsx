import { useEffect, useMemo, useRef, useState } from "react";
import styles from "../../css/components/jobPost/miniDropdown.module.css";

export type Opt = { value: number | string; text: string };

export default function MiniDropdown({
  value,
  options,
  onChange,
  ariaLabel,
}: {
  value: number | string;
  options: Opt[];
  onChange: (v: number | string) => void;
  ariaLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = useMemo(
    () => options.find((o) => o.value === value) ?? options[0],
    [options, value]
  );

  // 외부 클릭 닫기
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <div className={styles.wrap} ref={ref}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        className={`${styles.trigger} ${open ? styles.open : ""}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.value}>{selected?.text}</span>
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
        <ul className={styles.menu}>
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
