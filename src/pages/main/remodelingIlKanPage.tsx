import remodelingIlKanStyle from "../../css/pages/remodelingIlKanPage.module.css";
import addImgLabel from "../../assets/remodelingIlKan/addImg.svg";
import promptLabel from "../../assets/remodelingIlKan/prompt.svg";
import aiResultLabel from "../../assets/remodelingIlKan/aiResult.svg";
import addImg from "../../assets/remodelingIlKan/addIlKanImg.svg";
import { useRef, useState, ChangeEvent, FormEvent, useEffect } from "react";
import api from "../../api/api";
import Modal from "../../components/Modal";
import modalStyle from "../../css/components/modal.module.css";
import { AiOutlineLoading } from "react-icons/ai";

export default function RemodelingIlKanPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  const [prompts, setPrompts] = useState({
    color: "",
    style: "",
    element: "",
    usage: "",
    detail: "",
  });

  // 파일 변경 시 로컬 미리보기 생성/정리
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handlePromptChange = (key: keyof typeof prompts, value: string) => {
    setPrompts((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddImageClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      // 간단 검증(선택)
      if (!selectedFile.type.startsWith("image/")) {
        openModal("입력값 오류", "이미지 파일만 업로드해 주세요.");
        e.target.value = "";
        return;
      }
      // 10MB 제한 예시
      if (selectedFile.size > 10 * 1024 * 1024) {
        openModal(
          "입력값 오류",
          "이미지 용량이 큽니다. 10MB 이하로 업로드해 주세요."
        );
        e.target.value = "";
        return;
      }
    }
    setFile(selectedFile);
  };

  const openModal = (title: string, text: string) => {
    setModalTitle(title);
    setModalText(text);
    setIsOpen(true);
  };

  const clearFile = () => {
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loading);

    const combinedPrompt = `
이 공간 배경을 꼭 그대로 사용해야 해. 벽지나 창문 등등의 위치를 절대 바꾸면 안 돼.
색상: ${prompts.color},
스타일: ${prompts.style},
요소: ${prompts.element},
공간 쓰임새: ${prompts.usage},
세부 디테일: ${prompts.detail}
비현실적이지 않고 내가 적은 대로 사실적이게 공간을 리모델링해줘
    `.trim();

    if (!file || Object.values(prompts).some((v) => v.trim() === "")) {
      openModal("입력값 오류", "사진과 프롬프트를 모두 입력해 주세요.");
      return;
    }

    setLoading(true);
    setProgress(0);
    setImageUrl(null);

    // 기본: 서버가 'image' 필드명을 기대한다고 가정
    const tryPost = async (fileFieldName: "image" | "file") => {
      const formData = new FormData();
      formData.append(fileFieldName, file);
      formData.append("prompt", combinedPrompt);

      // 디버깅용: 전송 키 확인
      for (const [k, v] of formData.entries()) {
        // File은 이름만 로깅
        console.debug("[FormData]", k, v instanceof File ? v.name : v);
      }

      const res = await api.post("/gpt/edit-image-url", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (evt) => {
          if (!evt.total) return;
          setProgress(Math.round((evt.loaded / evt.total) * 100));
        },
      });
      return res;
    };

    try {
      let res = await tryPost("image");

      // 400류로 파일 누락을 말하면 필드명 바꿔 한 번 더 시도
      if (res.status >= 200 && res.status < 300 && res.data?.url) {
        setImageUrl(res.data.url);
      } else {
        // 메시지 추출
        const msg =
          res?.data?.message ||
          `서버 응답이 올바르지 않습니다. (status: ${res?.status})`;
        throw new Error(msg);
      }
    } catch (err: any) {
      // 필드명 재시도 로직 (서버가 'file'을 기대하는 경우)
      const needRetry =
        err?.response?.status === 400 &&
        /file|image|required|missing/i.test(err?.response?.data?.message || "");

      if (needRetry) {
        try {
          const res2 = await tryPost("file");
          if (res2.status >= 200 && res2.status < 300 && res2.data?.url) {
            setImageUrl(res2.data.url);
          } else {
            const msg2 =
              res2?.data?.message ||
              `서버 응답이 올바르지 않습니다. (status: ${res2?.status})`;
            openModal("리모델링 AI", msg2);
          }
        } catch (err2: any) {
          const msg =
            err2?.response?.data?.message ||
            err2?.message ||
            "업로드 요청에 실패했습니다. 잠시 후 다시 시도해 주세요.";
          openModal("리모델링 AI", msg);
        }
      } else {
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "업로드 요청에 실패했습니다. 잠시 후 다시 시도해 주세요.";
        openModal("리모델링 AI", msg);
      }
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className={remodelingIlKanStyle.container}>
      {isOpen && (
        <div className={modalStyle.overlay}>
          <Modal
            setIsOpen={setIsOpen}
            text={modalText}
            title={modalTitle}
            onConfirm={undefined}
          />
        </div>
      )}
      {loading && (
        <div className={remodelingIlKanStyle.overlay}>
          <AiOutlineLoading className={remodelingIlKanStyle.loadingIcon2} />
          <span>최대 3분 시간이 걸릴 수 있습니다</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className={remodelingIlKanStyle.headerDiv}>
          생성형 AI로 보는 공실의 가능성
        </div>

        <div
          className={remodelingIlKanStyle.addImgContentDiv}
          onClick={handleAddImageClick}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="미리보기"
              className={remodelingIlKanStyle.resultImage}
            />
          ) : (
            <>
              <img src={addImg} alt="빈 공실 사진 추가하기" />
              <span>빈 공실 사진 추가하기</span>
            </>
          )}
          <input
            id="imageUpload"
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>

        {/* ⬇️ 미리보기 있을 때만 아래에 재업로드/제거 버튼 노출 */}
        {previewUrl && (
          <div className={remodelingIlKanStyle.reuploadBar}>
            <button
              type="button"
              className={remodelingIlKanStyle.reuploadBtn}
              onClick={handleAddImageClick}
              disabled={loading}
            >
              이미지 다시 업로드
            </button>
            {/* <button
              type="button"
              className={remodelingIlKanStyle.removeBtn}
              onClick={clearFile}
              disabled={loading}
            >
              제거
            </button> */}
          </div>
        )}

        <div className={remodelingIlKanStyle.propmtDiv}>
          <div className={remodelingIlKanStyle.promptTitleDiv}>
            <img src={promptLabel} alt="프롬프트" />
            <span>프롬프트 </span>
          </div>

          <div className={remodelingIlKanStyle.promptBody}>
            <div className={remodelingIlKanStyle.prompt}>
              <label>색상</label>
              <input
                type="text"
                placeholder="공실의 미래 색을 작성해주세요"
                onChange={(e) => handlePromptChange("color", e.target.value)}
              />
            </div>
            <div className={remodelingIlKanStyle.prompt}>
              <label>스타일</label>
              <input
                type="text"
                placeholder="공실의 미래 스타일을 작성해주세요"
                onChange={(e) => handlePromptChange("style", e.target.value)}
              />
            </div>
            <div className={remodelingIlKanStyle.prompt}>
              <label>요소</label>
              <input
                type="text"
                placeholder="공실의 미래 요소를 작성해주세요"
                onChange={(e) => handlePromptChange("element", e.target.value)}
              />
            </div>
            <div className={remodelingIlKanStyle.prompt}>
              <label>공간 쓰임새</label>
              <input
                type="text"
                placeholder="공실의 미래 쓰임새를 작성해주세요"
                onChange={(e) => handlePromptChange("usage", e.target.value)}
              />
            </div>
            <div className={remodelingIlKanStyle.prompt}>
              <label>세부 디테일</label>
              <input
                type="text"
                placeholder="공실 세부 디테일을 작성해주세요"
                onChange={(e) => handlePromptChange("detail", e.target.value)}
              />
            </div>
          </div>

          <div className={remodelingIlKanStyle.footer}>
            <button
              className={remodelingIlKanStyle.selectBtn}
              disabled={loading}
              type="submit"
            >
              {/* <span>
                {loading ? `업로드 중... ${progress}%` : "공실의 가능성 보기"}
              </span> */}
              <span>공실의 가능성 보기</span>
            </button>
          </div>
        </div>
      </form>

      <div className={remodelingIlKanStyle.resultDiv}>
        <div className={remodelingIlKanStyle.aiResultTitleDiv}>
          <img src={aiResultLabel} alt="공실의 가능성" />
          <span>공실의 가능성</span>
        </div>
        <div className={remodelingIlKanStyle.resultDivContent}>
          <div className={remodelingIlKanStyle.resultItem}>
            {/* ✅ 서버에서 받은 결과 이미지 */}
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Generated"
                className={remodelingIlKanStyle.resultImage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
