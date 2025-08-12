import { FormEvent, useState } from "react";
import loginStyle from "../css/pages/login.module.css";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/sotre";

export default function Login() {
  const login = useStore((state) => state.login);
  const [role, setRole] = useState("undefined");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/main/myPage"); //테스트용
    try {
      const response = await fetch(BASE_URL + "/auth/login", {
        method: "POST",
        headers: {
          "X-Role": role,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const { role, successMessage } = data;
        login(role);
        alert(successMessage);
        navigate("/main/myPage");
      } else {
        const error = await response.json();
        setErrorMessage(error.message);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const roles = [
    { key: "PERFORMER", label: "수행자" },
    { key: "REQUESTER", label: "의뢰자" },
    { key: "OWNER", label: "건물주" },
  ];

  return (
    <form onSubmit={handleSubmit} className={loginStyle.loginForm}>
      <div className={loginStyle.loginContainer}>
        {roles.map(({ key, label }) => (
          <div
            key={key}
            className={`${loginStyle.userItem} ${
              role === key ? loginStyle.userItemSelected : ""
            }`}
            onClick={() => {
              setRole(key);
              console.log(key);
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* 가능한 오류: 서버 연결 실패, userRole 선택 안하고 로그인 정도? */}
      {errorMessage && <span className={loginStyle.error}>{errorMessage}</span>}
      <button type="submit">로그인</button>
    </form>
  );
}
