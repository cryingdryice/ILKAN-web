import PostField1 from "../../components/jobPost/PostField1";
import PostField2 from "../../components/jobPost/PostField2";
import PostField3 from "../../components/jobPost/PostField3";
import PostField4 from "../../components/jobPost/PostField4";
import jobPostPageStyle from "../../css/pages/jobPostPage.module.css";
import { FormEvent, useState } from "react";
import Modal from "../../components/Modal";
import modalStyle from "../../css/components/modal.module.css";
export default function JobPostPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalOnConfirm, setModalOnConfirm] = useState<(() => void) | null>(
    null
  );
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const requiredFields = [
      "title",
      "period",
      "pay",
      "email",
      "phone",
      "recruitNum",
      "education",
      "preference",
      "etc",
      "detailCondition",
    ];
    const emptyFields = requiredFields.filter(
      (field) => !data[field] || data[field].toString().trim() === ""
    );
    if (emptyFields.length > 0) {
      setModalText("모든 필수 입력란을 작성해주세요.");
      setModalTitle("입력 오류");
      setIsOpen(true);
      return;
    }

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
      <header className={jobPostPageStyle.header}>전문가 모집 공고 쓰기</header>
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
          공고 올리기
        </button>
      </form>
    </div>
  );
}
