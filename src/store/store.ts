import { useEffect, useState } from "react";
import { create } from "zustand";
import { useNavigate } from "react-router-dom";

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

  login: (role, userName) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userName", userName);
      localStorage.setItem("role", role);
    }

    set(() => ({
      role,
    }));
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("role");
      localStorage.removeItem("userName");
    }

    set(() => ({
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
      const storedRole = localStorage.getItem("role");
      const storedUserName = localStorage.getItem("userName");

      if (storedRole && storedUserName) {
        // localStorage에서 값이 있으면 상태에 반영
        login(storedRole, storedUserName);
      } else {
        // 로그인하지 않은 경우 로그인 페이지로 리디렉션
        navigate("/login");
      }
    }
  }, [login, navigate]); // 로그인 상태 변경 시 다시 실행
};

export { useStore, useLocalStorage };
