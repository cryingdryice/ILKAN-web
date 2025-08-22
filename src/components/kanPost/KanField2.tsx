import kanFieldStyle from "../../css/components/kanPost/kanField2.module.css";
import newDocumentIcon from "../../assets/jobPost/new-document-icon.svg";
import termIcon from "../../assets/jobPost/term-icon.svg";
import rewardIcon from "../../assets/jobPost/reward-icon.svg";
import emailIcon from "../../assets/jobPost/email-icon.svg";
import telephoneIcon from "../../assets/jobPost/telephone-icon.svg";

export default function KanField2() {
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
          <img
            src={termIcon}
            alt="new document"
            className={kanFieldStyle.icon}
          />
          <div className={kanFieldStyle.textBox}>
            <label className={kanFieldStyle.itemTitle} htmlFor="period">
              작업실 유형
            </label>
            <input
              id="period"
              name="period"
              type="text"
              className={kanFieldStyle.itemDesc}
              required
              placeholder="유형을 골라주세요 (토글)"
            />
          </div>
        </div>

        <div className={kanFieldStyle.fieldItem}>
          <img
            src={rewardIcon}
            alt="new document"
            className={kanFieldStyle.icon}
          />
          <div className={kanFieldStyle.textBox}>
            <label className={kanFieldStyle.itemTitle} htmlFor="pay">
              대여비 (하루)
            </label>
            <input
              id="pay"
              name="pay"
              type="text"
              className={kanFieldStyle.itemDesc}
              required
              placeholder="하루 대여비를 입력해주세요"
            />
          </div>
        </div>

        <div className={kanFieldStyle.fieldItem}>
          <img
            src={emailIcon}
            alt="new document"
            className={kanFieldStyle.icon}
          />
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
              required
            />
          </div>
        </div>

        <div className={kanFieldStyle.fieldItem}>
          <img
            src={telephoneIcon}
            alt="new document"
            className={kanFieldStyle.icon}
          />
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
              required
            />
          </div>
        </div>
      </div>
    </section>
  );
}
