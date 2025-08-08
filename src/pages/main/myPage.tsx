import myPageStyle from "../../css/myPage.module.css";

export default function MyPage() {
  return (
    <div className={myPageStyle.myPageContainer}>
      <div className={myPageStyle.profileContainer}>
        <div className={myPageStyle.profileHeader}>
          <span>일과 칸이 필요한 전문가, 김토토님</span>
        </div>
        <div className={myPageStyle.profileBody}>
          <div className={myPageStyle.leftDiv}>
            <div className={myPageStyle.profileImg}></div>
            <div className={myPageStyle.profileContent}></div>
          </div>
          <div className={myPageStyle.rightDiv}>d</div>
        </div>
      </div>
    </div>
  );
}
