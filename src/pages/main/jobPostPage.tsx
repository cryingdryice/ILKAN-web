import jobPostPageStyle from "../../css/pages/jobPostPage.module.css";
import PostField1 from "../../components/jobPost/PostField1";
import PostField2 from "../../components/jobPost/PostField2";
import PostField3 from "../../components/jobPost/PostField3";
import PostField4 from "../../components/jobPost/PostField4";
import useJobPostForm from "../../hooks/useJobPostForm";
import { useNavigate } from "react-router-dom";

const CATEGORY_ENUM = [
  "DESIGN",
  "PHOTO_VIDEO",
  "DEVELOPMENT",
  "LAW",
  "ETC",
] as const;

export default function JobPostPage() {
  const navigate = useNavigate();
  const { builtinRules } = useJobPostForm({}, {}); // 타입 유도용 더미 참조 금지(사용 X)

  const { handleSubmit, register, setFieldValue, getError } = useJobPostForm(
    {
      // PostField1
      title: [
        builtinRules.required("제목을 입력해 주세요."),
        builtinRules.minLen(2),
        builtinRules.maxLen(60),
      ],
      recruitmentPeriod: [
        builtinRules.required("공고 기한을 선택해 주세요."),
        builtinRules.isISODateAfterToday,
      ],
      category: [
        builtinRules.required("카테고리를 선택해 주세요."),
        builtinRules.isInEnum(
          [...CATEGORY_ENUM],
          "허용되지 않은 카테고리입니다."
        ),
      ],

      // PostField2
      taskDuration: [
        builtinRules.required("작업 기간을 입력해 주세요."),
        builtinRules.isInt({
          min: 1,
          msg: "작업 기간은 숫자만 입력해 주세요.",
        }),
      ],
      price: [
        builtinRules.required("보수를 입력해 주세요."),
        builtinRules.isInt({ min: 0, msg: "숫자로 입력해 주세요." }),
      ],
      workEmail: [builtinRules.isEmail],
      workPhoneNumber: [
        builtinRules.required("전화번호를 입력해 주세요."),
        builtinRules.isPhoneKR,
      ],

      // PostField3
      headCount: [
        builtinRules.required("모집 인원을 입력해 주세요."),
        builtinRules.isInt({ min: 1 }),
      ],
      academicBackground: [
        // builtinRules.required("학력을 입력해 주세요."),
        builtinRules.maxLen(30),
      ],
      preferred: [builtinRules.maxLen(100)],
      etc: [builtinRules.maxLen(100)],

      // PostField4
      description: [
        builtinRules.required("상세조건을 입력해 주세요."),
        // builtinRules.minLen(5),
      ],
    },
    {
      onSuccess: () => {
        navigate("/main/myPage", { replace: true });
      },
    }
  );

  return (
    <div className={jobPostPageStyle.jobPostPageContainer}>
      <header className={jobPostPageStyle.header}>전문가 모집 공고 쓰기</header>
      <form
        className={jobPostPageStyle.formContainer}
        onSubmit={handleSubmit}
        noValidate
      >
        <PostField1
          register={register}
          setFieldValue={setFieldValue}
          getError={getError}
        />
        <PostField2 register={register} getError={getError} />
        <PostField3 register={register} getError={getError} />
        <PostField4 register={register} getError={getError} />
        <button className={jobPostPageStyle.postBtn} type="submit">
          공고 올리기
        </button>
      </form>
    </div>
  );
}
