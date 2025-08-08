import Profile from "../../components/Profile";
import myPageStyle from "../../css/myPage.module.css";

export default function MyPage() {
  return (
    <div className={myPageStyle.myPageContainer}>
      <Profile />
    </div>
  );
}
