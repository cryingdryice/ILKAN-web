import { useEffect, useState } from "react";
import { create } from "zustand";
import { useNavigate } from "react-router-dom";

// 상태 타입 정의
interface Store {
  userName: string | null;
  role: string | null;

  login: (userName: string, role: string) => void;
  logout: () => void;
  isLogin: () => boolean;
}

// zustand 스토어 생성
const useStore = create<Store>((set, get) => ({
  userName: null,
  role: null,

  login: (userName, role) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userName", userName);
      localStorage.setItem("role", role);
    }

    set(() => ({
      userName,
      role,
    }));
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userName");
      localStorage.removeItem("role");
    }

    set(() => ({
      userName: null,
      role: null,
    }));
  },

  isLogin: () => get().role !== null,
}));

const useLocalStorage = () => {
  const navigate = useNavigate();
  const { login } = useStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserName = localStorage.getItem("userName");
      const storedRole = localStorage.getItem("role");

      if (storedUserName && storedRole) {
        // localStorage에서 값이 있으면 상태에 반영
        login(storedUserName, storedRole);
      } else {
        // 로그인하지 않은 경우 로그인 페이지로 리디렉션
        navigate("/login");
      }
    }
  }, [login, navigate]); // 로그인 상태 변경 시 다시 실행
};

export { useStore, useLocalStorage };
