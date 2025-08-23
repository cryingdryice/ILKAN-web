import postFieldStyle from "../../css/components/jobPost/postField3.module.css";
import businessPickIcon from "../../assets/jobPost/business-pick-user-icon.svg";

type Props = {
  register: (name: string) => Record<string, any>;
  getError: (name: string) => string;
};

export default function PostField3({ register, getError }: Props) {
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
            className={postFieldStyle.itemDesc}
            placeholder="모집하고 있는 인원을 적어주세요"
            {...register("headCount")}
          />
        </div>
        {getError("headCount") && (
          <p id="headCount-error" className={postFieldStyle.errorText}>
            {getError("headCount")}
          </p>
        )}

        <div className={postFieldStyle.fieldItem}>
          <label className={postFieldStyle.itemTitle} htmlFor="education">
            학력
          </label>
          <input
            id="education"
            className={postFieldStyle.itemDesc}
            placeholder="원하는 학력을 적어주세요"
            {...register("academicBackground")}
          />
        </div>
        {getError("academicBackground") && (
          <p id="academicBackground-error" className={postFieldStyle.errorText}>
            {getError("academicBackground")}
          </p>
        )}

        <div className={postFieldStyle.fieldItem}>
          <label className={postFieldStyle.itemTitle} htmlFor="preference">
            우대조건
          </label>
          <input
            id="preference"
            className={postFieldStyle.itemDesc}
            placeholder="우대조건을 적어주세요"
            {...register("preferred")}
          />
        </div>
        {getError("preferred") && (
          <p id="preferred-error" className={postFieldStyle.errorText}>
            {getError("preferred")}
          </p>
        )}

        <div className={postFieldStyle.fieldItem}>
          <label className={postFieldStyle.itemTitle} htmlFor="etc">
            기타조건
          </label>
          <input
            id="etc"
            className={postFieldStyle.itemDesc}
            placeholder="기타조건을 적어주세요"
            {...register("etc")}
          />
        </div>
        {getError("etc") && (
          <p id="etc-error" className={postFieldStyle.errorText}>
            {getError("etc")}
          </p>
        )}
      </div>
    </section>
  );
}
