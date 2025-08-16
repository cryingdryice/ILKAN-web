import ApplicationIlKan from "../../components/myPage/ApplicationIlKan";
import ApplicationWork from "../../components/myPage/ApplicationWork";
import Profile from "../../components/myPage/Profile";
import ProgressingIlKan from "../../components/myPage/ProgressingIlKan";
import ProgressingWork from "../../components/myPage/ProgressingWork";
import myPageStyle from "../../css/pages/myPage.module.css";

import { useStore } from "../../store/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const navigate = useNavigate();
  const { isLogin } = useStore();
  const storedRole = localStorage.getItem("role");

  // 각 컴포넌트의 로딩 상태를 관리하는 상태
  const [loadingStatus, setLoadingStatus] = useState({
    profile: false,
    progressingWork: false,
    progressingIlKan: false,
    applicationWork: false,
    applicationIlKan: false,
  });

  // 모든 컴포넌트의 로딩이 완료되었는지 확인
  const isLoaded = Object.values(loadingStatus).every((status) => status);

  const handleComponentLoad = (componentName: string) => {
    setLoadingStatus((prevStatus) => ({
      ...prevStatus,
      [componentName]: true,
    }));
  };

  useEffect(() => {
    if (!isLogin() && !storedRole && storedRole === "undefined") {
      navigate("/login");
    }
  }, [navigate, isLogin, storedRole]);

  // if (!isLoaded) {
  //   return <div>로딩 중...</div>;
  // }

  return (
    <div className={myPageStyle.myPageContainer}>
      {isLogin() && storedRole === "PERFORMER" ? (
        <>
          <Profile
            role={storedRole}
            onLoaded={() => handleComponentLoad("profile")}
          />
          <ProgressingWork
            role={storedRole}
            onLoaded={() => handleComponentLoad("progressingWork")}
          />
          <ProgressingIlKan
            role={storedRole}
            onLoaded={() => handleComponentLoad("progressingIlKan")}
          />
          <ApplicationWork
            role={storedRole}
            onLoaded={() => handleComponentLoad("applicationWork")}
          />
          <ApplicationIlKan
            role={storedRole}
            onLoaded={() => handleComponentLoad("applicationIlKan")}
          />
        </>
      ) : isLogin() && storedRole === "REQUESTER" ? (
        <>
          <div>의뢰자</div>
        </>
      ) : (
        <div>건물주</div>
      )}
    </div>
  );
}
