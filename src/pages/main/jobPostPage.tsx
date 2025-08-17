import jobPostPageStyle from "../../css/pages/jobPostPage.module.css";
import { FormEvent } from "react";

export default function JobPostPage() {
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // 서버에 전송
      // await api.post("/works/job", data);
      // alert("공고가 등록되었습니다!");
      // 필요시 이동
      // navigate("/jobs");
    } catch (err) {
      // console.error(err);
      // alert("등록 중 오류가 발생했습니다.");
    }
  };
  return (
    <div className={jobPostPageStyle.jobPostPageContainer}>
      <header className={jobPostPageStyle.header}>전문가 모집 공고 쓰기</header>
      <form
        method="post"
        className={jobPostPageStyle.formContainer}
        onSubmit={submitHandler}
      >
        <div>공고제목</div>
        <div>세부사항</div>
        <div>모집조건</div>
        <div>상세조건</div>
        <button className={jobPostPageStyle.postBtn} type="submit">
          공고 올리기
        </button>
      </form>
    </div>
  );
}
