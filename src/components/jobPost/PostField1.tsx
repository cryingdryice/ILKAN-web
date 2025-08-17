import { useState } from "react";
import postFieldStyle from "../../css/components/jobPost/postField.module.css";
import CategoryDropdown from "./CategoryDropdown";

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
  return (
    <section className={postFieldStyle.postFieldContainer}>
      {/* 공고 제목 */}
      <div className={postFieldStyle.fieldContainer}>
        <div className={postFieldStyle.fieldTitle}>공고 제목</div>
        <input
          className={postFieldStyle.input}
          type="text"
          name="title"
          placeholder="제목을 입력해 주세요"
          aria-label="공고 제목"
          required
        />
      </div>

      {/* 공고 기한 */}
      <div className={postFieldStyle.fieldContainer}>
        <div className={postFieldStyle.fieldTitle}>공고 기한</div>
        <input
          className={postFieldStyle.input}
          type="date"
          name="deadline"
          placeholder="공고를 마감할 날짜를 입력해주세요"
          aria-label="공고 기한"
          required
        />
      </div>

      {/* 카테고리 선택 */}
      <div className={postFieldStyle.fieldContainer}>
        <div className={postFieldStyle.fieldTitle}>카테고리 선택</div>
        <CategoryDropdown
          options={options}
          value={category}
          onChange={(v) => setCategory(v)}
          placeholder="카테고리를 선택해주세요"
        />
        {/* <select
          className={postFieldStyle.input}
          name="category"
          aria-label="카테고리 선택"
          required
        >
          <option value="">카테고리를 선택해주세요</option>
          <option value="design">디자인</option>
          <option value="development">개발</option>
          <option value="marketing">마케팅</option>
          <option value="etc">기타</option>
        </select> */}
      </div>
    </section>
  );
}
