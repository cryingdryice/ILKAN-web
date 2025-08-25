import { Link } from "react-router-dom";
import styles from "../../css/components/globalLayout/MenuItem.module.css";

export interface SubItem {
  title: string;
  iconOn?: string;
  iconOff?: string;
  link?: string; // 예: /main/jobs?category=DESIGN, /main/kanMatch?tag=PHOTO_STUDIO
}

interface MenuItemProps {
  title: string;
  link: string; // 본 메뉴(전체) 경로: /main/jobs, /main/kanMatch 등
  iconOn?: string;
  iconOff?: string;
  subItems?: SubItem[];
  activeMain: string; // 현재 활성화된 메인 메뉴 라벨
  activeSub: string; // 현재 활성화된 서브 메뉴 라벨 (없으면 "")
  onSubItemClick?: (mainTitle: string, subTitle: string) => void;
}

export default function MenuItem({
  title,
  link,
  iconOn,
  iconOff,
  subItems,
  activeMain,
  activeSub,
  onSubItemClick,
}: MenuItemProps) {
  // 메인 메뉴 강조: 같은 그룹 + 서브 선택 없음(= 전체)
  const isMainActive = activeMain === title && activeSub === "";

  // 서브 메뉴 강조
  const isSubActive = (subTitle: string) =>
    activeMain === title && activeSub === subTitle;

  // 메인 메뉴 클릭 → 항상 "전체" 상태로
  const handleMainClick = () => {
    onSubItemClick?.(title, "");
  };

  return (
    <div className={styles.menuItem}>
      <Link
        to={link}
        className={`${styles.mainMenu} ${isMainActive ? styles.active : ""}`}
        onClick={handleMainClick}
      >
        {iconOn && iconOff && (
          <img src={isMainActive ? iconOn : iconOff} alt={title} />
        )}
        {title}
      </Link>

      {subItems && subItems.length > 0 && (
        <ul className={styles.subMenu}>
          {subItems.map((item) => {
            const subActive = isSubActive(item.title);
            return (
              <Link
                key={item.title}
                to={item.link ?? "#"}
                onClick={() => onSubItemClick?.(title, item.title)}
              >
                <li className={subActive ? styles.active : ""}>
                  {item.iconOn && item.iconOff && (
                    <img
                      src={subActive ? item.iconOn : item.iconOff}
                      alt={item.title}
                    />
                  )}
                  <span>{item.title}</span>
                </li>
              </Link>
            );
          })}
        </ul>
      )}
    </div>
  );
}
