import postFieldStyle from "../../css/components/jobPost/postField3.module.css";
import businessPickIcon from "../../assets/jobPost/business-pick-user-icon.svg";

export default function KanField3() {
  return (
    <section className={postFieldStyle.postFieldContainer}>
      <div className={postFieldStyle.fieldTitle}>
        <img
          src={businessPickIcon}
          alt="new document"
          className={postFieldStyle.icon}
        />
        사진 첨부
      </div>
      <div className={postFieldStyle.fieldList}>
        <div className={postFieldStyle.fieldItem}></div>

        <div className={postFieldStyle.fieldItem}></div>

        <div className={postFieldStyle.fieldItem}></div>

        <div className={postFieldStyle.fieldItem}></div>
      </div>
    </section>
  );
}
