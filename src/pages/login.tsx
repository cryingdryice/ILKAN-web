import { FormEvent, useEffect, useRef, useState } from "react";
import loginStyle from "../css/pages/login.module.css";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/store";
import logoIcon from "../assets/logo-icon.svg";
import performerIcon from "../assets/performerLogin-icon.svg";
import ownerIcon from "../assets/ownerLogin-icon.svg";
import requesterIcon from "../assets/requesterLogin-icon.svg";
import Modal from "../components/Modal";
import modalStyle from "../css/components/modal.module.css";
import performerUnselected from "../assets/performerUnselected.svg";
import ownerUnselected from "../assets/ownereUnselected.svg";
import requesterUnselected from "../assets/requesterUnselected.svg";

export default function Login() {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);
  const login = useStore((state) => state.login);
  const [role, setRole] = useState("undefined");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalOnConfirm, setModalOnConfirm] = useState<(() => void) | null>(
    null
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(role);
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
        const { role, name } = data;
        login(role, name);
        setIsOpen(true);
        setModalText("로그인 성공했습니다.");
        setModalTitle("로그인");
        setModalOnConfirm(() => () => navigate("/main/myPage"));
        // navigate("/main/myPage");
      } else {
        const error = await response.json();

        setIsOpen(true);
        setModalText(error.message);
        setModalTitle("로그인 오류");
      }
    } catch (error: any) {
      setIsOpen(true);
      setModalText(error.message);
      setModalTitle("로그인 오류");
    }
  };

  const roles = [
    {
      key: "PERFORMER",
      selectedImg: performerIcon,
      unselectedImg: performerUnselected,
      label: "수행자",
      subLabel: "일과 칸이 필요한 ",
    },
    {
      key: "OWNER",
      selectedImg: ownerIcon,
      unselectedImg: ownerUnselected,
      label: "건물주",
      subLabel: "빈칸을 살리고싶은",
    },
    {
      key: "REQUESTER",
      selectedImg: requesterIcon,
      unselectedImg: requesterUnselected,
      label: "의뢰자",
      subLabel: "전문가를 필요로 하는 ",
    },
  ];

  return (
    <div className={loginStyle.loginContainer}>
      {isOpen && (
        <div className={modalStyle.overlay}>
          <Modal
            setIsOpen={setIsOpen}
            text={modalText}
            title={modalTitle}
            onConfirm={modalOnConfirm || undefined}
          />
        </div>
      )}
      <form onSubmit={handleSubmit} className={loginStyle.loginForm}>
        <div className={loginStyle.loginHeader}>
          <img src={logoIcon} alt="ILKAN Logo" />
          <span>어떤 유형의 사용자인지 골라주세요</span>
        </div>
        <div className={loginStyle.selectContainer}>
          {roles.map(({ key, label, selectedImg, unselectedImg, subLabel }) => {
            const isUnselected =
              role !== "undefined"
                ? role !== key
                : hoveredRole !== null && hoveredRole !== key;

            return (
              <div
                key={key}
                className={`${loginStyle.userItem} ${
                  role === key ? loginStyle.userItemSelected : ""
                }`}
                onMouseEnter={() => setHoveredRole(key)}
                onMouseLeave={() => setHoveredRole(null)}
                onClick={() => setRole(key)}
                style={{
                  transform: isUnselected ? "scale(0.95)" : "scale(1)",
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                <img
                  src={isUnselected ? unselectedImg : selectedImg}
                  alt={`${label} Icon`}
                  style={{
                    transition:
                      "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
                    transform: isUnselected ? "scale(0.95)" : "scale(1)",
                    opacity: isUnselected ? 0.8 : 1,
                  }}
                />
                <span
                  className={loginStyle.subLabel}
                  style={{
                    color: isUnselected ? "#647B99" : "inherit",
                    transition: "color 0.3s ease-in-out",
                  }}
                >
                  {subLabel}
                </span>
                <span
                  className={loginStyle.label}
                  style={{
                    color: isUnselected ? "#647B99" : "inherit",
                    transition: "color 0.3s ease-in-out",
                  }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        <div className={loginStyle.loginFooter}>
          <button type="submit">로그인</button>
        </div>
      </form>
    </div>
  );
}
