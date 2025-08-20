import remodelingIlKanStyle from "../../css/pages/remodelingIlKanPage.module.css";
import addImgLabel from "../../assets/remodelingIlKan/addImg.svg";
import promptLabel from "../../assets/remodelingIlKan/prompt.svg";
import aiResultLabel from "../../assets/remodelingIlKan/aiResult.svg";
import addImg from "../../assets/remodelingIlKan/addIlKanImg.svg";
import { useRef, useState, ChangeEvent } from "react";
export default function RemodelingIlKanPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [promptText, setPromptText] = useState<string>("");
  const [aiResultImages, setAiResultImages] = useState<string[]>([]);

  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
    }
  };
  return (
    <form className={remodelingIlKanStyle.container}>
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
        <input
          type="text"
          placeholder="공실의 미래를 생각하며 작성해주세요"
          required
        />
      </div>
      <div className={remodelingIlKanStyle.resultDiv}>
        <div className={remodelingIlKanStyle.aiResultTitleDiv}>
          <img src={aiResultLabel} alt="공실의 가능성" />
          <span>공실의 가능성</span>
        </div>
        <div className={remodelingIlKanStyle.resultDivContent}>
          <div className={remodelingIlKanStyle.resultItem}></div>
          <div className={remodelingIlKanStyle.resultItem}></div>
          <div className={remodelingIlKanStyle.resultItem}></div>
        </div>
      </div>
    </form>
  );
}
