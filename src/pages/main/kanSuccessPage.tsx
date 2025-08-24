import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "../../css/pages/kanSuccessPage.module.css";
import SuccessLogo from "../../assets/success.svg";
import api from "../../api/api";
import Reserving from "../../assets/reserving.svg";
import Modal from "../../components/Modal";
import modalStyle from "../../css/components/modal.module.css";

interface KanInfo {
  id: number;
  building_name: string;
  images: {
    cover: string;
    gallery: string[];
  };
  address: string;
}

export default function JobsSuccessPage() {
  const { id } = useParams<{ id: string }>();
  const [kanInfo, setKanInfo] = useState<KanInfo | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalOnConfirm, setModalOnConfirm] = useState<(() => void) | null>(
    null
  );

  /** 공간 정보 */
  const fetchKanInfo = async () => {
    try {
      const response = await api.get(`/buildings/${id}`);
      if (response.status === 200) {
        setKanInfo(response.data);
      } else {
        const error = await response.data;
        setModalTitle("공간 상세 정보");
        setModalText(error.message);
        setIsOpen(true);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      setModalTitle("공간 상세 정보");
      setModalText(errorMessage);
      setIsOpen(true);
    }
  };

  /** API 호출 */
  useEffect(() => {
    if (!id) return;
    fetchKanInfo();
  }, [id]);

  if (!kanInfo) {
    return <div>공간 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.wrapper}>
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
      <img src={SuccessLogo} className={styles.logoSize} alt="예약 성공 로고" />
      <label className={styles.labelSize}>지원 완료되었습니다!</label>
      <div className={styles.titleBox}>
        <div className={styles.leftBox}>
          <img src={Reserving} className={styles.condition} alt="진행 중" />
          <label className={styles.address}>{kanInfo.address}</label>
          <label className={styles.title}>{kanInfo.building_name}</label>
          <div className={styles.date}>2025/08/13/수 ~ 2025/08/21/토</div>
        </div>
        <img src={kanInfo.images.cover} className={styles.imgBox}></img>
      </div>
      <Link to="/main/myPage" className={styles.mypageBtn}>
        MYPAGE에서 확인하기 &gt;
      </Link>
    </div>
  );
}
