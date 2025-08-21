import { useEffect, useState } from "react"; // ✅ useEffect, useState 추가
import { useParams } from "react-router-dom"; // ✅ useParams 추가
import styles from "../../css/pages/jobsSuccessPage.module.css";
import SuccessLogo from "../../assets/success.svg";
import api from "../../api/api"; // ✅ api 불러오기
interface DetailInfo {
  taskId: number;
  title: string;
}
export default function JobsSuccessPage() {
  const { id } = useParams<{ id: string }>();
  const [detailInfo, setDetailInfo] = useState<DetailInfo | null>(null);

  const fetchDetailInfo = async () => {
    console.log(id);
    try {
      const response = await api.get(`/works/${id}`);
      if (response.status === 200) {
        setDetailInfo(response.data);
      } else {
        const error = await response.data;
        alert(error.message);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      alert(errorMessage);
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
      <img
        src={SuccessLogo}
        className={styles.logoSize}
        alt="예약 성공 로고"
      ></img>

      <label className={styles.labelSize}>예약이 완료되었습니다!</label>
      <div className={styles.reservationBox}>{detailInfo.title}</div>
    </div>
  );
}
