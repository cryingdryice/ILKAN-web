import jobPostPageStyle from "../../css/pages/jobPostPage.module.css";

export default function JobPostPage() {
  return (
    <div className={jobPostPageStyle.jobPostPageContainer}>
      <header className={jobPostPageStyle.header}>전문가 모집 공고 쓰기</header>
      <div>공고제목</div>
      <div>세부사항</div>
      <div>모집조건</div>
      <div>상세조건</div>
      <button className={jobPostPageStyle.postBtn}>공고 올리기</button>
    </div>
  );
}
