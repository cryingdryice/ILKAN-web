import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../../css/pages/jobsDetailPage.module.css";
import Date from "../../assets/date.svg";
import EMAIL from "../../assets/email.svg";
import PHONE from "../../assets/telephone.svg";
import SALARY from "../../assets/salary.svg";
import detailInfoSvg from "../../assets/detailInfo.svg";
import api from "../../api/api";
import Modal from "../../components/Modal";
import modalStyle from "../../css/components/modal.module.css";
import { useLoading } from "../../context/LoadingContext"; // ⬅️ 전역 로딩
import { useStore } from "../../store/store";

interface DetailInfo {
  taskId: number;
  title: string;
  taskDuration: string;
  price: number;
  phoneNumber: string;
  headcount: string;
  academicBackground: string;
  preferred: string;
  etc: string;
  description: string;
  recruitmentPeriod: string | null;
  email: string;
}

export default function JobsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { role } = useStore();

  // 모달 상태
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalOnConfirm, setModalOnConfirm] = useState<(() => void) | null>(
    null
  );

  // 상세 데이터
  const [detailInfo, setDetailInfo] = useState<DetailInfo | null>(null);

  const { setLoading } = useLoading(); // ⬅️ 전역 스피너 제어

  const fetchDetailInfo = async (signal?: AbortSignal) => {
    // (선택) 짧은 요청 깜빡임 방지용 딜레이 노출
    setLoading(true);

    try {
      const response = await api.get(`/works/${id}`, { signal });
      if (response.status === 200) {
        setDetailInfo(response.data);
      } else {
        const error = response.data;
        setModalTitle("일거리 상세 정보");
        setModalText(error?.message ?? "상세 정보를 불러오지 못했습니다.");
        setIsOpen(true);
      }
    } catch (error: any) {
      if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
        return; // 언마운트/탭 전환 등으로 취소된 경우
      }
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      setModalTitle("일거리 상세 정보");
      setModalText(errorMessage);
      setIsOpen(true);
    } finally {
      // if (timer) clearTimeout(timer);
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchDetailInfo(controller.signal);
    return () => controller.abort();
    // id 변경 시 재요청
  }, [id]);

  // 최초 로딩 중엔 전역 스피너만 보여주도록 조용히 리턴
  if (!detailInfo)
    return (
      <>
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
      </>
    );

  return (
    <div className={styles.container}>
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

      {/* 구인 공고(jobPosting) */}
      <div className={styles.jobPosting}>
        <div className={styles.jobPostingTitle}>{detailInfo.title}</div>

        <div className={styles.jobPostingDueDate}>
          <span className={styles.dueDateLabel}>모집기한 |</span>
          <span className={styles.dueDateValue}>
            {detailInfo.recruitmentPeriod
              ? detailInfo.recruitmentPeriod.substring(0, 10)
              : "-"}
          </span>
        </div>

        <div className={styles.line}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1000"
            height="2"
            viewBox="0 0 1000 2"
            fill="none"
          >
            <path d="M0 1H1000" stroke="#D9D9D9" />
          </svg>
        </div>

        <div className={styles.infoGrid}>
          <div className={styles.infoBox}>
            <img src={Date} className={styles.infoIcon} alt="날짜 아이콘" />
            <div className={styles.infoContent}>
              <label className={styles.infoLabel}>작업기간</label>
              <span className={styles.infoDate}>{detailInfo.taskDuration}</span>
            </div>
          </div>

          <div className={styles.infoBox}>
            <img src={SALARY} className={styles.infoIcon} alt="보수 아이콘" />
            <div className={styles.infoContent}>
              <label className={styles.infoLabel}>작업보수</label>
              <span className={styles.infoSalary}>
                {detailInfo.price.toLocaleString()}원~
              </span>
            </div>
          </div>

          <div className={styles.infoBox}>
            <img src={EMAIL} className={styles.infoIcon} alt="이메일 아이콘" />
            <div className={styles.infoContent}>
              <label className={styles.infoLabel}>이메일</label>
              <span className={styles.infoEmail}>{detailInfo.email}</span>
            </div>
          </div>

          <div className={styles.infoBox}>
            <img src={PHONE} className={styles.infoIcon} alt="전화 아이콘" />
            <div className={styles.infoContent}>
              <label className={styles.infoLabel}>연락처</label>
              <span className={styles.infoPhone}>{detailInfo.phoneNumber}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 모집 조건(jobRequirement) */}
      <div className={styles.jobRequirement}>
        <span className={styles.jobRequirementSubtitle}>모집 조건</span>
        <div className={styles.jobRequirementInfoGrid}>
          <div className={styles.jobRequirementInfoBox}>
            <label className={styles.jobRequirementInfoLabel}>모집인원</label>
            <div className={styles.jobRequirementInfoContent}>
              {detailInfo.headcount}
            </div>
          </div>
          <div className={styles.jobRequirementInfoBox}>
            <label className={styles.jobRequirementInfoLabel}>학력</label>
            <div className={styles.jobRequirementInfoContent}>
              {detailInfo.academicBackground === null
                ? "없음"
                : detailInfo.academicBackground}
            </div>
          </div>
          <div className={styles.jobRequirementInfoBox}>
            <label className={styles.jobRequirementInfoLabel}>우대조건</label>
            <div className={styles.jobRequirementInfoContent}>
              {detailInfo.preferred === null ? "없음" : detailInfo.preferred}
            </div>
          </div>
          <div className={styles.jobRequirementInfoBox}>
            <label className={styles.jobRequirementInfoLabel}>기타조건</label>
            <div className={styles.jobRequirementInfoContent}>
              {detailInfo.etc === null ? "없음" : detailInfo.etc}
            </div>
          </div>
        </div>
      </div>

      {/* 상세 내용(jobDetails) */}
      <div className={styles.jobDetails}>
        <div className={styles.jobDetailsSubtitle}>
          <img src={detailInfoSvg} alt="상세 설명" />
          <span>상세 설명</span>
        </div>
        <div className={styles.jobDetailsContent}>{detailInfo.description}</div>
      </div>
      {role === "PERFORMER" && (
        <Link to={`/main/jobs/${id}/application`} className={styles.applyBtn}>
          <div className={styles.font}> 지원하기</div>
        </Link>
      )}
    </div>
  );
}
