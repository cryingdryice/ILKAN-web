import { useState } from "react";
import postFieldStyle from "../../css/components/jobPost/postField.module.css"; // 재활용
import pencilCliboardIcon from "../../assets/jobPost/pencil-clipboard-icon.svg";
import businessSuitcaseIcon from "../../assets/jobPost/business-suitcase-icon.svg";

export default function KanField1() {
  const [category, setCategory] = useState<string | undefined>();

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
          required
        />
      </div>

      {/* 카테고리 선택 */}
      <div className={postFieldStyle.fieldContainer}>
        <div className={postFieldStyle.fieldTitle}>
          <img
            src={businessSuitcaseIcon}
            alt="new document"
            className={postFieldStyle.icon}
          />
          주소
        </div>
        {/* <CategoryDropdown
          options={options}
          value={category}
          onChange={(v) => setCategory(v)}
          placeholder="카테고리를 선택해주세요"
        /> */}
      </div>
    </section>
  );
}
