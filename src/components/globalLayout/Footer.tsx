import footerStyle from "../../css/components/globalLayout/footer.module.css";
import footerLogo from "../../assets/footer-Logo.svg";
export default function Footer() {
  return (
    <div className={footerStyle.container}>
      <div className={footerStyle.contentDiv}>
        <div className={footerStyle.logoDiv}>
          <img
            src={footerLogo}
            alt="Footer Logo"
            className={footerStyle.logo}
          />
        </div>
        <div className={footerStyle.textDiv}>
          <span className={footerStyle.text}>
            (주)일칸 | 경북 경산시 대학로 280 영남대학교 경산캠퍼스 멋쟁이
            사자처럼 대학
          </span>
          <span className={footerStyle.text}>
            팀 : HIGH_FIVE | 박지원(팀장/FE), 안현석(FE), 문찬주(FE),
            곽동욱(BE), 이나현(BE), 김소윤(P&D)
          </span>
        </div>
        <div className={footerStyle.textDiv}>
          <span className={footerStyle.text}>
            (주)일칸은 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 상품,
            상품정보, 거래에 관한 의무와 책임은 회원에게 있습니다.
          </span>
          <span className={footerStyle.text}>
            (주)일칸 사이트의 상품/전문가/이벤트 정보, 디자인 및 화면의 구성, UI
            등의 무단복제, 배포, 방송 또는 전송, 스크래핑 등의 행위는 저작권법,
            콘텐츠산업 진흥법 등 관련법령에 의하여 엄격히 금지됩니다.
          </span>
        </div>
      </div>
    </div>
  );
}
