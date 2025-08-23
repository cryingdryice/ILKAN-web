// src/components/kanPost/KanField2.tsx
import { useState } from "react";
import kanFieldStyle from "../../css/components/kanPost/kanField2.module.css";
import newDocumentIcon from "../../assets/jobPost/new-document-icon.svg";
import termIcon from "../../assets/jobPost/term-icon.svg";
import rewardIcon from "../../assets/jobPost/reward-icon.svg";
import emailIcon from "../../assets/jobPost/email-icon.svg";
import telephoneIcon from "../../assets/jobPost/telephone-icon.svg";

import TimePicker, { TimeValue, to24hString } from "../kanPost/TimePicker";

import doorExit from "../../assets/kanPost/door-exit.png";
import doorExit2 from "../../assets/kanPost/door-exit2.png";

export default function KanField2() {
  // ✅ 시간 상태
  const [checkIn, setCheckIn] = useState<TimeValue>({
    ampm: "오전",
    hour: 8,
    minute: 0,
  });
  const [checkOut, setCheckOut] = useState<TimeValue>({
    ampm: "오전",
    hour: 8,
    minute: 0,
  });

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
        <div className={kanFieldStyle.fieldItem}>
          <img src={termIcon} alt="" className={kanFieldStyle.icon} />
          <div className={kanFieldStyle.textBox}>
            <label className={kanFieldStyle.itemTitle} htmlFor="type">
              작업실 유형
            </label>
            <input
              id="type"
              name="type"
              type="text"
              className={kanFieldStyle.itemDesc}
              placeholder="유형을 골라주세요 (토글)"
            />
          </div>
        </div>

        <div className={kanFieldStyle.fieldItem}>
          <img src={rewardIcon} alt="" className={kanFieldStyle.icon} />
          <div className={kanFieldStyle.textBox}>
            <label className={kanFieldStyle.itemTitle} htmlFor="pay">
              대여비 (하루)
            </label>
            <input
              id="pay"
              name="pay"
              type="text"
              className={kanFieldStyle.itemDesc}
              placeholder="하루 대여비를 입력해주세요"
            />
          </div>
        </div>

        <div className={kanFieldStyle.fieldItem}>
          <img src={emailIcon} alt="" className={kanFieldStyle.icon} />
          <div className={kanFieldStyle.textBox}>
            <label className={kanFieldStyle.itemTitle} htmlFor="email">
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={kanFieldStyle.itemDesc}
              placeholder="이메일을 적어주세요"
            />
          </div>
        </div>

        <div className={kanFieldStyle.fieldItem}>
          <img src={telephoneIcon} alt="" className={kanFieldStyle.icon} />
          <div className={kanFieldStyle.textBox}>
            <label className={kanFieldStyle.itemTitle} htmlFor="phone">
              전화
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className={kanFieldStyle.itemDesc}
              placeholder="전화번호를 입력해주세요"
            />
          </div>
        </div>

        {/* ✅ 입실 시간 */}
        <div className={kanFieldStyle.fieldItem}>
          <img src={doorExit} alt="" className={kanFieldStyle.icon} />
          <div className={kanFieldStyle.textBox}>
            <div className={kanFieldStyle.itemTitle}>입실 시간</div>
            <div className={kanFieldStyle.itemDesc}>
              <TimePicker value={checkIn} onChange={setCheckIn} />
            </div>
            {/* 폼 전송용 24h hidden */}
            <input type="hidden" name="checkIn" value={to24hString(checkIn)} />
          </div>
        </div>

        {/* ✅ 퇴실 시간 */}
        <div className={kanFieldStyle.fieldItem}>
          <img src={doorExit2} alt="" className={kanFieldStyle.icon} />
          <div className={kanFieldStyle.textBox}>
            <div className={kanFieldStyle.itemTitle}>퇴실 시간</div>
            <div className={kanFieldStyle.itemDesc}>
              <TimePicker value={checkOut} onChange={setCheckOut} />
            </div>
            <input
              type="hidden"
              name="checkOut"
              value={to24hString(checkOut)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
