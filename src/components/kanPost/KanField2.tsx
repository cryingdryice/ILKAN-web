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
  // ✅ 시간 상태
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

  useEffect(() => {
    setFieldValue("checkIn", to24hString(checkIn));
  }, [checkIn, setFieldValue]);
  useEffect(() => {
    setFieldValue("checkOut", to24hString(checkOut));
  }, [checkOut, setFieldValue]);

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
        <div>
          <div className={kanFieldStyle.fieldItem}>
            <img src={termIcon} alt="" className={kanFieldStyle.icon} />
            <div className={kanFieldStyle.textBox}>
              <label className={kanFieldStyle.itemTitle} htmlFor="type">
                작업실 유형
              </label>
              <input
                id="type"
                className={kanFieldStyle.itemDesc}
                placeholder="예) OFFICE_SPACE"
                // 대문자 강제 UX (선택)
                onInput={(e) =>
                  (e.currentTarget.value = e.currentTarget.value.toUpperCase())
                }
                {...register("buildingTag")}
              />
            </div>
          </div>
          {getError("buildingTag") && (
            <p id="buildingTag-error" className={kanFieldStyle.errorText}>
              {getError("buildingTag")}
            </p>
          )}
        </div>

        <div>
          {" "}
          <div className={kanFieldStyle.fieldItem}>
            <img src={rewardIcon} alt="" className={kanFieldStyle.icon} />
            <div className={kanFieldStyle.textBox}>
              <label className={kanFieldStyle.itemTitle} htmlFor="pay">
                대여비 (하루)
              </label>
              <input
                id="pay"
                className={kanFieldStyle.itemDesc}
                placeholder="숫자로 입력해주세요"
                inputMode="numeric"
                pattern="^\d+$"
                {...register("buildingPrice")}
              />
            </div>
          </div>
          {getError("buildingPrice") && (
            <p id="buildingPrice-error" className={kanFieldStyle.errorText}>
              {getError("buildingPrice")}
            </p>
          )}
        </div>

        <div>
          {" "}
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

        <div>
          {" "}
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

        {/* ✅ 입실 시간 */}
        <div className={kanFieldStyle.fieldItem}>
          <img src={doorExit} alt="" className={kanFieldStyle.icon} />
          <div className={kanFieldStyle.textBox}>
            <div className={kanFieldStyle.itemTitle}>입실 시간</div>
            <div className={kanFieldStyle.itemDesc}>
              <TimePicker value={checkIn} onChange={() => {}} disabled />
            </div>
            {/* <input
              type="hidden"
              {...register("checkIn")}
              value={to24hString(checkIn)}
            />
            {getError("checkIn") && (
              <p id="checkIn-error" className={kanFieldStyle.errorText}>
                {getError("checkIn")}
              </p>
            )} */}
          </div>
        </div>

        {/* ✅ 퇴실 시간 */}
        <div className={kanFieldStyle.fieldItem}>
          <img src={doorExit2} alt="" className={kanFieldStyle.icon} />
          <div className={kanFieldStyle.textBox}>
            <div className={kanFieldStyle.itemTitle}>퇴실 시간</div>
            <div className={kanFieldStyle.itemDesc}>
              <TimePicker value={checkOut} onChange={() => {}} disabled />
            </div>
            {/* <input
              type="hidden"
              {...register("checkOut")}
              value={to24hString(checkOut)}
            />
            {getError("checkOut") && (
              <p id="checkOut-error" className={kanFieldStyle.errorText}>
                {getError("checkOut")}
              </p>
            )} */}
          </div>
        </div>
      </div>
    </section>
  );
}
