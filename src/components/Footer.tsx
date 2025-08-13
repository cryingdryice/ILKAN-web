import footerStyle from "../css/components/footer.module.css";
import footerLogo from "../assets/footer-Logo.png";
export default function Footer() {
  return (
    <div className={footerStyle.container}>
      <div className={footerStyle.contentDiv}>
        <span>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos, quos
          in. Optio, a! Veritatis quo libero error ea corporis ipsa aliquam
          voluptates, in perspiciatis, pariatur nostrum delectus eligendi
          perferendis praesentium.Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Eos, quos in. Optio, a! Veritatis quo libero error
          ea corporis ipsa aliquam voluptates, in perspiciatis, pariatur nostrum
          delectus eligendi perferendis praesentium.
        </span>
      </div>
      <div className={footerStyle.logoDiv}>
        <img src={footerLogo} alt="Footer Logo" className={footerStyle.logo} />
      </div>
    </div>
  );
}
