import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../css/pages/jobsApplicationPage.module.css";
import AddPortfolio from "../../components/jobs/addPortfolio";
import Modal from "../../components/Modal";
import modalStyle from "../../css/components/modal.module.css";
import api from "../../api/api"; // ✅ API 인스턴스 사용
import { useLoading } from "../../context/LoadingContext";

export default function JobsApplicationPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const [portfolios, setPortfolios] = useState<string[]>([""]);
  const [introduction, setIntroduction] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalOnConfirm, setModalOnConfirm] = useState<(() => void) | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 현재 글자수 및 바이트 수 계산
  const byteCount = new TextEncoder().encode(introduction).length;

  // form 제출 이벤트 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    // 기본 검증
    if (!introduction.trim()) {
      setModalTitle("입력 오류");
      setModalText("자기소개를 입력해야 합니다.");
      setIsOpen(true);
      return;
    }

    // API 스펙: portfolioUrl은 단일 문자열이라 첫 번째 유효 URL만 사용
    const firstPortfolioUrl =
      portfolios.find((p) => !!p && p.trim().length > 0) || "";

    // if (!firstPortfolioUrl) {
    //   setModalTitle("입력 오류");
    //   setModalText("포트폴리오 URL을 최소 1개 이상 첨부해 주세요.");
    //   setIsOpen(true);
    //   return;
    // }

    if (!id) {
      setModalTitle("요청 오류");
      setModalText("유효하지 않은 일거리 ID입니다.");
      setIsOpen(true);
      return;
    }

    const body = {
      bio: introduction,
      portfolioUrl: firstPortfolioUrl,
    };

    setLoading(true);
    try {
      setIsSubmitting(true);
      // ✅ API 명세에 맞춘 엔드포인트
      const res = await api.post(`/myprofile/commissions/${id}/requests`, body);

      if (res.status >= 200 && res.status < 300) {
        navigate("success");
        return;
      }

      // 비정상 상태 코드 처리
      setModalTitle("제출 실패");
      setModalText(
        `서버가 요청을 처리하지 못했습니다. (status: ${res.status})`
      );
      setIsOpen(true);
    } catch (err: any) {
      // 에러 메시지 추출
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "지원서 제출에 실패했습니다. 잠시 후 다시 시도해 주세요.";
      setModalTitle("제출 실패");
      setModalText(msg);
      setIsOpen(true);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
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
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "제출 중..." : "제출하기"}
        </button>
      </div>
    </form>
  );
}
