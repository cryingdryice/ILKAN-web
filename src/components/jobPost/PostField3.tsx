import postFieldStyle from "../../css/components/jobPost/postField3.module.css";
import businessPickIcon from "../../assets/jobPost/business-pick-user-icon.svg";

export default function PostField3() {
  return (
    <section className={postFieldStyle.postFieldContainer}>
      <div className={postFieldStyle.fieldTitle}>
        <img
          src={businessPickIcon}
          alt="new document"
          className={postFieldStyle.icon}
        />
        모집조건
      </div>
      <div className={postFieldStyle.fieldList}>
        <div className={postFieldStyle.fieldItem}>
          <label className={postFieldStyle.itemTitle} htmlFor="recruitNum">
            모집인원
          </label>
          <input
            id="recruitNum"
            name="recruitNum"
            type="text"
            className={postFieldStyle.itemDesc}
            placeholder="모집하고 있는 인원을 적어주세요"
            required
          />
        </div>

        <div className={postFieldStyle.fieldItem}>
          <label className={postFieldStyle.itemTitle} htmlFor="education">
            학력
          </label>
          <input
            id="education"
            name="education"
            type="text"
            className={postFieldStyle.itemDesc}
            placeholder="원하는 학력을 적어주세요"
          />
        </div>

        <div className={postFieldStyle.fieldItem}>
          <label className={postFieldStyle.itemTitle} htmlFor="preference">
            우대조건
          </label>
          <input
            id="preference"
            name="preference"
            type="text"
            className={postFieldStyle.itemDesc}
            placeholder="우대조건을 적어주세요"
          />
        </div>

        <div className={postFieldStyle.fieldItem}>
          <label className={postFieldStyle.itemTitle} htmlFor="etc">
            기타조건
          </label>
          <input
            id="etc"
            name="etc"
            type="text"
            className={postFieldStyle.itemDesc}
            placeholder="기타조건을 적어주세요"
          />
        </div>
      </div>
    </section>
  );
}
