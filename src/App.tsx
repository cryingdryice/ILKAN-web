import { Route, Routes } from "react-router-dom";
import GlobalLayout from "./layout/GlobalLayout";
import Index from "./pages";
import MyPage from "./pages/main/myPage";
import JobsPage from "./pages/main/jobsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<GlobalLayout />}>
        <Route index element={<Index />} />
        <Route path="main">
          <Route path="myPage" element={<MyPage />} />
          <Route path="jobs" element={<JobsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
