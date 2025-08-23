import remodelingIlKanStyle from "../../css/pages/remodelingIlKanPage.module.css";
import addImgLabel from "../../assets/remodelingIlKan/addImg.svg";
import promptLabel from "../../assets/remodelingIlKan/prompt.svg";
import aiResultLabel from "../../assets/remodelingIlKan/aiResult.svg";
import addImg from "../../assets/remodelingIlKan/addIlKanImg.svg";
import formBtn from "../../assets/remodelingIlKan/formBtn.svg";
import { useRef, useState, ChangeEvent, FormEvent } from "react";
import api from "../../api/api";
import Modal from "../../components/Modal";
import modalStyle from "../../css/components/modal.module.css";

export default function RemodelingIlKanPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalOnConfirm, setModalOnConfirm] = useState<(() => void) | null>(
    null
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [prompts, setPrompts] = useState({
    color: "",
    style: "",
    element: "",
    usage: "",
    detail: "",
  });
  const handlePromptChange = (key: keyof typeof prompts, value: string) => {
    const updatedPrompts = { ...prompts, [key]: value };
    setPrompts(updatedPrompts);
    // checkCanSubmit(imageFile, updatedPrompts);
  };

  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const combinedPrompt = `
    이 공간 배경을 꼭 그대로 사용해야해. 벽지나 창문 등등의 위치를 절대 바꿔서는 안 돼. 
    색상: ${prompts.color},
    스타일: ${prompts.style},
    요소: ${prompts.element},
    공간 쓰임새: ${prompts.usage},
    세부 디테일: ${prompts.detail}
    비현실적이지 않고 내가 적은대로 사실적이게 공간을 리모델링해줘
  `.trim();

    if (!file || Object.values(prompts).some((value) => value.trim() === "")) {
      setModalTitle("입력값 오류");
      setModalText("사진, 프롬프트를 모두 입력해주세요");
      setIsOpen(true);
      return;
    }

    try {
      setLoading(true);
      setImageUrl(null);

      // multipart/form-data 생성
      const formData = new FormData();
      formData.append("image", file);
      formData.append("prompt", combinedPrompt);

      const response = await api.post("/gpt/edit-image-url", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200 && response.data.url) {
        setImageUrl(response.data.url);
      } else {
        alert("이미지 생성에 실패했습니다.");
      }
    } catch (err: any) {
      console.error(err);
      alert("API 호출 실패");
    } finally {
      setLoading(false);
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
            onConfirm={modalOnConfirm || undefined}
          />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className={remodelingIlKanStyle.headerDiv}>
          생성형 AI로 보는 공실의 가능성
        </div>
        <div className={remodelingIlKanStyle.addImgDiv}>
          <div className={remodelingIlKanStyle.addImgTitleDiv}>
            <img src={addImgLabel} alt="사진첨부" />
            <span>사진첨부</span>
          </div>
          <div
            className={remodelingIlKanStyle.addImgContentDiv}
            onClick={handleAddImageClick}
          >
            <img src={addImg} alt="빈 공실 사진 추가하기" />
            <span>빈 공실 사진 추가하기</span>
            <input
              id="imageUpload"
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>
        </div>
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
            {imageUrl && (
              <div>
                <img
                  src={imageUrl}
                  alt="Generated"
                  className={remodelingIlKanStyle.resultImage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
