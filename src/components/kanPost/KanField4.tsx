import { useState, useEffect } from "react";
import kanFieldStyle from "../../css/components/kanPost/kanField4.module.css";
import bubbleChatIcon from "../../assets/jobPost/bubble-chat-quote-icon.svg";

type Props = {
  register: (name: string) => Record<string, any>;
  getError: (name: string) => string;
};

export default function KanField4({ register, getError }: Props) {
  const MAX_LENGTH = 200;

  // 길이만 추적 (value는 폼 훅이 관리)
  const [len, setLen] = useState(0);

  // 폼 훅의 register 객체
  const reg = register("buildingDescription");

  // 초기값 있을 수 있으니 한 번 동기화
  useEffect(() => {
    const v = (reg?.value ?? reg?.defaultValue ?? "") as string;
    setLen(v.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // onChange를 결합: 폼 훅 onChange + 길이 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    reg.onChange?.(e);
    setLen(e.target.value.length);
  };

  return (
    <section className={kanFieldStyle.postFieldContainer}>
      <div className={kanFieldStyle.fieldTitle}>
        <img
          src={bubbleChatIcon}
          alt="new document"
          className={kanFieldStyle.icon}
        />
        상세설명
      </div>

      <div className={kanFieldStyle.fieldBox}>
        <textarea
          id="detailCondition"
          className={kanFieldStyle.textarea}
          placeholder="상세조건을 입력해주세요"
          maxLength={MAX_LENGTH}
          {...reg} // 먼저 폼 훅 속성들 적용
          onChange={handleChange} // 그다음 우리가 합친 onChange로 덮기
        />
        <div className={kanFieldStyle.charCount}>
          현재 글자수 {len}자 ({MAX_LENGTH}자 제한)
        </div>
      </div>

      {getError("buildingDescription") && (
        <p id="buildingDescription-error" className={kanFieldStyle.errorText}>
          {getError("buildingDescription")}
        </p>
      )}
    </section>
  );
}
