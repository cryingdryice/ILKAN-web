import postFieldStyle from "../../css/components/jobPost/postField2.module.css";
import newDocumentIcon from "../../assets/jobPost/new-document-icon.svg";
import termIcon from "../../assets/jobPost/term-icon.svg";
import rewardIcon from "../../assets/jobPost/reward-icon.svg";
import emailIcon from "../../assets/jobPost/email-icon.svg";
import telephoneIcon from "../../assets/jobPost/telephone-icon.svg";

export default function PostField2() {
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
              작업 기간
            </label>
            <input
              id="period"
              name="taskDuration"
              type="text"
              className={postFieldStyle.itemDesc}
              required
              placeholder="대략적인 작업기간을 입력해주세요"
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
              작업 보수
            </label>
            <input
              id="pay"
              name="price"
              type="text"
              className={postFieldStyle.itemDesc}
              required
              placeholder="대략적인 작업 보수를 입력해주세요"
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
              name="workEmail"
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
              name="workPhoneNumber"
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
