import { useEffect, useState } from "react"; // ✅ useEffect, useState 추가
import { useParams, Link } from "react-router-dom"; // ✅ useParams 추가
import styles from "../../css/pages/jobsSuccessPage.module.css";
import SuccessLogo from "../../assets/success.svg";
import api from "../../api/api"; // ✅ api 불러오기
import Reserving from "../../assets/reserving.svg";
import Modal from "../../components/Modal";
import modalStyle from "../../css/components/modal.module.css";

interface DetailInfo {
  taskId: number;
  title: string;
}
export default function JobsSuccessPage() {
  const { id } = useParams<{ id: string }>();
  const [detailInfo, setDetailInfo] = useState<DetailInfo | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalOnConfirm, setModalOnConfirm] = useState<(() => void) | null>(
    null
  );

  const fetchDetailInfo = async () => {
    console.log(id);
    try {
      const response = await api.get(`/works/${id}`);
      if (response.status === 200) {
        setDetailInfo(response.data);
      } else {
        const error = await response.data;
        // alert(error.message);
        setModalTitle("지원중인 의뢰");
        setModalText(error.message);
        setIsOpen(true);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      // alert(errorMessage);
      setModalTitle("지원중인 의뢰");
      setModalText(errorMessage);
      setIsOpen(true);
    }
  };
  useEffect(() => {
    fetchDetailInfo();
  }, []);
  if (!detailInfo) {
    return <div>일거리 정보를 찾을 수 없습니다.</div>;
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
      <img
        src={SuccessLogo}
        className={styles.logoSize}
        alt="예약 성공 로고"
      ></img>

      <label className={styles.labelSize}>지원 완료되었습니다!</label>
      {/* 명 수정 */}
      <div className={styles.titleBox}>
        <img src={Reserving} className={styles.condition}></img>
        <span className={styles.writer}>
          {detailInfo.title}
          {/* 사업자명 api 값 들어오면 수정해야합니다 */}
        </span>
        <label className={styles.title}>{detailInfo.title}</label>
      </div>
      <Link to="/main/myPage" className={styles.mypageBtn}>
        MYPAGE에서 확인하기 &gt;
      </Link>
    </div>
  );
}
