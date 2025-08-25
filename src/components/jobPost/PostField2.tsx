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

  const [priceText, setPriceText] = useState(""); // 표시용(쉼표 포함)
  const [price, setPrice] = useState<number | null>(null); // 전송용(숫자)

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 추출
    if (!raw) {
      setPriceText("");
      setPrice(null);
      setFieldValue("buildingPrice", "");
      return;
    }
    let n = parseInt(raw, 10);
    if (n > MAX_PRICE) n = MAX_PRICE;
    if (n < MIN_PRICE) n = MIN_PRICE;

    setPriceText(n.toLocaleString("ko-KR"));
    setPrice(n);
    setFieldValue("buildingPrice", String(n)); // 훅 상태에도 반영
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
        <div>
          <div className={postFieldStyle.fieldItem}>
            <img
              src={termIcon}
              alt="new document"
              className={postFieldStyle.icon}
            />
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

        <div>
          {" "}
          <div className={postFieldStyle.fieldItem}>
            <img
              src={rewardIcon}
              alt="new document"
              className={postFieldStyle.icon}
            />
            <div className={postFieldStyle.textBox}>
              <label className={postFieldStyle.itemTitle} htmlFor="pay">
                작업 보수
              </label>
              <input
                id="pay"
                className={postFieldStyle.itemDesc}
                placeholder="대략적인 작업 보수를 입력해주세요"
                {...register("price")}
              />
            </div>
          </div>
          {getError("price") && (
            <p id="price-error" className={postFieldStyle.errorText}>
              {getError("price")}
            </p>
          )}
        </div>

        <div>
          {" "}
          <div className={postFieldStyle.fieldItem}>
            <img
              src={emailIcon}
              alt="new document"
              className={postFieldStyle.icon}
            />
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

        <div>
          {" "}
          <div className={postFieldStyle.fieldItem}>
            <img
              src={telephoneIcon}
              alt="new document"
              className={postFieldStyle.icon}
            />
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
