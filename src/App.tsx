// src/App.tsx
import { Route, Routes } from "react-router-dom";
import GlobalLayout from "./layout/GlobalLayout";
import Index from "./pages";
import MyPage from "./pages/main/myPage";
import Login from "./pages/login";
import JobsPage from "./pages/main/jobsPage";
import JobsDetailPage from "./pages/main/jobsDetailPage";
import JobsApplicationPage from "./pages/main/jobsApplicationPage";
import KanMatchPage from "./pages/main/kanMatchPage";
import KanDetailPage from "./pages/main/kanDetailPage";

export default function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Index />} />
        <Route path="login" element={<Login />} />
        <Route path="main" element={<GlobalLayout />}>
          <Route path="myPage" element={<MyPage />} />

          {/* 잡 관련 라우트를 논리적으로 묶어주어 보기 편하게 만듭니다. */}
          <Route path="jobs">
            <Route index element={<JobsPage />} />
            <Route path=":id" element={<JobsDetailPage />} />
            {/* 자식 라우트도 독립적인 페이지로 렌더링됩니다. */}
            <Route path=":id/application" element={<JobsApplicationPage />} />
          </Route>

          <Route path="kanMatch">
            <Route index element={<KanMatchPage />} />
            <Route path=":id" element={<KanDetailPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
