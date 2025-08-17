import { useEffect, useRef, useState } from "react";
import styles from "../../css/components/jobPost/categoryDropdown.module.css";

type Option = {
  value: string;
  label: string;
  desc?: string;
};

type Props = {
  options: Option[];
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (v: string, opt: Option) => void;
};

export default function CategoryDropdown({
  options,
  value,
  placeholder = "카테고리를 선택하세요",
  disabled,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const selectOpt = (opt: Option) => {
    onChange?.(opt.value, opt);
    setOpen(false);
  };

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        type="button"
        className={`${styles.trigger} ${open ? styles.open : ""}`}
        onClick={() => !disabled && setOpen((v) => !v)}
        disabled={disabled}
      >
        <div className={styles.triggerInner}>
          <span
            className={`${styles.value} ${!selected ? styles.placeholder : ""}`}
          >
            {selected ? selected.label : placeholder}
          </span>
        </div>
        <svg
          className={styles.chevron}
          width="19"
          height="10"
          viewBox="0 0 19 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 9.33334L9.33334 1L17.6667 9.33334"
            stroke="#092F63"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul className={styles.menu} style={{ overflow: "auto" }} role="listbox">
          {options.map((opt) => {
            const isSelected = value === opt.value;
            return (
              <li
                key={opt.value}
                role="option"
                className={`${styles.item} ${
                  isSelected ? styles.selected : ""
                }`}
                onClick={() => selectOpt(opt)}
              >
                <div className={styles.texts}>
                  <div className={styles.labelRow}>
                    <span className={styles.itemLabel}>{opt.label}</span>
                    {opt.desc && (
                      <span className={styles.itemDesc}>{opt.desc}</span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
