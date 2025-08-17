import postFieldStyle from "../../css/components/jobPost/postField2.module.css";

export default function PostField2() {
  return (
    <section className={postFieldStyle.postFieldContainer}>
      <div className={postFieldStyle.fieldTitle}>세부 사항</div>
      <div className={postFieldStyle.fieldGrid}>
        <div className={postFieldStyle.fieldItem}>
          <div className={postFieldStyle.icon}>
            <span className={postFieldStyle.iconMark} />
          </div>
          <div className={postFieldStyle.textBox}>
            <label className={postFieldStyle.itemTitle} htmlFor="period">
              작업 기간
            </label>
            <input
              id="period"
              name="period"
              type="text"
              className={postFieldStyle.itemDesc}
              placeholder="대략적인 작업기간을 입력해주세요"
            />
          </div>
        </div>

        <div className={postFieldStyle.fieldItem}>
          <div className={postFieldStyle.icon}>
            <span className={postFieldStyle.iconMark} />
          </div>
          <div className={postFieldStyle.textBox}>
            <label className={postFieldStyle.itemTitle} htmlFor="pay">
              작업 보수
            </label>
            <input
              id="pay"
              name="pay"
              type="text"
              className={postFieldStyle.itemDesc}
              placeholder="대략적인 작업 보수를 입력해주세요"
            />
          </div>
        </div>

        <div className={postFieldStyle.fieldItem}>
          <div className={postFieldStyle.icon}>
            <span className={postFieldStyle.iconMark} />
          </div>
          <div className={postFieldStyle.textBox}>
            <label className={postFieldStyle.itemTitle} htmlFor="email">
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={postFieldStyle.itemDesc}
              placeholder="이메일을 적어주세요"
            />
          </div>
        </div>

        <div className={postFieldStyle.fieldItem}>
          <div className={postFieldStyle.icon}>
            <span className={postFieldStyle.iconMark} />
          </div>
          <div className={postFieldStyle.textBox}>
            <label className={postFieldStyle.itemTitle} htmlFor="phone">
              전화
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className={postFieldStyle.itemDesc}
              placeholder="전화번호를 입력해주세요"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
