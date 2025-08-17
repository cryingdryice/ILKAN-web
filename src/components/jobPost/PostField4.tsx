import postFieldStyle from "../../css/components/jobPost/postField4.module.css";

export default function PostField4() {
  return (
    <section className={postFieldStyle.postFieldContainer}>
      <div className={postFieldStyle.fieldTitle}>상세조건</div>
      <div className={postFieldStyle.fieldBox}>
        <textarea
          id="detailCondition"
          name="detailCondition"
          className={postFieldStyle.textarea}
          placeholder="상세조건을 입력해주세요"
        />
      </div>
    </section>
  );
}
