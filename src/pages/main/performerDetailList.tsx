import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import styles from "../../css/pages/performerDetailList.module.css";

import Modal from "../../components/Modal";
import modalStyle from "../../css/components/modal.module.css";
import api from "../../api/api";
import { useLoading } from "../../context/LoadingContext";

interface PerformerDetail {
  performerId: number;
  performerName: string;
  workTitle: string;
  portfolioUrl: string;
  bio: string;
  applyId: number;
  taskId: number;
}

export default function PerformerDetailPage() {
  const { taskId, performerId } = useParams<{
    taskId: number;
    performerId: number;
  }>();
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const [performerDetail, setPerformerDetail] =
    useState<PerformerDetail | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const fetchPerformerDetail = async () => {
    console.log("fetchPerformerDetail 호출됨"); // API 호출 여부 확인
    setLoading(true);
    try {
      const response = await api.get(
        `/myprofile/commissions/${taskId}/applies/${performerId}`
      );
      console.log("API response:", response.data);
      if (response.status === 200) {
        const data: PerformerDetail = response.data;
        console.log("수행자 상세 데이터:", data);
        setPerformerDetail(data);
      } else {
        console.log("응답 상태 코드 문제:", response.status);
      }
    } catch (error: any) {
      console.log("API 호출 에러:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPerformerDetail();
  }, [taskId, performerId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 필요하면 폼 제출 로직 추가
  };

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      {isOpen && (
        <div className={modalStyle.overlay}>
          <Modal setIsOpen={setIsOpen} text={modalText} title={modalTitle} />
        </div>
      )}

      <div className={styles.infoBox}>
        <label className={styles.infoSubtitle}>
          {performerDetail?.performerName}
        </label>

        <div className={styles.infoMainBox}>
          <div className={styles.infoMainSmallBox}> {performerDetail?.bio}</div>
        </div>
      </div>

      <div className={styles.portfolio}>
        <label className={styles.portfolioSubtitle}>포트폴리오</label>
        <div className={styles.performBox}>
          <div className={styles.urlBox}>
            {performerDetail?.portfolioUrl && (
              <a
                href={performerDetail.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.urlLink}
              >
                {performerDetail.portfolioUrl}
              </a>
            )}
          </div>
        </div>
      </div>

      <div
        onClick={() => navigate(-1)}
        style={{ cursor: "pointer", color: "#a7a7a7" }}
        className={styles.goBackBox}
      >
        지원자 목록으로 돌아가기 &gt;
      </div>
    </form>
  );
}
