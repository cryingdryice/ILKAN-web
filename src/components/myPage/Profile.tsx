import profileStyle from "../../css/components/profile.module.css";
import style from "../../css/style.module.css";
import arrowBottom from "../../assets/arrow-bottom.png";
import api from "../../api/api";
import { useEffect, useState } from "react";
import profileIcon from "../../assets/profile-icon.png";
import phoneIcon from "../../assets/phone-icon.png";
import addressIcon from "../../assets/address-icon.png";
import emailIcon from "../../assets/email-icon.png";
import resumeIcon from "../../assets/resume-icon.png";
import portfolioIcon from "../../assets/portfolio-icon.png";
import editInfoIcon from "../../assets/editInfo-icon.png";
import performerImg from "../../assets/performerImg.png";

type Props = {
  role: string | null;
  onLoaded: () => void;
};

interface UserInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  resume: string;
  portfolio: string;
}

export default function Profile({ role, onLoaded }: Props) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // const fetchProfileInfo = async () => {
  //   try {
  //     const response = await api.get("/profile");
  //     if (response.status === 200) {
  //       setUserInfo(response.data);
  //     } else {
  //       const error = await response.data;
  //       alert(error.message);
  //     }
  //   } catch (error: any) {
  //     const errorMessage =
  //       error.response?.data?.message ||
  //       error.message ||
  //       "알 수 없는 오류 발생";
  //     alert(errorMessage);
  //   } finally {
  //     onLoaded();
  //   }
  // };

  // useEffect(() => {
  //   fetchProfileInfo();
  // }, []);

  const mockUserInfo: UserInfo = {
    name: "오정희",
    phone: "010-1234-5678",
    email: "kimtato@example.com",
    address: "서울특별시 강남구 테헤란로 123",
    resume: "http://example.com/resume.pdf",
    portfolio: "http://example.com/portfolio",
  };

  useEffect(() => {
    setUserInfo(mockUserInfo);
  }, []);
  return (
    <div className={profileStyle.profileContainer}>
      <div className={profileStyle.profileHeader}>
        <span>일과 칸이 필요한 전문가, {userInfo?.name}님</span>
      </div>
      <div className={profileStyle.profileBody}>
        <div className={profileStyle.leftDiv}>
          <div className={profileStyle.leftHeader}>
            <img src={profileIcon} alt="Profile Icon" />
            <span>Profile</span>
          </div>
          <div className={profileStyle.leftContent}>
            <div className={profileStyle.imgAndContentDiv}>
              <div className={profileStyle.profileImg}>
                <img src={performerImg} alt="Performer" />
              </div>
              <div className={profileStyle.profileContent}>
                <div className={profileStyle.nameDiv}>
                  <span className={profileStyle.name}>{userInfo?.name}</span>
                  <span className={profileStyle.age}>(여자, 25)</span>
                </div>
                <div className={profileStyle.profileInformation}>
                  <div className={profileStyle.phoneDiv}>
                    <label>연락처</label>
                    <span>{userInfo?.phone}</span>
                  </div>
                  <div className={profileStyle.emailDiv}>
                    <label>이메일</label>
                    <span>{userInfo?.email}</span>
                  </div>
                  <div className={profileStyle.addressDiv}>
                    <label>주소</label>
                    <span>{userInfo?.address}</span>
                  </div>
                  <div className={profileStyle.resumeDiv}>
                    <label>이력서</label>
                    <span>{userInfo?.resume}</span>
                  </div>
                  <div className={profileStyle.portfolioDiv}>
                    <label>포트폴리오</label>
                    <span>{userInfo?.portfolio}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={profileStyle.leftDivFooter}>
            <div className={profileStyle.editIconDiv}>
              <span className={style.defaultBox}></span>
              <span className={profileStyle.editContentText}>정보수정</span>
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
