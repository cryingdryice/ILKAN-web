import { useEffect } from "react";
import { create } from "zustand";

// 상태 타입 정의
interface Store {
  role: string | null;
  login: (role: string) => void;
  logout: () => void;
  isLogin: () => boolean;
}

// zustand 스토어 생성
const useStore = create<Store>((set, get) => ({
  role: null,

  login: (role) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("role", role);
    }
    set(() => ({
      role,
    }));
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("role");
    }
    set(() => ({
      role: null,
    }));
  },

  isLogin: () => get().role !== null,
}));

// ✅ 역할: localStorage와 Zustand 스토어를 동기화합니다.
// ✅ useNavigate와 리다이렉션 로직이 없습니다.
const useLocalStorage = () => {
  const { login } = useStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("role");
      if (storedRole) {
        login(storedRole);
      }
    }
  }, [login]);
};

export { useStore, useLocalStorage };
