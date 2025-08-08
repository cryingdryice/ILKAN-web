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
            <div className={myPageStyle.leftInner}>
              <div className={myPageStyle.editContent}>
                <span className={myPageStyle.editContetnBox}></span>
                <span className={myPageStyle.editContentText}>정보수정</span>
              </div>
              <div className={myPageStyle.imgAndContentDiv}>
                <div className={myPageStyle.profileImg}></div>
                <div className={myPageStyle.profileContent}>
                  <div className={myPageStyle.nameDiv}>
                    <span className={myPageStyle.name}>김 토토</span>
                    <span className={myPageStyle.age}>(여자, 25)</span>
                  </div>
                  <div className={myPageStyle.profileInformation}>
                    <div className={myPageStyle.phoneDiv}>
                      <label>연락처</label>
                      <span>010-0000-0000</span>
                    </div>
                    <div className={myPageStyle.emailDiv}>
                      <label>이메일</label>
                      <span>abc1234@naver.com</span>
                    </div>
                    <div className={myPageStyle.addressDiv}>
                      <label>주소</label>
                      <span>하늘시 구름동 뭉게뭉게 304호</span>
                    </div>
                    <div className={myPageStyle.resumeDiv}>
                      <label>이력서</label>
                      <span>pdf 올리기</span>
                    </div>
                    <div className={myPageStyle.portfolioDiv}>
                      <label>포트폴리오</label>
                      <span>링크 입력? pdf 올리기</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={myPageStyle.rightDiv}>d</div>
        </div>
      </div>
    </div>
  );
}
