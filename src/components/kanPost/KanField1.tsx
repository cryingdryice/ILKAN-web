import { useState } from "react";
import kanFieldStyle from "../../css/components/kanPost/kanField.module.css";
import pencilCliboardIcon from "../../assets/jobPost/pencil-clipboard-icon.svg";
import businessSuitcaseIcon from "../../assets/jobPost/business-suitcase-icon.svg";
import locationMapIcon from "../../assets/kanPost/location-map.png";
import AddressDropdown from "./AddressDropdown";
import { REGION_KR_TO_ENUM } from "../../hooks/useBuildingPostForm";

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

type Props = {
  register: (name: string) => Record<string, any>;
  setFieldValue: (name: string, value: string) => void;
  getError: (name: string) => string;
};

export default function KanField1({
  register,
  setFieldValue,
  getError,
}: Props) {
  const [address, setAddress] = useState<string | undefined>();
  const regionCode = address ? REGION_KR_TO_ENUM[address] ?? "" : "";

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
          placeholder="제목을 입력해 주세요"
          aria-label="공고 제목"
          {...register("buildingName")}
        />
        {getError("buildingName") && (
          <p id="buildingName-error" className={kanFieldStyle.errorText}>
            {getError("buildingName")}
          </p>
        )}
      </div>

      {/* 지역 선택 */}
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
          placeholder="지역을 선택해주세요"
        />
        <input
          type="hidden"
          {...register("buildingRegion")}
          value={regionCode}
        />
        {getError("buildingRegion") && (
          <p id="buildingRegion-error" className={kanFieldStyle.errorText}>
            {getError("buildingRegion")}
          </p>
        )}

        <input
          className={kanFieldStyle.input}
          type="text"
          placeholder="상세주소를 입력해주세요"
          aria-label="상세 주소"
          {...register("buildingAddress")}
        />
        {getError("buildingAddress") && (
          <p id="buildingAddress-error" className={kanFieldStyle.errorText}>
            {getError("buildingAddress")}
          </p>
        )}
      </div>
    </section>
  );
}
