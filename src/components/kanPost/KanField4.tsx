import kanFieldStyle from "../../css/components/kanPost/kanField4.module.css";
import bubbleChatIcon from "../../assets/jobPost/bubble-chat-quote-icon.svg";

export default function KanField4() {
  return (
    <section className={kanFieldStyle.postFieldContainer}>
      <div className={kanFieldStyle.fieldTitle}>
        <img
          src={bubbleChatIcon}
          alt="new document"
          className={kanFieldStyle.icon}
        />
        상세조건
      </div>
      <div className={kanFieldStyle.fieldBox}>
        <textarea
          id="detailCondition"
          name="detailCondition"
          className={kanFieldStyle.textarea}
          placeholder="상세조건을 입력해주세요"
        />
      </div>
    </section>
  );
}
