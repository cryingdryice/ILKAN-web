import { useState } from "react";
import postFieldStyle from "../../css/components/jobPost/postField.module.css";
import CategoryDropdown from "./CategoryDropdown";

const options = [
  { value: "design", label: "디자인", desc: "BI/브랜딩, UIUX, 그래픽 등" },
  {
    value: "development",
    label: "개발",
    desc: "프론트엔드, 백엔드, 데이터 분석 등",
  },
  {
    value: "marketing",
    label: "마케팅",
    desc: "디지털 마케팅, 콘텐츠, 광고 등",
  },
  { value: "etc", label: "기타", desc: "번역, 문서작성, 컨설팅 등" },
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
