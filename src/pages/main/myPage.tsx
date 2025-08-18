import ApplicationIlKan from "../../components/myPage/ApplicationIlKan";
import ApplicationWork from "../../components/myPage/ApplicationWork";
import Profile from "../../components/myPage/Profile";
import ProgressingIlKan from "../../components/myPage/ProgressingIlKan";
import ProgressingWork from "../../components/myPage/ProgressingWork";
import UsedIlKan from "../../components/myPage/UsedIlKan";
import myPageStyle from "../../css/pages/myPage.module.css";
import { useStore, useLocalStorage } from "../../store/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const roleComponentsMap = {
  PERFORMER: [
    "Profile",
    "ProgressingWork",
    "ProgressingIlKan",
    "ApplicationWork",
    "ApplicationIlKan",
  ],
  REQUESTER: ["Profile"],
  OWNER: ["Profile", "UsedIlKan"],
};

const componentMap = {
  Profile: Profile,
  ProgressingWork: ProgressingWork,
  ProgressingIlKan: ProgressingIlKan,
  ApplicationWork: ApplicationWork,
  ApplicationIlKan: ApplicationIlKan,
  UsedIlKan: UsedIlKan,
};

export default function MyPage() {
  useLocalStorage();
  const navigate = useNavigate();
  const { isLogin } = useStore();
  const storedRole = localStorage.getItem("role");

  // 타입 가드사용함
  const effectiveRole =
    storedRole && (roleComponentsMap as any)[storedRole] ? storedRole : null;

  const [loadingStatus, setLoadingStatus] = useState({});

  const handleComponentLoad = (componentName: string) => {
    setLoadingStatus((prevStatus) => ({
      ...prevStatus,
      [componentName]: true,
    }));
  };

  useEffect(() => {
    if (!effectiveRole || !isLogin()) {
      navigate("/login");
      return;
    }

    const componentsToLoad =
      roleComponentsMap[effectiveRole as keyof typeof roleComponentsMap] || [];
    const initialStatus = componentsToLoad.reduce((acc, comp) => {
      acc[comp] = false;
      return acc;
    }, {} as Record<string, boolean>);
    setLoadingStatus(initialStatus);
  }, [navigate, isLogin, effectiveRole]);

  const isLoaded =
    Object.keys(loadingStatus).length > 0 &&
    Object.values(loadingStatus).every((status) => status);
  // if (!isLoaded) {
  //   return <div>로딩 중...</div>;
  // }

  const componentsToRender =
    roleComponentsMap[effectiveRole as keyof typeof roleComponentsMap] || [];

  return (
    <div className={myPageStyle.myPageContainer}>
      {componentsToRender.map((componentName) => {
        const Component =
          componentMap[componentName as keyof typeof componentMap];
        if (!Component) return null;
        return (
          <Component
            key={componentName}
            role={effectiveRole}
            onLoaded={() => handleComponentLoad(componentName)}
          />
        );
      })}
    </div>
  );
}
