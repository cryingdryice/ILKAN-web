import { useNavigate } from "react-router-dom";
import jobPostPageStyle from "../../css/pages/jobPostPage.module.css";
import KanField1 from "../../components/kanPost/KanField1";
import KanField2 from "../../components/kanPost/KanField2";
import KanField3 from "../../components/kanPost/kanField3";
import KanField4 from "../../components/kanPost/KanField4";
import useBuildingPostForm from "../../hooks/useBuildingPostForm";

export default function KanPostPage() {
  const navigate = useNavigate();

  // ✅ 불필요한 권한 확인 로직을 모두 삭제합니다.
  // 이 역할은 이미 ProtectedRoute가 담당하고 있습니다.

  const { builtinRules } = useBuildingPostForm({}, {});
  const { handleSubmit, register, setFieldValue, getError } =
    useBuildingPostForm(
      {
        // 필수 텍스트
        buildingName: [
          builtinRules.required("제목을 입력해 주세요."),
          builtinRules.minLen(2),
          builtinRules.maxLen(60),
        ],
        buildingAddress: [
          builtinRules.required("상세 주소를 입력해 주세요."),
          builtinRules.minLen(5),
        ],
        buildingDescription: [
          builtinRules.required("상세조건을 입력해 주세요."),
          builtinRules.minLen(5),
        ],

        // 연락/가격
        phoneNumber: [
          builtinRules.required("연락처를 입력해 주세요."),
          builtinRules.isPhoneKR,
        ],
        email: [builtinRules.isEmail],
        buildingPrice: [
          builtinRules.required("대여비를 입력해 주세요."),
          builtinRules.isInt({ min: 0, msg: "숫자로 입력해 주세요." }),
        ],

        // ENUM
        buildingRegion: [
          builtinRules.required("지역을 선택해 주세요."),
          builtinRules.isUpperEnum(),
        ],
        buildingTag: [
          builtinRules.required("유형을 입력해 주세요."),
          builtinRules.isUpperEnum(
            "대문자(언더스코어)로 입력해 주세요. 예) OFFICE_SPACE"
          ),
        ],

        // 시간(선택): 형식 및 순서 체크
        checkIn: [
          ({ val }) => (!val ? null : builtinRules.is24hTime({} as any)),
        ],
        checkOut: [
          ({ val }) => (!val ? null : builtinRules.is24hTime({} as any)),
          builtinRules.isEndAfterStart("checkIn"),
        ],

        // 사진: photos 다중으로 받아 최소 1장, 확장자/용량
        photos: [
          builtinRules.filesMinCount(
            1,
            "대표 이미지를 최소 1장 업로드해 주세요."
          ),
          builtinRules.filesAllExt(["jpg", "jpeg", "png", "webp"]),
          builtinRules.filesAllMaxSizeMB(10),
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
      <header className={jobPostPageStyle.header}>나의 칸 등록하기</header>
      <form
        className={jobPostPageStyle.formContainer}
        onSubmit={handleSubmit}
        noValidate
      >
        <KanField1
          register={register}
          setFieldValue={setFieldValue}
          getError={getError}
        />
        <KanField2
          register={register}
          setFieldValue={setFieldValue}
          getError={getError}
        />
        <KanField3 register={register} getError={getError} />
        <KanField4 register={register} getError={getError} />
        <button className={jobPostPageStyle.postBtn} type="submit">
          칸 심사 요청하기
        </button>
      </form>
    </div>
  );
}
