import ApplicationIlKan from "../../components/myPage/ApplicationIlKan";
import ApplicationWork from "../../components/myPage/ApplicationWork";
import Profile from "../../components/myPage/Profile";
import ProgressingIlKan from "../../components/myPage/ProgressingIlKan";
import ProgressingWork from "../../components/myPage/ProgressingWork";
import myPageStyle from "../../css/pages/myPage.module.css";

import { useStore } from "../../store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const navigate = useNavigate();
  const { isLogin } = useStore();
  const storedRole = localStorage.getItem("role");

  useEffect(() => {
    console.log("실행");
    if (!isLogin() && !storedRole && storedRole === "undefined") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className={myPageStyle.myPageContainer}>
      <Profile role={storedRole} />
      <ProgressingWork role={storedRole} />
      <ProgressingIlKan role={storedRole} />
      <ApplicationWork role={storedRole} />
      <ApplicationIlKan role={storedRole} />
    </div>
  );
}
