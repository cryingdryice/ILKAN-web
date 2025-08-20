import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../../css/pages/jobsApplicationPage.module.css";
import AddPortfolio from "../../components/jobs/addPortfolio";
//import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function JobsApplicationPage() {
  const { id } = useParams<{ id: string }>();
  const [portfolios, setPortfolios] = useState<string[]>([""]);
  const navigate = useNavigate();

  console.log("현재 채용공고 ID:", id);
  console.log(portfolios);

  // 제출 버튼 클릭 시 호출될 함수 (서버 통신 로직 포함)
  const handleSubmit = async () => {
    // 실제 서버 통신 로직을 임시로 주석 처리
    // try {
    //   const submissionData = {
    //     jobId: id,
    //     portfolios: portfolios,
    //   };
    //   const response = await axios.post(`/api/jobs/${id}/apply`, submissionData);
    //   if (response.status === 200) {
    //     navigate('/submission-success');
    //   }
    // } catch (error) {
    //   console.error("지원서 제출 실패:", error);
    //   alert("지원서 제출에 실패했습니다. 다시 시도해 주세요.");
    // }

    // 성공을 가정하고 바로 페이지를 이동하는 테스트용 코드
    console.log("서버 통신을 건너뛰고 페이지를 이동합니다.");
    navigate("success");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.infoBox}>
        <label className={styles.infoSubtitle}>자기소개</label>
        <div className={styles.infoMainBox}>
          <div className={styles.infoMainContent}>
            <p>
              안녕하세요, 브랜드의 첫인상을 디자인하는 BI 디자이너 김토토입니다.
            </p>
            <p>
              저는 로고를 단순한 시각 요소가 아니라, 브랜드의 ‘이야기와 철학을
              담는 얼굴’이라고 생각합니다.
            </p>
            <p>
              그동안 다양한 프로젝트에서 브랜드 아이덴티티 기획부터 로고, 심볼,
              컬러 시스템 개발까지 전 과정에 참여하며, 시각적으로 완성도
              있으면서도 사용성 높은 BI를 만들어왔습니다. 특히 카페와 같은 공간
              브랜드에서는, 단순히 예쁜 로고를 넘어 공간의 분위기·메뉴
              콘셉트·고객 경험을 함께 담아내는 것을 중요하게 여깁니다.
            </p>
            <p>
              이번 지원에서는 귀사의 카페가 가진 고유한 향, 색, 온도를
              시각적으로 풀어내어 한 번 보면 기억에 남고, 시간이 지나도 변하지
              않는 로고를 제안드리겠습니다. 저의 디자인은 감각과 전략이
              공존합니다. 첫 모금의 커피처럼, 선명하고 오래 여운이 남는 디자인을
              만들어 드리겠습니다.
            </p>
            <p>감사합니다.</p>
          </div>
        </div>
      </div>

      <div className={styles.portfolio}>
        <label className={styles.infoSubtitle}>포트폴리오 첨부</label>
        <AddPortfolio onPortfoliosChange={setPortfolios} />
      </div>

      <div className={styles.submitButtonBox}>
        <button className={styles.submitButton} onClick={handleSubmit}>
          제출하기
        </button>
      </div>
    </div>
  );
}
