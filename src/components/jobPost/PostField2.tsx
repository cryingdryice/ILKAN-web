import postFieldStyle from "../../css/components/jobPost/postField2.module.css";
import newDocumentIcon from "../../assets/jobPost/new-document-icon.svg";
import termIcon from "../../assets/jobPost/term-icon.svg";
import rewardIcon from "../../assets/jobPost/reward-icon.svg";
import emailIcon from "../../assets/jobPost/email-icon.svg";
import telephoneIcon from "../../assets/jobPost/telephone-icon.svg";
import { useState } from "react";

type Props = {
  register: (name: string) => Record<string, any>;
  getError: (name: string) => string;
};

export default function PostField2({ register, getError }: Props) {
  /** ===== 대여비: 원표시 + 우측정렬 + 쉼표 + 제한 ===== */
  const MAX_PRICE = 100_000_000; // 1억
  const MIN_PRICE = 0;

  // 표시용(콤마 포함), 전송용(숫자)
  const [priceText, setPriceText] = useState("");
  const [price, setPrice] = useState<number | null>(null);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, ""); // 숫자만
    if (!raw) {
      setPriceText("");
      setPrice(null);
      return;
    }
    let n = parseInt(raw, 10);
    if (n > MAX_PRICE) n = MAX_PRICE;
    if (n < MIN_PRICE) n = MIN_PRICE;

    setPriceText(n.toLocaleString("ko-KR"));
    setPrice(n);
  };

  return (
    <section className={postFieldStyle.postFieldContainer}>
      <div className={postFieldStyle.fieldTitle}>
        <img
          src={newDocumentIcon}
          alt="new document"
          className={postFieldStyle.icon}
        />
        세부 사항
      </div>

      <div className={postFieldStyle.fieldGrid}>
        {/* 작업 기간 */}
        <div>
          <div className={postFieldStyle.fieldItem}>
            <img src={termIcon} alt="" className={postFieldStyle.icon} />
            <div className={postFieldStyle.textBox}>
              <label className={postFieldStyle.itemTitle} htmlFor="period">
                작업 기간
              </label>
              <input
                id="period"
                className={postFieldStyle.itemDesc}
                placeholder="대략적인 작업기간을 입력해주세요"
                {...register("taskDuration")}
              />
            </div>
          </div>
          {getError("taskDuration") && (
            <p id="taskDuration-error" className={postFieldStyle.errorText}>
              {getError("taskDuration")}
            </p>
          )}
        </div>

        {/* 작업 보수 (콤마 + 원 단위 표시) */}
        <div>
          <div className={postFieldStyle.fieldItem}>
            <img src={rewardIcon} alt="" className={postFieldStyle.icon} />
            <div className={postFieldStyle.textBox}>
              <label className={postFieldStyle.itemTitle} htmlFor="pay">
                작업 보수
              </label>

              <div className={postFieldStyle.itemPayWrap}>
                <input
                  id="pay"
                  className={postFieldStyle.itemPayDesc}
                  placeholder="최대 1억"
                  inputMode="numeric"
                  value={priceText}
                  onChange={handlePriceChange}
                  aria-describedby="price-help"
                />
                <span className={postFieldStyle.unit}>원</span>

                {/* 서버 전송용(숫자만) */}
                <input
                  type="hidden"
                  {...register("price")}
                  value={price === null ? "" : String(price)}
                />
              </div>
              {/* <small id="price-help" className={postFieldStyle.helpText}>
                최대 {MAX_PRICE.toLocaleString("ko-KR")}원까지 입력 가능합니다.
              </small> */}
            </div>
          </div>
          {getError("price") && (
            <p id="price-error" className={postFieldStyle.errorText}>
              {getError("price")}
            </p>
          )}
        </div>

        {/* 이메일 */}
        <div>
          <div className={postFieldStyle.fieldItem}>
            <img src={emailIcon} alt="" className={postFieldStyle.icon} />
            <div className={postFieldStyle.textBox}>
              <label className={postFieldStyle.itemTitle} htmlFor="email">
                이메일
              </label>
              <input
                id="email"
                type="email"
                className={postFieldStyle.itemDesc}
                placeholder="이메일을 적어주세요"
                {...register("workEmail")}
              />
            </div>
          </div>
          {getError("workEmail") && (
            <p id="workEmail-error" className={postFieldStyle.errorText}>
              {getError("workEmail")}
            </p>
          )}
        </div>

        {/* 전화 */}
        <div>
          <div className={postFieldStyle.fieldItem}>
            <img src={telephoneIcon} alt="" className={postFieldStyle.icon} />
            <div className={postFieldStyle.textBox}>
              <label className={postFieldStyle.itemTitle} htmlFor="phone">
                전화
              </label>
              <input
                id="phone"
                type="tel"
                className={postFieldStyle.itemDesc}
                placeholder="전화번호를 입력해주세요"
                {...register("workPhoneNumber")}
              />
            </div>
          </div>
          {getError("workPhoneNumber") && (
            <p id="workPhoneNumber-error" className={postFieldStyle.errorText}>
              {getError("workPhoneNumber")}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
