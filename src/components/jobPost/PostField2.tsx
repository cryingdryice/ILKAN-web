import postFieldStyle from "../../css/components/jobPost/postField.module.css";

export default function PostField2() {
  return (
    <section className={postFieldStyle.postFieldContainer}>
      <div className={postFieldStyle.fieldContainer}>
        <div className={postFieldStyle.fieldTitle}>공고 제목</div>
        <input
          className={postFieldStyle.input}
          type="text"
          name="title"
          placeholder="제목을 입력해 주세요"
          aria-label="공고 제목"
          required
        />
      </div>
    </section>
  );
}
