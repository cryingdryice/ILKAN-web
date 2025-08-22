import postFieldStyle from "../../css/components/jobPost/postField2.module.css";
import newDocumentIcon from "../../assets/jobPost/new-document-icon.svg";
import termIcon from "../../assets/jobPost/term-icon.svg";
import rewardIcon from "../../assets/jobPost/reward-icon.svg";
import emailIcon from "../../assets/jobPost/email-icon.svg";
import telephoneIcon from "../../assets/jobPost/telephone-icon.svg";

export default function KanField2() {
  return (
    <section className={postFieldStyle.postFieldContainer}>
      <div className={postFieldStyle.fieldTitle}>
        <img
          src={newDocumentIcon}
          alt="new document"
          className={postFieldStyle.icon}
        />
        세부 사항
      </div>
      <div className={postFieldStyle.fieldGrid}>
        <div className={postFieldStyle.fieldItem}>
          <img
            src={termIcon}
            alt="new document"
            className={postFieldStyle.icon}
          />
          <div className={postFieldStyle.textBox}>
            <label className={postFieldStyle.itemTitle} htmlFor="period">
              작업실 유형
            </label>
            <input
              id="period"
              name="period"
              type="text"
              className={postFieldStyle.itemDesc}
              required
              placeholder="유형을 골라주세요 (토글)"
            />
          </div>
        </div>

        <div className={postFieldStyle.fieldItem}>
          <img
            src={rewardIcon}
            alt="new document"
            className={postFieldStyle.icon}
          />
          <div className={postFieldStyle.textBox}>
            <label className={postFieldStyle.itemTitle} htmlFor="pay">
              대여비 (하루)
            </label>
            <input
              id="pay"
              name="pay"
              type="text"
              className={postFieldStyle.itemDesc}
              required
              placeholder="하루 대여비를 입력해주세요"
            />
          </div>
        </div>

        <div className={postFieldStyle.fieldItem}>
          <img
            src={emailIcon}
            alt="new document"
            className={postFieldStyle.icon}
          />
          <div className={postFieldStyle.textBox}>
            <label className={postFieldStyle.itemTitle} htmlFor="email">
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={postFieldStyle.itemDesc}
              placeholder="이메일을 적어주세요"
              required
            />
          </div>
        </div>

        <div className={postFieldStyle.fieldItem}>
          <img
            src={telephoneIcon}
            alt="new document"
            className={postFieldStyle.icon}
          />
          <div className={postFieldStyle.textBox}>
            <label className={postFieldStyle.itemTitle} htmlFor="phone">
              전화
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className={postFieldStyle.itemDesc}
              placeholder="전화번호를 입력해주세요"
              required
            />
          </div>
        </div>
      </div>
    </section>
  );
}
