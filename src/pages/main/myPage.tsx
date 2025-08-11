import ApplicationWork from "../../components/ApplicationWork";
import Profile from "../../components/Profile";
import ProgressingIlKan from "../../components/progressingIlKan";
import ProgressingWork from "../../components/ProgressingWork";
import myPageStyle from "../../css/pages/myPage.module.css";

export default function MyPage() {
  return (
    <div className={myPageStyle.myPageContainer}>
      <Profile />
      <ProgressingWork />
      <ProgressingIlKan />
      <ApplicationWork />
    </div>
  );
}
