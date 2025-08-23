import profileStyle from "../../css/components/myPage/profile.module.css";
import api from "../../api/api";
import { useEffect, useState } from "react";
import editInfoSvg from "../../assets/myPage/editInfo-icon.svg";
import alarmIcon from "../../assets/myPage/alarm-icon.svg";
import AlarmItem from "./AlarmItem";
import ProfileContent from "./ProfileContent";
import Modal from "../../components/Modal";
import modalStyle from "../../css/components/modal.module.css";

type Props = {
  role: string | null;
};

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
  email: string;
  // resume: string;
}

export default function Profile({ role }: Props) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalOnConfirm, setModalOnConfirm] = useState<(() => void) | null>(
    null
  );
  const headerTitle =
    role === "PERFORMER"
      ? "일과 칸이 필요한 전문가, "
      : role === "OWNER"
      ? "빈칸을 살리고 싶은 건물주, "
      : "전문가가 필요한 의뢰자, ";

  const fetchProfileInfo = async () => {
    try {
      const response = await api.get("/myprofile");
      if (response.status === 200) {
        setUserInfo(response.data);
      } else {
        const error = await response.data;
        // alert(error.message);
        setModalTitle("지원중인 의뢰");
        setModalText(error.message);
        setIsOpen(true);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      // alert(errorMessage);
      setModalTitle("지원중인 의뢰");
      setModalText(errorMessage);
      setIsOpen(true);
    }
  };
  useEffect(() => {
    fetchProfileInfo();
  }, []);
  // if (userInfo === null) {
  //   return (
  //     <div className={profileStyle.dotSpinner}>
  //       <span></span>
  //       <span></span>
  //       <span></span>
  //     </div>
  //   );
  // }
  return (
    <div className={profileStyle.profileContainer}>
      {isOpen && (
        <div className={modalStyle.overlay}>
          <Modal
            setIsOpen={setIsOpen}
            text={modalText}
            title={modalTitle}
            onConfirm={modalOnConfirm || undefined}
          />
        </div>
      )}
      <div className={profileStyle.profileHeader}>
        <span>
          {headerTitle} {userInfo?.name}님
        </span>
      </div>
      <div className={profileStyle.profileBody}>
        <ProfileContent userInfo={userInfo} role={role} />
      </div>
    </div>
  );
}
