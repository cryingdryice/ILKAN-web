import kanFieldStyle from "../../css/components/kanPost/kanField3.module.css";
import businessPickIcon from "../../assets/jobPost/business-pick-user-icon.svg";

export default function KanField3() {
  return (
    <section className={kanFieldStyle.postFieldContainer}>
      <div className={kanFieldStyle.fieldTitle}>
        <img
          src={businessPickIcon}
          alt="new document"
          className={kanFieldStyle.icon}
        />
        사진 첨부
      </div>
      <div className={kanFieldStyle.fieldList}>
        <div className={kanFieldStyle.fieldItem}></div>

        <div className={kanFieldStyle.fieldItem}></div>

        <div className={kanFieldStyle.fieldItem}></div>

        <div className={kanFieldStyle.fieldItem}></div>
      </div>
    </section>
  );
}
