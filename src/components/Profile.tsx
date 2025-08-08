import profileStyle from "../css/profile.module.css";
import style from "../css/style.module.css";
import arrowBottom from "../../public/img/arrow-bottom.png";

export default function Profile() {
  return (
    <div className={profileStyle.profileContainer}>
      <div className={profileStyle.profileHeader}>
        <span>일과 칸이 필요한 전문가, 김토토님</span>
      </div>
      <div className={profileStyle.profileBody}>
        <div className={profileStyle.leftDiv}>
          <div className={profileStyle.leftInner}>
            <div className={profileStyle.editContent}>
              <span className={style.defaultBox}></span>
              <span className={profileStyle.editContentText}>정보수정</span>
            </div>
            <div className={profileStyle.imgAndContentDiv}>
              <div className={profileStyle.profileImg}></div>
              <div className={profileStyle.profileContent}>
                <div className={profileStyle.nameDiv}>
                  <span className={profileStyle.name}>김 토토</span>
                  <span className={profileStyle.age}>(여자, 25)</span>
                </div>
                <div className={profileStyle.profileInformation}>
                  <div className={profileStyle.phoneDiv}>
                    <label>연락처</label>
                    <span>010-0000-0000</span>
                  </div>
                  <div className={profileStyle.emailDiv}>
                    <label>이메일</label>
                    <span>abc1234@naver.com</span>
                  </div>
                  <div className={profileStyle.addressDiv}>
                    <label>주소</label>
                    <span>하늘시 구름동 뭉게뭉게 304호</span>
                  </div>
                  <div className={profileStyle.resumeDiv}>
                    <label>이력서</label>
                    <span>pdf 올리기</span>
                  </div>
                  <div className={profileStyle.portfolioDiv}>
                    <label>포트폴리오</label>
                    <span>링크 입력? pdf 올리기</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={profileStyle.rightDiv}>
          <div className={profileStyle.rightInner}>
            <div className={profileStyle.alarmDiv}>
              <div className={profileStyle.alarmItem}>
                <div className={style.defaultBox}></div>
                <div className={profileStyle.alarmText}>
                  아년석님의 공실을 사용하고 싶다는 신청이 왔어요!
                </div>
              </div>
              <div className={profileStyle.alarmItem}>
                <div className={style.defaultBox}></div>
                <div className={profileStyle.alarmText}>
                  아년석님의 공실을 사용하고 싶다는 신청이 왔어요!
                </div>
              </div>
            </div>
            <div className={profileStyle.arrowDiv}>
              <img src={arrowBottom} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
