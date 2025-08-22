import PostField1 from "../../components/jobPost/PostField1";
import PostField2 from "../../components/jobPost/PostField2";
import PostField3 from "../../components/jobPost/PostField3";
import PostField4 from "../../components/jobPost/PostField4";
import jobPostPageStyle from "../../css/pages/jobPostPage.module.css";
import { FormEvent } from "react";

export default function KanPostPage() {
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
      <header className={jobPostPageStyle.header}>나의 칸 등록하기</header>
      <form
        method="post"
        className={jobPostPageStyle.formContainer}
        onSubmit={submitHandler}
      >
        <PostField1 />
        <PostField2 />
        <PostField3 />
        <PostField4 />
        <button className={jobPostPageStyle.postBtn} type="submit">
          칸 심사 요청하기
        </button>
      </form>
    </div>
  );
}
