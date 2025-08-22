import { useState } from "react";
import kanFieldStyle from "../../css/components/kanPost/kanField.module.css";
import pencilCliboardIcon from "../../assets/jobPost/pencil-clipboard-icon.svg";
import businessSuitcaseIcon from "../../assets/jobPost/business-suitcase-icon.svg";

export default function KanField1() {
  const [category, setCategory] = useState<string | undefined>();

  return (
    <section className={kanFieldStyle.postFieldContainer}>
      {/* 공고 제목 */}
      <div className={kanFieldStyle.fieldContainer}>
        <div className={kanFieldStyle.fieldTitle}>
          <img
            src={pencilCliboardIcon}
            alt="new document"
            className={kanFieldStyle.icon}
          />
          공고 제목
        </div>
        <input
          className={kanFieldStyle.input}
          type="text"
          name="title"
          placeholder="제목을 입력해 주세요"
          aria-label="공고 제목"
          required
        />
      </div>

      {/* 카테고리 선택 */}
      <div className={kanFieldStyle.fieldContainer}>
        <div className={kanFieldStyle.fieldTitle}>
          <img
            src={businessSuitcaseIcon}
            alt="new document"
            className={kanFieldStyle.icon}
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
