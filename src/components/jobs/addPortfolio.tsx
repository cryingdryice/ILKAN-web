import { useState } from "react";
import styles from "../../css/components/jobs/addPortfolio.module.css";
import Delete from "../../assets/x.svg";
import Plus from "../../assets/+.svg";

// 부모 컴포넌트로 변경된 포트폴리오 목록을 전달하기 위한 Prop
interface AddPortfolioProps {
  onPortfoliosChange: (portfolios: string[]) => void;
}

export default function addPortfolio({
  onPortfoliosChange,
}: AddPortfolioProps) {
  // 포트폴리오 링크 목록을 내부 상태로 관리. 초기값으로 1개를 설정.
  const [portfolios, setPortfolios] = useState<string[]>([""]);

  // "+" 버튼 클릭 시 호출
  const handleAddPortfolio = () => {
    const newPortfolios = [...portfolios, ""];
    setPortfolios(newPortfolios);
    onPortfoliosChange(newPortfolios);
  };

  // 삭제 버튼 클릭 시 호출
  const handleRemovePortfolio = (index: number) => {
    const newPortfolios = portfolios.filter((_, i) => i !== index);
    setPortfolios(newPortfolios);
    onPortfoliosChange(newPortfolios);
  };

  // 입력 필드 값 변경 시 호출
  const handleInputChange = (index: number, value: string) => {
    const newPortfolios = portfolios.map((item, i) =>
      i === index ? value : item
    );
    setPortfolios(newPortfolios);
    onPortfoliosChange(newPortfolios);
  };

  return (
    <>
      {portfolios.map((portfolio, index) => (
        <div key={index} className={styles.inputBox}>
          <input
            type="url"
            className={styles.input}
            placeholder="포트폴리오 링크를 입력하세요"
            value={portfolio}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          {/* 삼항 연산자를 사용하여 레이아웃을 통일 */}
          {index === 0 ? (
            // 첫 번째 칸일 경우, 버튼과 동일한 크기의 빈 공간을 렌더링
            <div className={styles.emptyButtonSpace} />
          ) : (
            // 그 외의 칸일 경우, 삭제 버튼을 렌더링
            <button
              type="button"
              onClick={() => handleRemovePortfolio(index)}
              className={styles.deleteBtn}
            >
              <img src={Delete} alt="포트폴리오 삭제" />
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddPortfolio}
        className={styles.addBtn}
      >
        <img src={Plus} alt="포트폴리오 추가" />
      </button>
    </>
  );
}
