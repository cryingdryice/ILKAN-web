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
import JobPostPage from "./pages/main/jobPostPage";
import RemodelingIlKanPage from "./pages/main/remodelingIlKanPage";
import JobsSuccessPage from "./pages/main/jobsSuccessPage";
import ShowPerformerList from "./pages/main/performerList";
import KanPostPage from "./pages/main/kanPostPage";
import KanPaymentPage from "./pages/main/kanPaymentPage";
import KanFinalPayPage from "./pages/main/kanFinalPayPage";
import KanSuccessPage from "./pages/main/kanSuccessPage";
import ProtectedRoute from "./protectedRoute"; // ✅ ProtectedRoute를 import 합니다.

export default function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Index />} />
        <Route path="login" element={<Login />} />
        <Route path="main" element={<GlobalLayout />}>
          <Route path="myPage" element={<MyPage />} />
          <Route path="remodelingIlKan" element={<RemodelingIlKanPage />} />
          <Route path="jobs">
            <Route index element={<JobsPage />} />
            <Route path=":id" element={<JobsDetailPage />} />
            <Route path=":id/application" element={<JobsApplicationPage />} />
            <Route
              path=":id/application/success"
              element={<JobsSuccessPage />}
            />
          </Route>
          <Route path="kanMatch">
            <Route index element={<KanMatchPage />} />
            <Route path=":id" element={<KanDetailPage />} />
            <Route path=":id/application" element={<KanPaymentPage />} />
            <Route
              path=":id/application/finalPay"
              element={<KanFinalPayPage />}
            />
            <Route
              path=":id/application/finalPay/success"
              element={<KanSuccessPage />}
            />
          </Route>
          <Route path="jobPost" element={<JobPostPage />} />
          <Route path="performerList/:taskId" element={<ShowPerformerList />} />
          {/* ✅ 'kanPost' 라우트를 ProtectedRoute로 감쌉니다. */}
          <Route
            path="kanPost"
            element={
              <ProtectedRoute allowedRoles={["owner"]}>
                <KanPostPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}
