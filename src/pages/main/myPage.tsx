import ApplicationIlKan from "../../components/myPage/ApplicationIlKan";
import ApplicationWork from "../../components/myPage/ApplicationWork";
import Profile from "../../components/myPage/Profile";
import ProgressingIlKan from "../../components/myPage/ProgressingIlKan";
import ProgressingWork from "../../components/myPage/ProgressingWork";
import BorrowingIlKan from "../../components/myPage/BorrowingIlKan";
import RegisteredIlKan from "../../components/myPage/RegisteredIlKan";
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
    // "ApplicationIlKan",
  ],
  REQUESTER: ["Profile"],
  OWNER: ["Profile", "BorrowingIlKan", "RegisteredIlKan"],
};

const componentMap = {
  Profile: Profile,
  ProgressingWork: ProgressingWork,
  ProgressingIlKan: ProgressingIlKan,
  ApplicationWork: ApplicationWork,
  // ApplicationIlKan: ApplicationIlKan,
  RegisteredIlKan: RegisteredIlKan,
  BorrowingIlKan: BorrowingIlKan,
};
export default function MyPage() {
  useLocalStorage();
  const navigate = useNavigate();
  const { isLogin } = useStore();
  const storedRole = localStorage.getItem("role");

  const effectiveRole =
    storedRole && (roleComponentsMap as any)[storedRole] ? storedRole : null;

  useEffect(() => {
    if (!isLogin() || !storedRole || storedRole === "undefined") {
      navigate("/login");
    }
  }, [navigate, isLogin, effectiveRole]);

  const componentsToRender =
    roleComponentsMap[effectiveRole as keyof typeof roleComponentsMap] || [];

  if (!effectiveRole) {
    return null; // 역할이 없으면 아무것도 렌더링하지 않음
  }

  return (
    <div className={myPageStyle.myPageContainer}>
      {componentsToRender.map((componentName) => {
        const Component =
          componentMap[componentName as keyof typeof componentMap];
        if (!Component) return null;
        return <Component key={componentName} role={effectiveRole} />;
      })}
    </div>
  );
}
