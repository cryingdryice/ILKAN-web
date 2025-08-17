import { useEffect, useMemo, useRef, useState } from "react";
import styles from "../../css/components/jobPost/categoryDropdown.module.css";

type Option = {
  value: string;
  label: string; // 큰 제목 (예: 디자인)
  desc?: string; // 괄호 설명 (예: BI/브랜딩 …)
  icon?: React.ReactNode;
};

type Props = {
  options: Option[];
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (v: string, opt: Option) => void;
  menuMaxHeight?: number; // px
};

export default function CategoryDropdown({
  options,
  value,
  placeholder = "카테고리를 선택하세요",
  disabled,
  onChange,
  menuMaxHeight = 320,
}: Props) {
  const [open, setOpen] = useState(false);
  const [actIdx, setActIdx] = useState<number>(-1); // 키보드 포커스용
  const btnRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(
    () => options.find((o) => o.value === value),
    [options, value]
  );

  // 외부 클릭 닫기
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // 열릴 때 첫 활성 인덱스 설정
  useEffect(() => {
    if (open) {
      const idx = Math.max(
        0,
        selected ? options.findIndex((o) => o.value === selected.value) : 0
      );
      setActIdx(idx);
      // 스크롤 보정
      requestAnimationFrame(() => {
        const el = listRef.current?.children[idx] as HTMLElement | undefined;
        el?.scrollIntoView({ block: "nearest" });
      });
    }
  }, [open, options, selected]);

  const selectIdx = (idx: number) => {
    const opt = options[idx];
    if (!opt) return;
    onChange?.(opt.value, opt);
    setOpen(false);
    btnRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      return;
    }
    if (e.key === "Home") {
      e.preventDefault();
      setActIdx(0);
      return;
    }
    if (e.key === "End") {
      e.preventDefault();
      setActIdx(options.length - 1);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActIdx((v) => Math.min(options.length - 1, v + 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActIdx((v) => Math.max(0, v - 1));
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      selectIdx(actIdx);
      return;
    }
  };

  return (
    <div className={styles.wrap} ref={wrapRef} onKeyDown={onKeyDown}>
      <label className={styles.label}>카테고리를 선택해주세요</label>

      <button
        type="button"
        className={`${styles.trigger} ${open ? styles.open : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="category-listbox"
        onClick={() => setOpen((v) => !v)}
        disabled={disabled}
        ref={btnRef}
      >
        <div className={styles.triggerInner}>
          {selected?.icon && (
            <span className={styles.icon}>{selected.icon}</span>
          )}
          <span
            className={`${styles.value} ${!selected ? styles.placeholder : ""}`}
          >
            {selected ? selected.label : placeholder}
          </span>
        </div>
        <svg
          className={styles.chevron}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            d="M6 9l6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>

      <ul
        id="category-listbox"
        role="listbox"
        className={styles.menu}
        style={{ maxHeight: menuMaxHeight }}
        hidden={!open}
        ref={listRef}
      >
        {options.map((opt, idx) => {
          const selected = value === opt.value;
          const active = idx === actIdx;
          return (
            <li
              key={opt.value}
              role="option"
              aria-selected={selected}
              tabIndex={-1}
              className={`${styles.item} ${active ? styles.active : ""} ${
                selected ? styles.selected : ""
              }`}
              onMouseEnter={() => setActIdx(idx)}
              onMouseDown={(e) => e.preventDefault()} // focus 유지
              onClick={() => selectIdx(idx)}
            >
              {opt.icon && <span className={styles.icon}>{opt.icon}</span>}
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
    </div>
  );
}
