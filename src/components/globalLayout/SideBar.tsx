import Logo from "./Logo";
import MenuItem from "./MenuItem";
import SidebarDivider from "./SideBarDivider";
import styles from "../../css/components/globalLayout/SideBar.module.css";

export default function Sidebar() {
  const jobMatchSubItems = ["디자인", "사진/영상", "개발", "법률", "기타"];
  const kanMatchSubItems = [
    "공유오피스",
    "촬영 스튜디오",
    "팝업 스토어",
    "파티룸",
    "녹음실",
    "기타",
  ];
  return (
    <aside className={styles.sidebar}>
      <Logo />
      <MenuItem title="MY PAGE" link="/main/myPage" />
      <SidebarDivider />
      <MenuItem
        title="JOB MATCH"
        link="/main/jobs"
        subItems={jobMatchSubItems}
      />
      <SidebarDivider />
      <MenuItem
        title="KAN MATCH"
        link="/main/kanMatch"
        subItems={kanMatchSubItems}
      />
    </aside>
  );
}
