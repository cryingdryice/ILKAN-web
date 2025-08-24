// src/components/kanPost/KanField2.tsx
import { useEffect, useState } from "react";
import kanFieldStyle from "../../css/components/kanPost/kanField2.module.css";
import newDocumentIcon from "../../assets/jobPost/new-document-icon.svg";
import termIcon from "../../assets/jobPost/term-icon.svg";
import rewardIcon from "../../assets/jobPost/reward-icon.svg";
import emailIcon from "../../assets/jobPost/email-icon.svg";
import telephoneIcon from "../../assets/jobPost/telephone-icon.svg";

import TimePicker, { TimeValue, to24hString } from "../kanPost/TimePicker";

import doorExit from "../../assets/kanPost/door-exit.png";
import doorExit2 from "../../assets/kanPost/door-exit2.png";
import TagDropdown from "./TagDropdown";

const TAG_OPTIONS = [
  { value: "OFFICE_SPACE", label: "공유오피스" },
  { value: "PHOTO_STUDIO", label: "촬영 스튜디오" },
  { value: "POPUP_STORE", label: "팝업 스토어" },
  { value: "PARTY_ROOM", label: "파티룸" },
  { value: "RECORDING_STUDIO", label: "녹음실" },
  { value: "ETC", label: "기타" },
] as const;

type Props = {
  register: (name: string) => Record<string, any>;
  setFieldValue: (name: string, value: string) => void;
  getError: (name: string) => string;
};

