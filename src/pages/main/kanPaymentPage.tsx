import styles from "../../css/pages/kanPaymentPage.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DateIcon from "../../assets/date.svg";
import Salary from "../../assets/salary.svg";
import Phone from "../../assets/telephone.svg";
import Email from "../../assets/email.svg";
import CheckIn from "../../assets/check-in.svg";
import CheckOut from "../../assets/check-out.svg";
import api from "../../api/api";
import DateCalendar from "../../components/kanMatch/dateCalender";
import Modal from "../../components/Modal";
import modalStyle from "../../css/components/modal.module.css";
import { useLoading } from "../../context/LoadingContext";

interface KanItem {
  profileImage: string;
  owner: string;
  id: number;
  building_name: string;
  typeLabel: string;
  tag: string;
  address: string;
  price: { amount: number; currency: string; unit: string };
  images: { cover: string; gallery: string[] };
  contact: { email: string; phone: string };
  checkIn: string;
  checkOut: string;
  description: string;
}

interface ReservationCreateResponse {
  reservationId: number;
  buildingId: number;
  performerId: number;
  startTime: string;
  endTime: string;
  reservationStatus: string;
}

export default function KanPaymentPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [kanItem, setKanItem] = useState<KanItem | null>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalOnConfirm, setModalOnConfirm] = useState<(() => void) | null>(
    null
  );

  const { setLoading } = useLoading();

  const fetchKanItem = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/buildings/${id}`);
      if (response.status === 200) {
        setKanItem(response.data);
      } else {
        setIsOpen(true);
        setModalText(response.data.message);
        setModalTitle("KAN MATCH");
      }
    } catch (error: any) {
      setModalText(
        error.response?.data?.message || error.message || "알 수 없는 오류 발생"
      );
      setModalTitle("KAN MATCH");
      setIsOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKanItem();
  }, [id]);

  const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  const handlePayment = async () => {
    if (!selectedStartDate || !selectedEndDate) {
      alert("시작일과 종료일을 모두 선택해주세요.");
      return;
    }
    if (!kanItem?.id) {
      alert("공간 정보를 찾을 수 없습니다.");
      return;
    }

    // "YYYY-MM-DD"
    const formattedStartDate = selectedStartDate.toISOString().split("T")[0];
    const formattedEndDate = selectedEndDate.toISOString().split("T")[0];

    const payload = {
      buildingId: kanItem.id,
      checkInDate: formattedStartDate,
      checkOutDate: formattedEndDate,
    };

    setLoading(true);
    try {
      // ✅ 예약 생성 (스웨거: POST /api/v1/reservations, X-Role: PERFORMER)
      const res = await api.post<ReservationCreateResponse>(
        "/reservations",
        payload,
        {
          headers: { "X-Role": "PERFORMER" },
        }
      );

      const reservationId = (res.data as ReservationCreateResponse)
        ?.reservationId;
      if (!reservationId) {
        alert("예약 ID를 찾을 수 없습니다.");
        return;
      }

      // ✅ 결제 페이지로 이동하며 예약/표시용 데이터 전달
      navigate(`/main/kanMatch/${id}/application/finalPay`, {
        state: {
          address: kanItem.address,
          building_name: kanItem.building_name,
          images: { cover: kanItem.images.cover },
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          price: kanItem.price,
          reservationId, // 결제 단계에서 사용
        },
      });
    } catch (error: any) {
      alert(error?.response?.data?.message || "예약 생성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (!kanItem) return <div>공간 정보를 찾을 수 없습니다.</div>;

  return (
    <div className={styles.container}>
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
        src={kanItem.images.cover}
        className={styles.imageBox}
        alt="상품 커버 이미지"
      />

      {/* 겹치는 UI 부분: 공간 상세 정보 */}
      <div className={styles.kanPosting}>
        <div className={styles.kanPostingAddress}>{kanItem.address}</div>
        <div className={styles.kanPostingSubtitle}>{kanItem.building_name}</div>

        <div className={styles.kanPostingWriter}>
          <img
            src={kanItem.profileImage}
            alt="작성자 아이콘"
            className={styles.Image}
          />
          <div className={styles.kanPostingWriterName}>{kanItem.owner}</div>
        </div>

        <div className={styles.line}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1000"
            height="2"
            viewBox="0 0 1000 2"
            fill="none"
          >
            <path d="M0 1H1000" stroke="#D9D9D9" />
          </svg>
        </div>

        <div className={styles.infoGrid}>
          <div className={styles.infoBox}>
            <img src={DateIcon} className={styles.infoIcon} alt="날짜 아이콘" />
            <div className={styles.infoContent}>
              <label className={styles.infoLabel}>회의실 유형</label>
              <span className={styles.infoDetail}>{kanItem.typeLabel}</span>
            </div>
          </div>

          <div className={styles.infoBox}>
            <img src={Salary} className={styles.infoIcon} alt="대여비 아이콘" />
            <div className={styles.infoContent}>
              <label className={styles.infoLabel}>대여비</label>
              <div className={styles.infoRentalFee}>
                <span className={styles.infoDate}>일/</span>
                <span className={styles.infoRentalFeeValue}>
                  {kanItem.price.amount.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>

          <div className={styles.infoBox}>
            <img src={Email} className={styles.infoIcon} alt="이메일 아이콘" />
            <div className={styles.infoContent}>
              <label className={styles.infoLabel}>이메일</label>
              <span className={styles.infoDetail}>{kanItem.contact.email}</span>
            </div>
          </div>

          <div className={styles.infoBox}>
            <img src={Phone} className={styles.infoIcon} alt="전화기 아이콘" />
            <div className={styles.infoContent}>
              <label className={styles.infoLabel}>전화</label>
              <span className={styles.infoDetail}>{kanItem.contact.phone}</span>
            </div>
          </div>

          <div className={styles.infoBox}>
            <img src={CheckIn} className={styles.infoIcon} alt="입실 아이콘" />
            <div className={styles.infoContent}>
              <label className={styles.infoLabel}>입실시간</label>
              <span className={styles.infoDetail}>오전 08:00 ~</span>
            </div>
          </div>

          <div className={styles.infoBox}>
            <img src={CheckOut} className={styles.infoIcon} alt="퇴실 아이콘" />
            <div className={styles.infoContent}>
              <label className={styles.infoLabel}>퇴실시간</label>
              <span className={styles.infoDetail}>~ 오후 11:00</span>
            </div>
          </div>
        </div>
      </div>

      {/* 결제 UI 부분 */}
      <DateCalendar onDateChange={handleDateChange} />

      <div className={styles.payMentButton} onClick={handlePayment}>
        <div className={styles.font}>결제하기</div>
      </div>
    </div>
  );
}
