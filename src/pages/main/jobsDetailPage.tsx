import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../../css/pages/jobsDetailPage.module.css";
import Date from "../../assets/date.svg";
import EMAIL from "../../assets/email.svg";
import PHONE from "../../assets/telephone.svg";
import SALARY from "../../assets/salary.svg";
import api from "../../api/api";

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
  email: string;
}

export default function JobsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [detailInfo, setDetailInfo] = useState<DetailInfo | null>(null);
  // const [workItem, setWorkItem] = useState<WorkItem | null>(null);

  const fetchDetailInfo = async () => {
    console.log(id);
    try {
      const response = await api.get(`/works/${id}`);
      if (response.status === 200) {
        setDetailInfo(response.data);
      } else {
        const error = await response.data;
        alert(error.message);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      alert(errorMessage);
    }
  };
  useEffect(() => {
    fetchDetailInfo();
  }, []);
  if (!detailInfo) {
    return <div>일거리 정보를 찾을 수 없습니다.</div>;
  }
  return (
    <div className={styles.container}>
      {/* 구인 공고(jobPosting) */}
      <div className={styles.jobPosting}>
        {/* <div className={styles.jobPostingSubtitle}>{detailInfo.writer}</div> */}
        <div className={styles.jobPostingTitle}>{detailInfo.title}</div>
        <div className={styles.jobPostingDueDate}>
          <span className={styles.dueDateLabel}>모집기한 |</span>
          <span className={styles.dueDateValue}>{detailInfo.taskDuration}</span>
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
              <span className={styles.infoSalary}>{detailInfo.price}</span>
            </div>
          </div>
          <div className={styles.infoBox}>
            <img src={EMAIL} className={styles.infoIcon} alt="이메일 아이콘" />
            <div className={styles.infoContent}>
              <label className={styles.infoLabel}>이메일</label>
              <span className={styles.infoEmail}>{detailInfo.email} </span>
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
              {detailInfo.academicBackground}
            </div>
          </div>
          <div className={styles.jobRequirementInfoBox}>
            <label className={styles.jobRequirementInfoLabel}>우대조건</label>
            <div className={styles.jobRequirementInfoContent}>
              {detailInfo.preferred}
            </div>
          </div>
          <div className={styles.jobRequirementInfoBox}>
            <label className={styles.jobRequirementInfoLabel}>기타조건</label>
            <div className={styles.jobRequirementInfoContent}>
              {detailInfo.etc}
            </div>
          </div>
        </div>
      </div>

      {/* 상세 내용(jobDetails) */}
      <div className={styles.jobDetails}>
        <div className={styles.jobDetailsSubtitle}>상세 내용</div>
        <div className={styles.jobDetailsContent}>{detailInfo.description}</div>
      </div>

      <Link to={`/main/jobs/${id}/application`} className={styles.applyBtn}>
        지원하기
      </Link>
    </div>
  );
}
