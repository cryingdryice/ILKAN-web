import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import listStyle from "../../css/pages/performerList.module.css";
import select from "../../assets/performerList/selectPerformer.svg";
import unselect from "../../assets/performerList/unselectPerformer.svg";
import api from "../../api/api";

import Modal from "../../components/Modal";
import { useLoading } from "../../context/LoadingContext";

interface Performers {
  performerId: number;
  performerName: string;
  workTitle: string;
  portfolioUrl: string;
}

export default function ShowPerformerList() {
  const location = useLocation();
  const state = location.state;
  const [performers, setPerformers] = useState<Performers[]>([]);
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const handleSelect = (title: string) => {
    setSelectedTitle(title);
    console.log(`Selected Performer Title: ${title}`);
  };

  const fetchPerformerList = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/myprofile/commissions/${taskId}`);
      if (response.status === 200) {
        setPerformers(response.data.content);
        if (response.data.content.length > 0) {
          setSelectedTitle(response.data.content[0].workTitle);
        }
      } else {
        const error = await response.data;
        setModalTitle("수행자 목록");
        setModalText(error.message);
        setIsOpen(true);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      setModalTitle("수행자 목록");
      setModalText(errorMessage);
      setIsOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const selectPerformer = async () => {
    const selectedPerformer = performers.find(
      (p) => p.workTitle === selectedTitle
    );
    const selectedId = selectedPerformer?.performerId;

    if (!selectedId) return;

    setLoading(true);
    try {
      const response = await api.post(
        `/myprofile/commissions/${taskId}/approve/${selectedId}`
      );
      if (response.status === 200) {
        navigate("/main/myPage");
      } else {
        const error = await response.data;
        setModalTitle("수행자 선택");
        setModalText(error.message);
        setIsOpen(true);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      setModalTitle("수행자 선택");
      setModalText(errorMessage);
      setIsOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerformerList();
  }, []);

  return (
    <div className={listStyle.pageContainer}>
      <div className={listStyle.titleDiv}>{state?.title || "수행자 목록"}</div>

      <table>
        <thead>
          <tr>
            <th className={listStyle.headCol1}>기업명/공고</th>
            <th className={listStyle.headCol2}>포트폴리오</th>
            <th className={listStyle.headCol3}>선택</th>
          </tr>
        </thead>

        <tbody>
          {performers.length > 0 ? (
            performers.map((p) => (
              <tr key={p.performerId}>
                {/* 이름과 공고 클릭 시 상세 페이지 이동 */}
                <td className={listStyle.bodyCol1}>
                  <Link
                    to={`/main/performerList/${taskId}/performerDetailList/${p.performerId}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <span className={listStyle.name}>{p.performerName}</span>
                    <span className={listStyle.title}>{p.workTitle}</span>
                  </Link>
                </td>

                {/* 포트폴리오 링크 새 탭으로 열기 */}
                <td className={listStyle.link}>
                  <a
                    href={p.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    포트폴리오 보기
                  </a>
                </td>

                {/* 선택 버튼 */}
                <td
                  onClick={(e) => {
                    e.stopPropagation(); // 링크 클릭과 충돌 방지
                    handleSelect(p.workTitle);
                  }}
                >
                  <img
                    src={selectedTitle === p.workTitle ? select : unselect}
                    alt={selectedTitle === p.workTitle ? "선택" : "미선택"}
                    className={listStyle.img}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className={listStyle.noEmployee}>
                수행자 정보가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className={listStyle.footer}>
        <div className={listStyle.selectBtn} onClick={selectPerformer}>
          전문가 선택
        </div>
      </div>

      {isOpen && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={modalTitle}>
          <p>{modalText}</p>
        </Modal>
      )}
    </div>
  );
}
