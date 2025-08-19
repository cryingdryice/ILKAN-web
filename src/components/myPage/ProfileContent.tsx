import profileStyle from "../../css/components/myPage/profile.module.css";
import profileIcon from "../../assets/myPage/profile-icon.svg";
import phoneIcon from "../../assets/myPage/phone-icon.svg";
import addressIcon from "../../assets/myPage/address-icon.svg";
import emailIcon from "../../assets/myPage/email-icon.svg";
import resumeIcon from "../../assets/myPage/resume-icon.svg";
import portfolioIcon from "../../assets/myPage/portfolio-icon.svg";
import performerImg from "../../assets/myPage/performerImg.svg";
interface UserInfo {
  userId: number;
  name: string;
  phoneNumber: string;
  role: string;
  profileImage: string;
  portfolioUrl: string;
  organization: string;
  address: string;
  education: string;
  age: string;
  gender: string;
  // email: string;
  // resume: string;
}
type Props = {
  userInfo: UserInfo | null;
  role: string | null;
};
export default function ProfileContent({ userInfo, role }: Props) {
  return (
    <>
      <div className={profileStyle.leftHeader}>
        <img src={profileIcon} alt="Profile Icon" />
        <span>Profile</span>
      </div>
      <div className={profileStyle.leftContent}>
        <div className={profileStyle.imgAndContentDiv}>
          <div className={profileStyle.profileImg}>
            <img src={userInfo?.profileImage || performerImg} alt="Profile" />
          </div>
          <div className={profileStyle.profileContent}>
            <div className={profileStyle.nameDiv}>
              <span className={profileStyle.name}>{userInfo?.name}</span>
              <span className={profileStyle.age}>
                {"("}
                {userInfo?.gender}
                {", "}
                {userInfo?.age}
                {")"}
              </span>
            </div>
            <div className={profileStyle.profileInformation}>
              <div className={profileStyle.phoneDiv}>
                <div className={profileStyle.labelDiv}>
                  <img src={phoneIcon} alt="Phone Icon" />
                  <label>연락처</label>
                </div>
                <span>{userInfo?.phoneNumber}</span>
              </div>
              <div className={profileStyle.emailDiv}>
                <div className={profileStyle.labelDiv}>
                  <img src={emailIcon} alt="emailIcon" />
                  <label>이메일</label>
                </div>
                {/* <span>{userInfo?.email}</span> */}
                <span>Imtoto5252@naver.com</span>
              </div>
              <div className={profileStyle.addressDiv}>
                <div className={profileStyle.labelDiv}>
                  <img src={addressIcon} alt="addressIcon" />
                  <label>주소</label>
                </div>
                <span>{userInfo?.address}</span>
                {/* <span>하늘시 구름동 뭉게뭉게 304호</span> */}
              </div>
              {role === "PERFORMER" ? (
                <>
                  <div className={profileStyle.resumeDiv}>
                    <div className={profileStyle.labelDiv}>
                      <img src={resumeIcon} alt="resumeIcon" />
                      <label>학력</label>
                    </div>
                    <span>{userInfo?.education}</span>
                    {/* <span>영남대학교 시각디자인학과 졸업</span> */}
                  </div>{" "}
                </>
              ) : role === "REQUESTER" ? (
                <>
                  <div className={profileStyle.organizationDiv}>
                    <div className={profileStyle.labelDiv}>
                      <img src={addressIcon} alt="addressIcon" />
                      <label>회사</label>
                    </div>
                    <span>{userInfo?.organization}</span>
                    {/* <span>영남대학교 시각디자인학과 졸업</span> */}
                  </div>
                </>
              ) : null}
              {/* <div className={profileStyle.portfolioDiv}>
                    <div className={profileStyle.labelDiv}>
                      <img src={portfolioIcon} alt="portfolioIcon" />
                      <label>포폴</label>
                    </div>
                    <span>{userInfo?.portfolioUrl}</span>
                  </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
