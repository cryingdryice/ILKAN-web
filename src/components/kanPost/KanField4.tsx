import kanFieldStyle from "../../css/components/kanPost/kanField4.module.css";
import bubbleChatIcon from "../../assets/jobPost/bubble-chat-quote-icon.svg";

type Props = {
  register: (name: string) => Record<string, any>;
  getError: (name: string) => string;
};
export default function KanField4({ register, getError }: Props) {
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
          className={kanFieldStyle.textarea}
          placeholder="상세조건을 입력해주세요"
          {...register("buildingDescription")}
        />
      </div>
      {getError("buildingDescription") && (
        <p id="buildingDescription-error" className={kanFieldStyle.errorText}>
          {getError("buildingDescription")}
        </p>
      )}
    </section>
  );
}
