import KanField1 from "../../components/kanPost/KanField1";
import KanField2 from "../../components/kanPost/KanField2";
import KanField3 from "../../components/kanPost/kanField3";
import KanField4 from "../../components/kanPost/KanField4";
import jobPostPageStyle from "../../css/pages/jobPostPage.module.css";
import { FormEvent, useState } from "react";
import Modal from "../../components/Modal";
import modalStyle from "../../css/components/modal.module.css";

export default function KanPostPage() {
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
      "detailedAddress",
      "type",
      "text",
      "email",
      "tel",
      "checkIn",
      "checkOut",
      "photos",
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
      setModalText("등록 중 오류가 발생했습니다.");
      setModalTitle("오류");
      setIsOpen(true);
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
      <header className={jobPostPageStyle.header}>나의 칸 등록하기</header>
      <form
        method="post"
        className={jobPostPageStyle.formContainer}
        onSubmit={submitHandler}
      >
        <KanField1 />
        <KanField2 />
        <KanField3 />
        <KanField4 />
        <button className={jobPostPageStyle.postBtn} type="submit">
          칸 심사 요청하기
        </button>
      </form>
    </div>
  );
}
