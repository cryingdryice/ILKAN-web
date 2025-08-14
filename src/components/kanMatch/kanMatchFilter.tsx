import { useRef, useState } from "react";
import styles from "../../css/components/kanMatch/kanMathFilter.module.css";
import MapPinIcon from "../icons/MapPinIcon";
import UpdownArrowIcon from "../icons/UpdownArrowIcon";
import CheckIcon from "../icons/CheckIcon";
type Props = {
  selected: string;
  onSelect: (sido: string) => void;
  buttonLabel?: string;
};

const SIDO_COLUMNS: string[][] = [
  ["서울", "광주", "경기", "충북", "제주"],
  ["부산", "대전", "경남", "전남", "전국"],
  ["대구", "울산", "경북", "전북"],
  ["인천", "세종", "충남", "강원"],
];

export default function KanMatchFilter({
  selected,
  onSelect,
  buttonLabel,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        type="button"
        className={`${styles.trigger} ${open ? styles.open : ""}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.locIcon}>
          <MapPinIcon />
        </span>
        <span className={styles.label}>{buttonLabel ?? selected}</span>
        <span className={styles.chev}>
          <UpdownArrowIcon />
        </span>
      </button>

      <div className={`${styles.panel} ${open ? styles.show : ""}`}>
        <div className={styles.panelHead}>시/도</div>
        <div className={styles.cols}>
          {SIDO_COLUMNS.map((col, i) => (
            <ul key={i} className={styles.col}>
              {col.map((sido) => {
                const sel = sido === selected;
                return (
                  <li key={sido}>
                    <button
                      type="button"
                      className={`${styles.item} ${sel ? styles.selected : ""}`}
                      onClick={() => {
                        onSelect(sido);
                      }}
                    >
                      {sido}
                      {sel && (
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
