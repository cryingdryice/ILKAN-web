// Sidebar.tsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import MenuItem, { SubItem } from "./MenuItem";
import SidebarDivider from "./SideBarDivider";
import styles from "../../css/components/globalLayout/SideBar.module.css";

// 메인 메뉴 아이콘
import MyPageOn from "../../assets/mainMenu/my_page_on.svg";
import MyPageOff from "../../assets/mainMenu/my_page_off.svg";
import JobOn from "../../assets/mainMenu/IL_on.svg";
import JobOff from "../../assets/mainMenu/IL_off.svg";
import KanOn from "../../assets/mainMenu/KAN_on.svg";
import KanOff from "../../assets/mainMenu/KAN_off.svg";

// IL MATCH 서브 메뉴 아이콘
import DesignOn from "../../assets/ilMatch/Design-on.svg";
import DesignOff from "../../assets/ilMatch/Design-off.svg";
import PhotoOn from "../../assets/ilMatch/Photo-On.svg";
import PhotoOff from "../../assets/ilMatch/Photo-Off.svg";
import ProgOn from "../../assets/ilMatch/Prog-On.svg";
import ProgOff from "../../assets/ilMatch/Prog-Off.svg";
import LawOn from "../../assets/ilMatch/Law-On.svg";
import LawOff from "../../assets/ilMatch/Law-Off.svg";
import EtcOn from "../../assets/ilMatch/Etc-on.svg";
import EtcOff from "../../assets/ilMatch/Etc-off.svg";

// KAN MATCH 서브 메뉴 아이콘
import PopOn from "../../assets/kanMatch/Pop-On.svg";
import PopOff from "../../assets/kanMatch/Pop-Off.svg";
import RecordOn from "../../assets/kanMatch/Record-On.svg";
import RecordOff from "../../assets/kanMatch/Record-Off.svg";
import StudioOn from "../../assets/kanMatch/Studio-On.svg";
import StudioOff from "../../assets/kanMatch/Studio-Off.svg";
import OfficeOn from "../../assets/kanMatch/Office-On.svg";
import OfficeOff from "../../assets/kanMatch/Office-Off.svg";
import PartyOn from "../../assets/kanMatch/Party-On.svg";
import PartyOff from "../../assets/kanMatch/Party-Off.svg";
import EtcOnn from "../../assets/kanMatch/Etc-Onn.svg";
import EtcOfff from "../../assets/kanMatch/Etc-Offf.svg";

export default function Sidebar() {
  const location = useLocation();

  const [activeMain, setActiveMain] = useState<string>("MY PAGE"); // 기본 MY PAGE 활성
  const [activeSub, setActiveSub] = useState<string>(""); // 서브 메뉴 기본값

  // IL MATCH 서브 메뉴
  const jobMatchSubItems: SubItem[] = [
    { title: "디자인", iconOn: DesignOn, iconOff: DesignOff },
    { title: "사진/영상", iconOn: PhotoOn, iconOff: PhotoOff },
    { title: "개발", iconOn: ProgOn, iconOff: ProgOff },
    { title: "법률", iconOn: LawOn, iconOff: LawOff },
    { title: "기타", iconOn: EtcOn, iconOff: EtcOff },
  ];

  // KAN MATCH 서브 메뉴
  const kanMatchSubItems: SubItem[] = [
    { title: "공유오피스", iconOn: OfficeOn, iconOff: OfficeOff },
    { title: "촬영 스튜디오", iconOn: StudioOn, iconOff: StudioOff },
    { title: "팝업 스토어", iconOn: PopOn, iconOff: PopOff },
    { title: "파티룸", iconOn: PartyOn, iconOff: PartyOff },
    { title: "녹음실", iconOn: RecordOn, iconOff: RecordOff },
    { title: "기타 ", iconOn: EtcOnn, iconOff: EtcOfff },
  ];

  // URL 감지해서 자동 활성화
  useEffect(() => {
    if (location.pathname.startsWith("/main/myPage")) {
      setActiveMain("MY PAGE");
      setActiveSub("");
    } else if (location.pathname.startsWith("/main/jobs")) {
      setActiveMain("IL MATCH");
    } else if (location.pathname.startsWith("/main/kanMatch")) {
      setActiveMain("KAN MATCH");
    }
  }, [location.pathname]);

  // 서브 메뉴 클릭 시 수동 활성화 처리
  const handleSubItemClick = (mainTitle: string, subTitle: string) => {
    setActiveMain(mainTitle);
    setActiveSub(subTitle);
  };

  return (
    <aside className={styles.sidebar}>
      <Logo />

      <MenuItem
        title="MY PAGE"
        link="/main/myPage"
        iconOn={MyPageOn}
        iconOff={MyPageOff}
        activeMain={activeMain}
        activeSub={activeSub}
        onSubItemClick={handleSubItemClick}
      />

      <SidebarDivider />

      <MenuItem
        title="IL MATCH"
        link="/main/jobs"
        subItems={jobMatchSubItems}
        iconOn={JobOn}
        iconOff={JobOff}
        activeMain={activeMain}
        activeSub={activeSub}
        onSubItemClick={handleSubItemClick}
      />

      <SidebarDivider />

      <MenuItem
        title="KAN MATCH"
        link="/main/kanMatch"
        subItems={kanMatchSubItems}
        iconOn={KanOn}
        iconOff={KanOff}
        activeMain={activeMain}
        activeSub={activeSub}
        onSubItemClick={handleSubItemClick}
      />
    </aside>
  );
}
