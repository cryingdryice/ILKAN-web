import { FormEvent, useEffect, useRef, useState } from "react";
import loginStyle from "../css/pages/login.module.css";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/store";
import logoIcon from "../assets/logo-icon.svg";
import performerIcon from "../assets/performerLogin-icon.svg";
import ownerIcon from "../assets/ownerLogin-icon.svg";
import requesterIcon from "../assets/requesterLogin-icon.svg";

export default function Login() {
  const login = useStore((state) => state.login);
  const [role, setRole] = useState("undefined");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const selectContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectContainerRef.current &&
        !selectContainerRef.current.contains(event.target as Node)
      ) {
        setRole("undefined");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // navigate("/main/myPage"); //테스트용
    try {
      const response = await fetch(BASE_URL + "/auth/login", {
        method: "POST",
        headers: {
          "X-Role": role,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const { role, message } = data;
        login(role);
        alert(message);
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
    {
      key: "PERFORMER",
      img: performerIcon,
      label: "수행자",
      subLabel: "일과 칸이 필요한 ",
    },
    {
      key: "OWNER",
      img: ownerIcon,
      label: "건물주",
      subLabel: "빈칸을 살리고싶은",
    },
    {
      key: "REQUESTER",
      img: requesterIcon,
      label: "의뢰자",
      subLabel: "전문가를 필요로 하는 ",
    },
  ];

  return (
    <div className={loginStyle.loginContainer}>
      <form onSubmit={handleSubmit} className={loginStyle.loginForm}>
        <div className={loginStyle.loginHeader}>
          <img src={logoIcon} alt="ILKAN Logo" />
          <span>어떤 유형의 사용자 인지 골라주세요</span>
        </div>
        <div className={loginStyle.selectContainer} ref={selectContainerRef}>
          {roles.map(({ key, label, img, subLabel }) => (
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
              <img src={img} alt={`${label} Icon`} />
              <span className={loginStyle.subLabel}>{subLabel}</span>
              <span className={loginStyle.label}>{label}</span>
            </div>
          ))}
        </div>

        <div className={loginStyle.loginFooter}>
          <button type="submit">로그인</button>
          {errorMessage && (
            <span className={loginStyle.error}>{errorMessage}</span>
          )}
        </div>
      </form>
    </div>
  );
}
