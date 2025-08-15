import ApplicationIlKan from "../../components/myPage/ApplicationIlKan";
import ApplicationWork from "../../components/myPage/ApplicationWork";
import Profile from "../../components/myPage/Profile";
import ProgressingIlKan from "../../components/myPage/ProgressingIlKan";
import ProgressingWork from "../../components/myPage/ProgressingWork";
import myPageStyle from "../../css/pages/myPage.module.css";

export default function MyPage() {
  return (
    <div className={myPageStyle.myPageContainer}>
      <Profile />
      <ProgressingWork />
      <ProgressingIlKan />
      <ApplicationWork />
      <ApplicationIlKan />
    </div>
  );
}
