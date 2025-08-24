import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "./store/store";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export default function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { role, logout } = useStore((state) => ({
    role: state.role,
    logout: state.logout,
  }));

  useEffect(() => {
    // 역할이 없거나 허용된 역할에 포함되지 않으면 로그아웃 후 리다이렉트
    if (!role || !allowedRoles.includes(role)) {
      alert(
        "페이지에 접근할 권한이 없습니다. 로그아웃 후 로그인 페이지로 이동합니다."
      );
      logout();
      navigate("/login");
    }
  }, [role, navigate, logout, allowedRoles]);

  // 역할이 허용되면 children(하위 컴포넌트)를 렌더링
  if (role && allowedRoles.includes(role)) {
    return <>{children}</>;
  }

  // 권한이 없는 경우, 페이지가 렌더링되기 전에 null을 반환하여 공백 방지
  return null;
}
