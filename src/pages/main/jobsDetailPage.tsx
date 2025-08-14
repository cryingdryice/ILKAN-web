import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../../css/pages/jobsDetailPage.module.css";
import Date from "../../assets/date.svg";
import EMAIL from "../../assets/email.svg";
import PHONE from "../../assets/telephone.svg";
import SALARY from "../../assets/salary.svg";

type WorkItem = {
  id: number;
  title: string;
  writer: string;
  price: string;
  images?: string[];
};

const MOCK_LIST: WorkItem[] = Array.from({ length: 15 }).map((_, i) => ({
  id: i + 1,
  title: "[카페 반절] 인스타 분위기 카페 BI 로고 디자인 외주 의뢰",
  writer: "카페 반절 경산 임당역 점",
  price: "500,000원~",
  images: [
    `https://via.placeholder.com/300x200?text=Job+ID+${i + 1}_1`,
    `https://via.placeholder.com/300x200?text=Job+ID+${i + 1}_2`,
  ],
}));

export default function JobsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [workItem, setWorkItem] = useState<WorkItem | null>(null);

  useEffect(() => {
    if (!id) return;
    const item = MOCK_LIST.find((w) => w.id === Number(id));
    setWorkItem(item || null);
  }, [id]);

  if (!workItem) return <div>일거리 정보를 찾을 수 없습니다.</div>;

  return (
    <div className={styles.container}>
      {/* 구인 공고(jobPosting) */}
      <div className={styles.jobPosting}>
        <div className={styles.jobPostingSubtitle}>{workItem.writer}</div>
        <div className={styles.jobPostingTitle}>{workItem.title}</div>
        <div className={styles.jobPostingDueDate}>
          <span className={styles.dueDateLabel}>모집기한 |</span>
          <span className={styles.dueDateValue}>~ 2025/ 09/ 12</span>
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
              <span className={styles.infoDate}>1~3개월</span>
            </div>
          </div>

          <div className={styles.infoBox}>
            <img src={SALARY} className={styles.infoIcon} alt="보수 아이콘" />
            <div className={styles.infoContent}>
              <label className={styles.infoLabel}>작업보수</label>
              <span className={styles.infoSalary}>{workItem.price}</span>
            </div>
          </div>
          <div className={styles.infoBox}>
            <img src={EMAIL} className={styles.infoIcon} alt="이메일 아이콘" />
            <div className={styles.infoContent}>
              <label className={styles.infoLabel}>이메일</label>
              <span className={styles.infoEmail}>highfive@naver.com</span>
            </div>
          </div>

          <div className={styles.infoBox}>
            <img src={PHONE} className={styles.infoIcon} alt="전화 아이콘" />
            <div className={styles.infoContent}>
              <label className={styles.infoLabel}>연락처</label>
              <span className={styles.infoPhone}>010-0000-5555</span>
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
            <div className={styles.jobRequirementInfoContent}>1명</div>
          </div>
          <div className={styles.jobRequirementInfoBox}>
            <label className={styles.jobRequirementInfoLabel}>학력</label>
            <div className={styles.jobRequirementInfoContent}>무관</div>
          </div>
          <div className={styles.jobRequirementInfoBox}>
            <label className={styles.jobRequirementInfoLabel}>우대조건</label>
            <div className={styles.jobRequirementInfoContent}>
              로고 디자인 경험 있으신 분
            </div>
          </div>
          <div className={styles.jobRequirementInfoBox}>
            <label className={styles.jobRequirementInfoLabel}>기타조건</label>
            <div className={styles.jobRequirementInfoContent}>
              포트폴리오 필수 제출
            </div>
          </div>
        </div>
      </div>

      {/* 상세 내용(jobDetails) */}
      <div className={styles.jobDetails}>
        <div className={styles.jobDetailsSubtitle}>상세 내용</div>
        <div className={styles.jobDetailsContent}>
          <h4>[카페 반절] BI 로고 디자인 외주 의뢰 공고</h4>
          <p>
            안녕하세요. 감성적인 분위기와 특별한 공간을 추구하는 신규 카페,
            '카페 반절'입니다. 저희는 인스타그램 기반의 트렌디한 감각을 담아낼
            BI(Brand Identity) 로고 디자인 전문가를 모십니다. '카페 반절'의
            독창적인 브랜드 가치를 시각적으로 표현하고, 고객들에게 깊은 인상을
            남길 수 있는 로고를 제작하고자 합니다.
          </p>

          <h4>의뢰 내용:</h4>
          <ul>
            <li>
              '카페 반절'의 BI 로고 디자인 (메인 로고, 서브 로고, 시그니처
              아이콘 포함)
            </li>
            <li>
              인스타그램 등 온라인 채널 및 오프라인 공간(간판, 머그컵, 굿즈
              등)에 활용 가능한 디자인
            </li>
            <li>
              '반절'이라는 이름의 중의적 의미를 창의적으로 해석하여 담아낼 수
              있는 컨셉
            </li>
            <li>
              심플하면서도 따뜻하고 아늑한 카페의 분위기를 담아내는 세련된
              디자인
            </li>
          </ul>

          <h4>지원 자격:</h4>
          <ul>
            <li>BI/로고 디자인 경력 및 관련 분야 포트폴리오 필수</li>
            <li>브랜드 이해도가 높고, 커뮤니케이션이 원활하신 분</li>
            <li>마감 기한 준수 및 책임감이 투철하신 분</li>
          </ul>

          <h4>지원 방법:</h4>
          <p>
            포트폴리오를 제출해 주시면 감사하겠습니다. 저희 '카페 반절'과 함께
            멋진 브랜드 아이덴티티를 만들어갈 역량 있는 디자이너분들의 많은
            관심과 지원 바랍니다.
          </p>
        </div>
      </div>

      <Link to={`/main/jobs/${id}/application`} className={styles.applyBtn}>
        지원하기
      </Link>
    </div>
  );
}
