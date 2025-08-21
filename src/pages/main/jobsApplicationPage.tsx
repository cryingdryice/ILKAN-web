import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../../css/pages/jobsApplicationPage.module.css";
import AddPortfolio from "../../components/jobs/addPortfolio";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function JobsApplicationPage() {
  const { id } = useParams<{ id: string }>();
  const [portfolios, setPortfolios] = useState<string[]>([""]);
  const [introduction, setIntroduction] = useState<string>(""); // 자기소개 상태
  const navigate = useNavigate();

  console.log("현재 채용공고 ID:", id);
  console.log(portfolios);

  // form 제출 이벤트 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 새로고침 방지

    const submissionData = {
      jobId: id,
      introduction: introduction,
      portfolios: portfolios,
    };

    console.log("제출 데이터:", submissionData);

    // 서버 통신 로직 (주석 처리된 상태)
    // try {
    //   const response = await axios.post(`/api/jobs/${id}/apply`, submissionData);
    //   if (response.status === 200) {
    //     navigate("/submission-success");
    //   }
    // } catch (error) {
    //   console.error("지원서 제출 실패:", error);
    //   alert("지원서 제출에 실패했습니다. 다시 시도해 주세요.");
    // }

    // 성공을 가정하고 바로 페이지 이동
    console.log("서버 통신을 건너뛰고 페이지를 이동합니다.");
    navigate("success");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <div className={styles.infoBox}>
        <label className={styles.infoSubtitle}>자기소개</label>
        <div className={styles.infoMainBox}>
          <textarea
            className={styles.infoMainContent}
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="자기소개를 입력하세요"
          />
        </div>
      </div>

      <div className={styles.portfolio}>
        <label className={styles.portfolioSubtitle}>포트폴리오 첨부</label>
        <AddPortfolio onPortfoliosChange={setPortfolios} />
      </div>

      <div className={styles.submitButtonBox}>
        <button type="submit" className={styles.submitButton}>
          제출하기
        </button>
      </div>
    </form>
  );
}
