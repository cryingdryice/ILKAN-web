import remodelingIlKanStyle from "../../css/pages/remodelingIlKanPage.module.css";
import addImgLabel from "../../assets/remodelingIlKan/addImg.svg";
import promptLabel from "../../assets/remodelingIlKan/prompt.svg";
import aiResultLabel from "../../assets/remodelingIlKan/aiResult.svg";
import addImg from "../../assets/remodelingIlKan/addIlKanImg.svg";
export default function RemodelingIlKanPage() {
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
        <div className={remodelingIlKanStyle.addImgContentDiv}>
          <img src={addImg} alt="빈 공실 사진 추가하기" />
          <span>빈 공실 사진 추가하기</span>
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