export default function KanField2({
  register,
  setFieldValue,
  getError,
}: Props) {
  /** ===== 시간 상태 ===== */
  const [checkIn, setCheckIn] = useState<TimeValue>({
    ampm: "오후",
    hour: 3,
    minute: 0,
  });
  const [checkOut, setCheckOut] = useState<TimeValue>({
    ampm: "오전",
    hour: 11,
    minute: 0,
  });
  const [tag, setTag] = useState<string | undefined>();

  useEffect(() => {
    setFieldValue("checkIn", to24hString(checkIn));
  }, [checkIn, setFieldValue]);
  useEffect(() => {
    setFieldValue("checkOut", to24hString(checkOut));
  }, [checkOut, setFieldValue]);

  /** ===== 대여비: 원표시 + 우측정렬 + 쉼표 + 제한 ===== */
  const MAX_PRICE = 100_000_000; // 1억
  const MIN_PRICE = 0;

  const [priceText, setPriceText] = useState(""); // 표시용(쉼표 포함)
  const [price, setPrice] = useState<number | null>(null); // 전송용(숫자)

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 추출
    if (!raw) {
      setPriceText("");
      setPrice(null);
      setFieldValue("buildingPrice", "");
      return;
    }
    let n = parseInt(raw, 10);
    if (n > MAX_PRICE) n = MAX_PRICE;
    if (n < MIN_PRICE) n = MIN_PRICE;

    setPriceText(n.toLocaleString("ko-KR"));
    setPrice(n);
    setFieldValue("buildingPrice", String(n)); // 훅 상태에도 반영
  };

  return (
    <section className={kanFieldStyle.postFieldContainer}>
      <div className={kanFieldStyle.fieldTitle}>
        <img
          src={newDocumentIcon}
          alt="new document"
          className={kanFieldStyle.icon}
        />
        세부 사항
      </div>

      <div className={kanFieldStyle.fieldGrid}>
        {/* 작업실 유형 */}
        <div>
          <div className={kanFieldStyle.fieldItem}>
            <img src={termIcon} alt="" className={kanFieldStyle.icon} />
            <div className={kanFieldStyle.textBox}>
              <label className={kanFieldStyle.itemTitle} htmlFor="type">
                작업실 유형
              </label>

              <TagDropdown
                options={TAG_OPTIONS as any}
                value={tag}
                placeholder="유형을 골라주세요 (토글)"
                onChange={(v) => setTag(v)}
              />

              {/* 서버 전송용 hidden (첫 제출부터 값 반영) */}
              <input
                type="hidden"
                {...register("buildingTag")}
                value={tag ?? ""}
              />
            </div>
          </div>
          {getError("buildingTag") && (
            <p id="buildingTag-error" className={kanFieldStyle.errorText}>
              {getError("buildingTag")}
            </p>
          )}
        </div>

        {/* 대여비 */}
        <div>
          <div className={kanFieldStyle.fieldItem}>
            <img src={rewardIcon} alt="" className={kanFieldStyle.icon} />
            <div className={kanFieldStyle.textBox}>
              <label className={kanFieldStyle.itemTitle} htmlFor="pay">
                대여비 (하루)
              </label>

              <div className={kanFieldStyle.itemPayWrap}>
                <input
                  id="pay"
                  className={kanFieldStyle.itemPayDesc}
                  placeholder="숫자로 입력해주세요"
                  inputMode="numeric"
                  value={priceText}
                  onChange={handlePriceChange}
                  aria-describedby="buildingPriceHelp"
                />
                <span className={kanFieldStyle.unit}>원</span>

                {/* 서버 전송용(숫자만) */}
                <input
                  type="hidden"
                  {...register("buildingPrice")}
                  value={price === null ? "" : String(price)}
                />
              </div>
            </div>
          </div>
          {getError("buildingPrice") && (
            <p id="buildingPrice-error" className={kanFieldStyle.errorText}>
              {getError("buildingPrice")}
            </p>
          )}
        </div>

        {/* 이메일 */}
        <div>
          <div className={kanFieldStyle.fieldItem}>
            <img src={emailIcon} alt="" className={kanFieldStyle.icon} />
            <div className={kanFieldStyle.textBox}>
              <label className={kanFieldStyle.itemTitle} htmlFor="email">
                이메일
              </label>
              <input
                id="email"
                type="email"
                className={kanFieldStyle.itemDesc}
                placeholder="owner@example.com"
                {...register("email")}
              />
            </div>
          </div>
          {getError("email") && (
            <p id="email-error" className={kanFieldStyle.errorText}>
              {getError("email")}
            </p>
          )}
        </div>

        {/* 전화 */}
        <div>
          <div className={kanFieldStyle.fieldItem}>
            <img src={telephoneIcon} alt="" className={kanFieldStyle.icon} />
            <div className={kanFieldStyle.textBox}>
              <label className={kanFieldStyle.itemTitle} htmlFor="phone">
                전화
              </label>
              <input
                id="phone"
                type="tel"
                className={kanFieldStyle.itemDesc}
                placeholder="010-1234-5678"
                {...register("phoneNumber")}
              />
            </div>
          </div>
          {getError("phoneNumber") && (
            <p id="phoneNumber-error" className={kanFieldStyle.errorText}>
              {getError("phoneNumber")}
            </p>
          )}
        </div>

        {/* 입/퇴실 시간 (필요하면 주석 해제)
        <div className={kanFieldStyle.fieldItem}>
          <img src={doorExit} alt="" className={kanFieldStyle.icon} />
          <div className={kanFieldStyle.textBox}>
            <div className={kanFieldStyle.itemTitle}>입실 시간</div>
            <div className={kanFieldStyle.itemDesc}>
              <TimePicker value={checkIn} onChange={() => {}} disabled />
            </div>
          </div>
        </div>

        <div className={kanFieldStyle.fieldItem}>
          <img src={doorExit2} alt="" className={kanFieldStyle.icon} />
          <div className={kanFieldStyle.textBox}>
            <div className={kanFieldStyle.itemTitle}>퇴실 시간</div>
            <div className={kanFieldStyle.itemDesc}>
              <TimePicker value={checkOut} onChange={() => {}} disabled />
            </div>
          </div>
        </div>
        */}
      </div>
    </section>
  );
}
