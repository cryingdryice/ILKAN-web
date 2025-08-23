import postFieldStyle from "../../css/components/jobPost/postField4.module.css";
import bubbleChatIcon from "../../assets/jobPost/bubble-chat-quote-icon.svg";

export default function PostField4() {
  return (
    <section className={postFieldStyle.postFieldContainer}>
      <div className={postFieldStyle.fieldTitle}>
        <img
          src={bubbleChatIcon}
          alt="new document"
          className={postFieldStyle.icon}
        />
        상세조건
      </div>
      <div className={postFieldStyle.fieldBox}>
        <textarea
          id="detailCondition"
          name="description"
          className={postFieldStyle.textarea}
          placeholder="상세조건을 입력해주세요"
          required
        />
      </div>
    </section>
  );
}
