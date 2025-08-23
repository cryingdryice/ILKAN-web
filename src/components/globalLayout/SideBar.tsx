// Sidebar.tsx
import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import MenuItem, { SubItem } from "./MenuItem";
import SidebarDivider from "./SideBarDivider";
import styles from "../../css/components/globalLayout/SideBar.module.css";

// main icons
import MyPageOn from "../../assets/mainMenu/my_page_on.svg";
import MyPageOff from "../../assets/mainMenu/my_page_off.svg";
import JobOn from "../../assets/mainMenu/IL_on.svg";
import JobOff from "../../assets/mainMenu/IL_off.svg";
import KanOn from "../../assets/mainMenu/KAN_on.svg";
import KanOff from "../../assets/mainMenu/KAN_off.svg";

// IL MATCH icons
import DesignOn from "../../assets/ilMatch/Design-on.svg";
import DesignOff from "../../assets/ilMatch/Design-off.svg";
import PhotoOn from "../../assets/ilMatch/Photo-On.svg";
import PhotoOff from "../../assets/ilMatch/Photo-Off.svg";
import ProgOn from "../../assets/ilMatch/Prog-On.svg";
import ProgOff from "../../assets/ilMatch/Prog-Off.svg";
import LawOn from "../../assets/ilMatch/Law-On.svg";
import LawOff from "../../assets/ilMatch/Law-Off.svg";
import EtcOn from "../../assets/ilMatch/ETC-on.svg";
import EtcOff from "../../assets/ilMatch/ETC-off.svg";

// KAN MATCH icons
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
import EtcOnn from "../../assets/kanMatch/ETC-onn.svg";
import EtcOfff from "../../assets/kanMatch/ETC-offf.svg";

export default function Sidebar() {
  const location = useLocation();

  const [activeMain, setActiveMain] = useState<string>("MY PAGE");
  const [activeSub, setActiveSub] = useState<string>("");

  // === IL MATCH: enum ↔ label 매핑 ===
  const jobLabelByEnum: Record<string, string> = {
    DESIGN: "디자인",
    PHOTO_VIDEO: "사진/영상",
    DEVELOPMENT: "개발",
    LAW: "법률",
    ETC: "기타",
  };

  const jobEnumByLabel: Record<string, string> = {
    디자인: "DESIGN",
    "사진/영상": "PHOTO_VIDEO",
    개발: "DEVELOPMENT",
    법률: "LAW",
    기타: "ETC",
  };

  // === KAN MATCH: enum ↔ label 매핑 ===
  const kanLabelByEnum: Record<string, string> = {
    OFFICE_SPACE: "공유오피스",
    PHOTO_STUDIO: "촬영 스튜디오",
    POPUP_STORE: "팝업 스토어",
    PARTY_ROOM: "파티룸",
    RECORDING_STUDIO: "녹음실",
    ETC: "기타",
  };

  const kanEnumByLabel: Record<string, string> = {
    공유오피스: "OFFICE_SPACE",
    "촬영 스튜디오": "PHOTO_STUDIO",
    "팝업 스토어": "POPUP_STORE",
    파티룸: "PARTY_ROOM",
    녹음실: "RECORDING_STUDIO",
    기타: "ETC",
  };

  // ----- 서브 메뉴들 (쿼리 포함 링크) -----
  const jobMatchSubItems: SubItem[] = [
    {
      title: "디자인",
      iconOn: DesignOn,
      iconOff: DesignOff,
      link: `/main/jobs?category=${jobEnumByLabel["디자인"]}`,
    },
    {
      title: "사진/영상",
      iconOn: PhotoOn,
      iconOff: PhotoOff,
      link: `/main/jobs?category=${jobEnumByLabel["사진/영상"]}`,
    },
    {
      title: "개발",
      iconOn: ProgOn,
      iconOff: ProgOff,
      link: `/main/jobs?category=${jobEnumByLabel["개발"]}`,
    },
    {
      title: "법률",
      iconOn: LawOn,
      iconOff: LawOff,
      link: `/main/jobs?category=${jobEnumByLabel["법률"]}`,
    },
    {
      title: "기타",
      iconOn: EtcOn,
      iconOff: EtcOff,
      link: `/main/jobs?category=${jobEnumByLabel["기타"]}`,
    },
  ];

  const kanMatchSubItems: SubItem[] = [
    {
      title: "공유오피스",
      iconOn: OfficeOn,
      iconOff: OfficeOff,
      link: `/main/kanMatch?tag=${kanEnumByLabel["공유오피스"]}`,
    },
    {
      title: "촬영 스튜디오",
      iconOn: StudioOn,
      iconOff: StudioOff,
      link: `/main/kanMatch?tag=${kanEnumByLabel["촬영 스튜디오"]}`,
    },
    {
      title: "팝업 스토어",
      iconOn: PopOn,
      iconOff: PopOff,
      link: `/main/kanMatch?tag=${kanEnumByLabel["팝업 스토어"]}`,
    },
    {
      title: "파티룸",
      iconOn: PartyOn,
      iconOff: PartyOff,
      link: `/main/kanMatch?tag=${kanEnumByLabel["파티룸"]}`,
    },
    {
      title: "녹음실",
      iconOn: RecordOn,
      iconOff: RecordOff,
      link: `/main/kanMatch?tag=${kanEnumByLabel["녹음실"]}`,
    },
    {
      title: "기타 ",
      iconOn: EtcOnn,
      iconOff: EtcOfff,
      link: `/main/kanMatch?tag=${kanEnumByLabel["기타"]}`,
    },
  ];

  // ----- URL 기반 활성화 규칙 -----
  useEffect(() => {
    const path = location.pathname;
    const params = new URLSearchParams(location.search);
    const category = params.get("category"); // /main/jobs
    const tag = params.get("tag"); // /main/kanMatch

    if (path.startsWith("/main/myPage")) {
      setActiveMain("MY PAGE");
      setActiveSub("");
      return;
    }

    if (path.startsWith("/main/jobs")) {
      setActiveMain("IL MATCH");
      // 쿼리 없으면 전체 → 서브 비활성(강조 X)
      if (!category) {
        setActiveSub("");
      } else {
        // ENUM → 라벨로 변환해 서브 강조
        setActiveSub(jobLabelByEnum[category] ?? "");
      }
      return;
    }

    if (path.startsWith("/main/kanMatch")) {
      setActiveMain("KAN MATCH");
      if (!tag) {
        setActiveSub("");
      } else {
        setActiveSub(kanLabelByEnum[tag] ?? "");
      }
      return;
    }
  }, [location.pathname, location.search]);

  // 본 메뉴 클릭 시 “전체”로 이동(= 쿼리 제거)
  const handleSubItemClick = (_main: string, _sub: string) => {
    // 유지: MenuItem 내부에서 링크로 이동하므로 별도 상태 조작 불필요
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
        link="/main/jobs" // ← 본 메뉴 = 전체(쿼리 없음)
        subItems={jobMatchSubItems} // ← 서브는 쿼리 포함 링크
        iconOn={JobOn}
        iconOff={JobOff}
        activeMain={activeMain}
        activeSub={activeSub}
        onSubItemClick={handleSubItemClick}
      />

      <SidebarDivider />

      <MenuItem
        title="KAN MATCH"
        link="/main/kanMatch" // ← 본 메뉴 = 전체(쿼리 없음)
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
