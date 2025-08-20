import remodelingIlKanStyle from "../../css/pages/remodelingIlKanPage.module.css";
import addImgLabel from "../../assets/remodelingIlKan/addImg.svg";
import promptLabel from "../../assets/remodelingIlKan/prompt.svg";
import aiResultLabel from "../../assets/remodelingIlKan/aiResult.svg";
import addImg from "../../assets/remodelingIlKan/addIlKanImg.svg";
import formBtn from "../../assets/remodelingIlKan/formBtn.svg";
import { useRef, useState, ChangeEvent, FormEvent } from "react";
import api from "../../api/api";
export default function RemodelingIlKanPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageName, setImageName] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [aiResultImages, setAiResultImages] = useState<string[]>([]);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  console.log(canSubmit);
  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (prompt !== "") {
        setCanSubmit(true);
      } else {
        setCanSubmit(false);
        setImageName(file.name);
      }
    }
  };

  const handlePromptChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
    if (event.target.value !== "") {
      if (imageName) {
        setCanSubmit(true);
      }
    } else {
      setCanSubmit(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (prompt) {
      const jsonData = JSON.stringify(prompt);
      const blob = new Blob([jsonData], { type: "application/json" });
      formData.append("prompt", blob); //백이랑 얘기 후  이름 맞춰야함
    }
    if (imageName) {
      const imageInput = document.getElementById(
        "imageUpload"
      ) as HTMLInputElement;
      const image = imageInput?.files?.[0];
      if (image) {
        formData.append("image", image); //백이랑 얘기 후  이름 맞춰야함
      }
    }

    try {
      const response = await api.post("주소주소주소", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        alert("업로드 완료");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
    }
  };
  return (
    <form className={remodelingIlKanStyle.container} onSubmit={handleSubmit}>
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
        <input
          type="text"
          placeholder="공실의 미래를 생각하며 작성해주세요"
          onChange={handlePromptChange}
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
      <button
        className={remodelingIlKanStyle.formBtn}
        disabled={!canSubmit}
        type="submit"
      >
        <img src={formBtn} alt="더보기" />
        <span>더보기</span>
      </button>
    </form>
  );
}
