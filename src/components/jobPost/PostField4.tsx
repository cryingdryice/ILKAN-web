import postFieldStyle from "../../css/components/jobPost/postField4.module.css";
import bubbleChatIcon from "../../assets/jobPost/bubble-chat-quote-icon.svg";

type Props = {
  register: (name: string) => Record<string, any>;
  getError: (name: string) => string;
};
export default function PostField4({ register, getError }: Props) {
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
          className={postFieldStyle.textarea}
          placeholder="상세조건을 입력해주세요"
          {...register("description")}
        />
      </div>
      {getError("description") && (
        <p id="description-error" className={postFieldStyle.errorText}>
          {getError("description")}
        </p>
      )}
    </section>
  );
}
