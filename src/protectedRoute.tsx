import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

  const role = useStore((state) => state.role);

  // ✅ 로딩 상태를 추가하여 role이 확정될 때까지 대기합니다.
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // role 값이 변경되면 로딩 상태를 false로 변경합니다.
    if (role !== null) {
      setIsLoading(false);
    }
  }, [role]);

  useEffect(() => {
    // 로딩 중일 때는 권한 확인 로직을 실행하지 않습니다.
    if (isLoading) {
      return;
    }

    if (!role || !allowedRoles.includes(role)) {
      alert("페이지에 접근할 권한이 없습니다. 로그인 페이지로 이동합니다.");
      navigate("/login", { replace: true });
    }
  }, [role, isLoading, navigate, allowedRoles, location.pathname]);

  // ✅ 로딩 중일 경우 아무것도 렌더링하지 않습니다.
  if (isLoading) {
    return null;
  }

  // 권한이 있는 경우에만 children을 렌더링합니다.
  if (role && allowedRoles.includes(role)) {
    return <>{children}</>;
  }

  // 권한이 없으면 null을 반환하여 아무것도 보이지 않게 합니다.
  return null;
}
