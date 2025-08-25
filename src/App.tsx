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
import ProtectedRoute from "./protectedRoute";
import { useLocalStorage } from "./store/store";
import PerformerDetailPage from "./pages/main/performerDetailList";

export default function App() {
  useLocalStorage();

  return (
    <Routes>
      <Route path="/">
        <Route index element={<Index />} />
        <Route path="login" element={<Login />} />
        <Route path="main" element={<GlobalLayout />}>
          <Route path="myPage" element={<MyPage />} />
          <Route
            path="remodelingIlKan"
            element={
              <ProtectedRoute allowedRoles={["OWNER"]}>
                <RemodelingIlKanPage />
              </ProtectedRoute>
            }
          />
          <Route path="jobs">
            <Route index element={<JobsPage />} />
            <Route path=":id" element={<JobsDetailPage />} />
            <Route
              path=":id/application"
              element={
                <ProtectedRoute allowedRoles={["PERFORMER"]}>
                  <JobsApplicationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path=":id/application/success"
              element={<JobsSuccessPage />}
            />
          </Route>
          <Route path="kanMatch">
            <Route index element={<KanMatchPage />} />
            <Route path=":id" element={<KanDetailPage />} />
            <Route
              path=":id/application"
              element={
                <ProtectedRoute allowedRoles={["PERFORMER"]}>
                  <KanPaymentPage />
                </ProtectedRoute>
              }
            />
            {/* ✅ KanFinalPayPage 라우트를 PERFORMER 역할로 감쌉니다. */}
            <Route
              path=":id/application/finalPay"
              element={
                <ProtectedRoute allowedRoles={["PERFORMER"]}>
                  <KanFinalPayPage />
                </ProtectedRoute>
              }
            />
            <Route
              path=":id/application/finalPay/success"
              element={<KanSuccessPage />}
            />
          </Route>
          <Route
            path="jobPost"
            element={
              <ProtectedRoute allowedRoles={["REQUESTER"]}>
                <JobPostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="performerList/:taskId"
            element={
              <ProtectedRoute allowedRoles={["REQUESTER"]}>
                <ShowPerformerList />
              </ProtectedRoute>
            }
          />
          <Route
            path="performerList/:taskId/performerDetailList/:performerId"
            element={
              <ProtectedRoute allowedRoles={["REQUESTER"]}>
                <PerformerDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="kanPost"
            element={
              <ProtectedRoute allowedRoles={["OWNER"]}>
                <KanPostPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}
