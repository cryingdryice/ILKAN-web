import profileStyle from "../../css/components/myPage/profile.module.css";
import style from "../../css/style.module.css";
import arrowBottom from "../../assets/arrow-bottom.png";
import api from "../../api/api";
import { useEffect, useState } from "react";
import profileIcon from "../../assets/profile-icon.svg";
import phoneIcon from "../../assets/phone-icon.svg";
import addressIcon from "../../assets/address-icon.svg";
import emailIcon from "../../assets/email-icon.svg";
import resumeIcon from "../../assets/resume-icon.svg";
import portfolioIcon from "../../assets/portfolio-icon.svg";
import editInfoSvg from "../../assets/editInfo-icon.svg";
import performerImg from "../../assets/performerImg.svg";
import alarmIcon from "../../assets/alarm-icon.svg";
import AlarmItem from "./AlarmItem";

type Props = {
  role: string | null;
  onLoaded: () => void;
};

interface UserInfo {
  userId: number;
  name: string;
  gender: string;
  age: string;
  phoneNumber: string;
  profileImage: string;
  email: string;
  address: string;
  resume: string;
  portfolioUrl: string;
}
interface AlarmData {
  id: number;
  message: string;
  link: string;
  isRead: boolean;
}
export default function Profile({ role, onLoaded }: Props) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [alarms, setAlarms] = useState<AlarmData[]>([]);
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(true);
  const [isLoadingAlarms, setIsLoadingAlarms] = useState<boolean>(true);

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
  //     setIsLoadingProfile(false);
  //   }
  // };
  // const fetchAlarmList = async () => {
  //   try {
  //     const response = await api.get("/alarm");
  //     if (response.status === 200) {
  //       setAlarms(response.data);
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
  //     setIsLoadingAlarms(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchProfileInfo();
  //   fetchAlarmList();
  // }, []);
  // useEffect(() => {
  //   if (!isLoadingProfile && !isLoadingAlarms) {
  //     onLoaded();
  //   }
  // }, [isLoadingProfile, isLoadingAlarms, onLoaded]);

  const mockUserInfo: UserInfo = {
    userId: 1,
    gender: "여자",
    age: "25",
    profileImage: performerImg,
    name: "오정희",
    phoneNumber: "010-1234-5678",
    email: "kimtato@example.com",
    address: "서울특별시 강남구 테헤란로 123",
    resume: "영남대학교 시각디자인학과 졸업",
    portfolioUrl: "http://example.com/portfolio",
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
                <img
                  src={userInfo?.profileImage || performerImg}
                  alt="Profile"
                />
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
                    <span>{userInfo?.email}</span>
                  </div>
                  <div className={profileStyle.addressDiv}>
                    <div className={profileStyle.labelDiv}>
                      <img src={addressIcon} alt="addressIcon" />
                      <label>주소</label>
                    </div>
                    <span>{userInfo?.address}</span>
                  </div>
                  <div className={profileStyle.resumeDiv}>
                    <div className={profileStyle.labelDiv}>
                      <img src={resumeIcon} alt="resumeIcon" />
                      <label>학력</label>
                    </div>
                    <span>{userInfo?.resume}</span>
                  </div>
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
          <div className={profileStyle.leftDivFooter}>
            <div className={profileStyle.editIconDiv}>
              <img src={editInfoSvg} alt="Edit Info Icon" />
              <span>정보수정</span>
            </div>
          </div>
        </div>
        <div className={profileStyle.rightDiv}>
          <div className={profileStyle.rightHeader}>
            <img src={alarmIcon} alt="Alarm Icon" />
            <span>alarm</span>
          </div>
          <div className={profileStyle.rightContent}>
            <AlarmItem alarms={alarms} />
          </div>
        </div>
      </div>
    </div>
  );
}
