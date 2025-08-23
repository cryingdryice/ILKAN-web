import { useState } from "react";
import postFieldStyle from "../../css/components/jobPost/postField.module.css";
import CategoryDropdown from "./CategoryDropdown";
import MiniDropdown, { Opt } from "./MiniDropdown";
import pencilCliboardIcon from "../../assets/jobPost/pencil-clipboard-icon.svg";
import clockIcon from "../../assets/jobPost/clock-icon.svg";
import businessSuitcaseIcon from "../../assets/jobPost/business-suitcase-icon.svg";

const options = [
  {
    value: "design",
    label: "디자인",
    desc: "( BIBX / UIUX / 그래픽 / 3D / 편집출판 / 포토샵 / 일러스트 / 모션 등 )",
  },
  {
    value: "photo",
    label: "사진/영상",
    desc: "( 영상 촬영 /  사진 촬영 / 영상 편집 / 사진보정 등 )",
  },
  {
    value: "development",
    label: "개발",
    desc: "( 백엔드 /  프론트엔드 / 데이터 분석가 /  풀 스텍 / 정보 보안 / 게임 개발 등 )",
  },
  {
    value: "law",
    label: "마케팅",
    desc: "( 형사법 / 행정법 /가사법 / 부동산 / 공정거래 / 방송통신 / 저작권 / 의료 / 노인법 등 )",
  },
  {
    value: "etc",
    label: "기타",
    desc: "(마켓팅 / 번역 ,통역 / 문서,글쓰기 / 취업,입시 / 세무 / 비지니스 컨설팅 등 )",
  },
];

export default function PostField1() {
  const [category, setCategory] = useState<string | undefined>();

  // ↓↓↓ 공고 기한 (년/월/일) 상태/옵션 (필수만)
  const now = new Date();
  const baseYear = now.getFullYear();
  const [y, setY] = useState(baseYear);
  const [m, setM] = useState(now.getMonth() + 1);
  const [d, setD] = useState(now.getDate());

  const years: Opt[] = Array.from({ length: 6 }, (_, i) => {
    const yy = baseYear + i;
    return { value: yy, text: `${yy} 년` };
  });
  const months: Opt[] = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    text: `${i + 1}월`,
  }));

  const daysInMonth = new Date(y, m, 0).getDate();
  const days: Opt[] = Array.from({ length: daysInMonth }, (_, i) => ({
    value: i + 1,
    text: `${i + 1}일`,
  }));

  const hiddenDeadline = `${y}-${String(m).padStart(2, "0")}-${String(
    d
  ).padStart(2, "0")}`;

  return (
    <section className={postFieldStyle.postFieldContainer}>
      {/* 공고 제목 */}
      <div className={postFieldStyle.fieldContainer}>
        <div className={postFieldStyle.fieldTitle}>
          <img
            src={pencilCliboardIcon}
            alt="new document"
            className={postFieldStyle.icon}
          />
          공고 제목
        </div>
        <input
          className={postFieldStyle.input}
          type="text"
          name="title"
          placeholder="제목을 입력해 주세요"
          aria-label="공고 제목"
        />
      </div>

      {/* 공고 기한 */}
      <div className={postFieldStyle.fieldContainer}>
        <div className={postFieldStyle.fieldTitle}>
          <img
            src={clockIcon}
            alt="new document"
            className={postFieldStyle.icon}
          />
          공고 기한
        </div>

        <div className={postFieldStyle.dateSelect}>
          <MiniDropdown
            ariaLabel="년도 선택"
            value={y}
            options={years}
            onChange={(val) => {
              const yy = Number(val);
              setY(yy);
              const maxD = new Date(yy, m, 0).getDate();
              if (d > maxD) setD(maxD);
            }}
          />

          <MiniDropdown
            ariaLabel="월 선택"
            value={m}
            options={months}
            onChange={(val) => {
              const mm = Number(val);
              setM(mm);
              const maxD = new Date(y, mm, 0).getDate();
              if (d > maxD) setD(maxD);
            }}
          />

          <MiniDropdown
            ariaLabel="일 선택"
            value={d}
            options={days}
            onChange={(val) => setD(Number(val))}
          />
        </div>

        {/* 폼 제출용 hidden yyyy-mm-dd */}
        <input type="hidden" name="deadline" value={hiddenDeadline} />
      </div>

      {/* 카테고리 선택 */}
      <div className={postFieldStyle.fieldContainer}>
        <div className={postFieldStyle.fieldTitle}>
          <img
            src={businessSuitcaseIcon}
            alt="new document"
            className={postFieldStyle.icon}
          />
          카테고리 선택
        </div>
        <CategoryDropdown
          options={options}
          value={category}
          onChange={(v) => setCategory(v)}
          placeholder="카테고리를 선택해주세요"
        />
      </div>
    </section>
  );
}
