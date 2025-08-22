// src/components/common/AddressDropdown.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "../../css/components/kanPost/addressDropdown.module.css";
import UpdownArrowIcon from "../icons/UpdownArrowIcon";
import CheckIcon from "../icons/CheckIcon";

type Props = {
  options: string[];
  value?: string;
  onChange: (v: string | undefined) => void;
  placeholder?: string;
  columns?: number; // 기본 4열
};

export default function AddressDropdown({
  options,
  value,
  onChange,
  placeholder = "지역을 선택해주세요",
  columns = 4,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // ✅ 선택 여부는 value 존재로 판단
  const hasValue = !!value;

  // N열로 분배
  const cols = useMemo(() => {
    const res: string[][] = Array.from({ length: columns }, () => []);
    options.forEach((opt, i) => res[i % columns].push(opt));
    return res;
  }, [options, columns]);

  // 외부 클릭/ESC
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        type="button"
        className={`${styles.trigger} ${open ? styles.open : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span
          className={`${styles.value} ${!hasValue ? styles.placeholder : ""}`}
        >
          {value || placeholder}
        </span>
        <span className={styles.chev}>
          <UpdownArrowIcon />
        </span>
      </button>

      <div className={`${styles.panel} ${open ? styles.show : ""}`}>
        <div className={styles.cols} role="listbox" aria-label="regions">
          {cols.map((col, i) => (
            <ul key={i} className={styles.col}>
              {col.map((opt) => {
                const isSelected = opt === value; // ✅ 여기서만 선택 비교
                return (
                  <li key={opt}>
                    <button
                      type="button"
                      className={`${styles.item} ${
                        isSelected ? styles.selected : ""
                      }`}
                      onClick={() => {
                        onChange(opt);
                        setOpen(false);
                      }}
                      aria-selected={isSelected}
                    >
                      {opt}
                      {isSelected && (
                        <span className={styles.check}>
                          <CheckIcon />
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
