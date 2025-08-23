import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../../css/pages/jobsApplicationPage.module.css";
import AddPortfolio from "../../components/jobs/addPortfolio";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import modalStyle from "../../css/components/modal.module.css";

export default function JobsApplicationPage() {
  const { id } = useParams<{ id: string }>();
  const [portfolios, setPortfolios] = useState<string[]>([""]);
  const [introduction, setIntroduction] = useState<string>("");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalOnConfirm, setModalOnConfirm] = useState<(() => void) | null>(
    null
  );

  // 현재 글자수 및 바이트 수 계산
  const byteCount = new TextEncoder().encode(introduction).length;

  // form 제출 이벤트 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 자기소개가 비어있는지 확인
    if (introduction.length === 0) {
      setModalTitle("입력 오류");
      setModalText("자기소개를 입력해야 합니다.");
      setIsOpen(true);
      return;
    }

    const submissionData = {
      jobId: id,
      introduction: introduction,
      portfolios: portfolios,
    };

    console.log("제출 데이터:", submissionData);

    // 테스트를 위한 임시 라우팅 로직\
    console.log("서버 통신을 건너뛰고 페이지를 이동합니다.");
    navigate("success");

    // 실제 API 연동 시 사용할 로직 (주석 해제 후 사용)
    // try {
    //   const response = await axios.post(`/api/jobs/${id}/apply`, submissionData);
    //   if (response.status === 200) {
    //     navigate("success");
    //   }
    // } catch (error) {
    //   console.error("지원서 제출 실패:", error);
    //   alert("지원서 제출에 실패했습니다. 다시 시도해 주세요.");
    // }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      {isOpen && (
        <div className={modalStyle.overlay}>
          <Modal
            setIsOpen={setIsOpen}
            text={modalText}
            title={modalTitle}
            onConfirm={modalOnConfirm || undefined}
          />
        </div>
      )}
      <div className={styles.infoBox}>
        <label className={styles.infoSubtitle}>자기소개</label>
        <div className={styles.infoMainBox}>
          <textarea
            className={styles.infoMainContent}
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="자기소개를 입력하세요."
          />
        </div>
        <div className={styles.charCountBox}>
          <span className={styles.charCount}>
            현재 글자수 {introduction.length}자 ({byteCount} byte)
          </span>
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
