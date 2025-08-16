// Sidebar.tsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import MenuItem, { SubItem } from "./MenuItem";
import SidebarDivider from "./SideBarDivider";
import styles from "../../css/components/globalLayout/SideBar.module.css";

// 메인 메뉴 아이콘
import MyPageOn from "../../assets/my_page_on.svg";
import MyPageOff from "../../assets/my_page_off.svg";
import JobOn from "../../assets/IL_on.svg";
import JobOff from "../../assets/IL_off.svg";
import KanOn from "../../assets/KAN_on.svg";
import KanOff from "../../assets/KAN_off.svg";

// IL MATCH 서브 메뉴 아이콘
import DesignOn from "../../assets/Design-on.svg";
import DesignOff from "../../assets/Design-off.svg";
import PhotoOn from "../../assets/Photo-On.svg";
import PhotoOff from "../../assets/Photo-Off.svg";
import ProgOn from "../../assets/Prog-On.svg";
import ProgOff from "../../assets/Prog-Off.svg";
import LawOn from "../../assets/Law-On.svg";
import LawOff from "../../assets/Law-Off.svg";
import EtcOn from "../../assets/Etc-On.svg";
import EtcOff from "../../assets/Etc-Off.svg";

// KAN MATCH 서브 메뉴 아이콘
import PopOn from "../../assets/Pop-On.svg";
import PopOff from "../../assets/Pop-Off.svg";
import RecordOn from "../../assets/Record-On.svg";
import RecordOff from "../../assets/Record-Off.svg";
import StudioOn from "../../assets/Studio-On.svg";
import StudioOff from "../../assets/Studio-Off.svg";
import OfficeOn from "../../assets/Office-On.svg";
import OfficeOff from "../../assets/Office-Off.svg";
import PartyOn from "../../assets/Party-On.svg";
import PartyOff from "../../assets/Party-Off.svg";
import EtcOnn from "../../assets/Etc-Onn.svg";
import EtcOfff from "../../assets/Etc-Offf.svg";

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
