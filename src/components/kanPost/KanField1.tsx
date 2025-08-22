import { useState } from "react";
import kanFieldStyle from "../../css/components/kanPost/kanField.module.css";
import pencilCliboardIcon from "../../assets/jobPost/pencil-clipboard-icon.svg";
import businessSuitcaseIcon from "../../assets/jobPost/business-suitcase-icon.svg";
import locationMapIcon from "../../assets/kanPost/location-map.png";
import AddressDropdown from "./AddressDropdown";

const options = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
  "전국",
];

export default function KanField1() {
  const [address, setAddress] = useState<string | undefined>();

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
            src={locationMapIcon}
            alt="new document"
            className={kanFieldStyle.icon}
          />
          주소
        </div>
        <AddressDropdown
          options={options}
          value={address}
          onChange={(v) => setAddress(v)}
          placeholder="카테고리를 선택해주세요"
        />
        <input
          className={kanFieldStyle.input}
          type="text"
          name="detailedAddress"
          placeholder="상세주소를 입력해주세요"
          aria-label="상세 주소"
          required
        />
      </div>
    </section>
  );
}
