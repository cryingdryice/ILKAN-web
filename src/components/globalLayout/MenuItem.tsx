import { Link } from "react-router-dom";

interface MenuItemProps {
  title: string;
  link: string;
  subItems?: string[];
}

export default function MenuItem({ title, link, subItems }: MenuItemProps) {
  return (
    <div className="menu-item">
      <Link to={link}>{title}</Link>
      {subItems && (
        <ul>
          {subItems.map((item) => (
            <li key={item}>
              <Link to="#">{item}</Link>{" "}
              {/* 나중에 필요하면 개별 라우팅 추가 */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
