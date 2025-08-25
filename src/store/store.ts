import { useEffect } from "react";
import { create } from "zustand";

// 상태 타입 정의
interface Store {
  role: string | null;
  userName: string | null;
  login: (role: string, userName: string) => void;
  logout: () => void;
  isLogin: () => boolean;
}

// zustand 스토어 생성
const useStore = create<Store>((set, get) => ({
  role: null,
  userName: null,

  login: (role: string, userName: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("role", role);
      localStorage.setItem("userName", userName);
    }
    set(() => ({
      role,
      userName,
    }));
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("role");
      localStorage.removeItem("userName");
    }
    set(() => ({
      role: null,
      userName: null,
    }));
  },

  isLogin: () => get().role !== null,
}));

// ✅ localStorage와 Zustand 스토어 동기화 훅//
const useLocalStorage = () => {
  const { login } = useStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("role");
      const storedUserName = localStorage.getItem("userName");
      if (storedRole && storedUserName) {
        login(storedRole, storedUserName);
      }
    }
  }, [login]);
};

export { useStore, useLocalStorage };
