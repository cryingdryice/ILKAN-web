import styles from "../../css/pages/kanPaymentPage.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Date from "../../assets/date.svg";
import Salary from "../../assets/salary.svg";
import Phone from "../../assets/telephone.svg";
import Email from "../../assets/email.svg";
import CheckIn from "../../assets/check-in.svg";
import CheckOut from "../../assets/check-out.svg";
import api from "../../api/api";
import DateCalendar from "../../components/kanMatch/dateCalender";

interface KanItem {
  profileImage: string;
  owner: string;
  id: number;
  building_name: string;
  typeLabel: string;
  tag: string;
  address: string;
  price: {
    amount: number;
    currency: string;
    unit: string;
  };
  images: {
    cover: string;
    gallery: string[];
  };
  contact: {
    email: string;
    phone: string;
  };
  checkIn: string;
  checkOut: string;
  description: string;
}

export default function KanPaymentPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [kanItem, setKanItem] = useState<KanItem | null>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const fetchKanItem = async () => {
    try {
      const response = await api.get(`/buildings/${id}`);
      if (response.status === 200) {
        setKanItem(response.data);
      } else {
        alert(response.data.message);
      }
    } catch (error: any) {
      alert(
        error.response?.data?.message || error.message || "알 수 없는 오류 발생"
      );
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

    // 날짜를 "YYYY-MM-DD" 형식의 문자열로 변환
    const formattedStartDate = selectedStartDate.toISOString().split("T")[0];
    const formattedEndDate = selectedEndDate.toISOString().split("T")[0];

    const reservationData = {
      buildingId: kanItem?.id,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };

    // ✅ API 통신이 아직 구현되지 않았으므로 주석 처리하고 더미 코드로 대체
    console.log("백엔드로 보낼 예약 데이터:", reservationData);

    // try {
    //   const response = await api.post("/reservations", reservationData);
    //   if (response.status === 201) {
    //     alert("예약 정보가 성공적으로 전송되었습니다.");
    //     navigate(`/main/kanMatch/${id}/application/finalPay`);
    //   } else {
    //     alert(response.data.message || "예약 정보 전송 실패");
    //   }
    // } catch (error) {
    //   alert("예약 정보 전송 중 오류가 발생했습니다.");
    // }

    //  더미(dummy) 코드: 1초 후 성공 메시지를 띄우고 페이지 이동
    setTimeout(() => {
      alert("예약 정보가 성공적으로 전송되었습니다.");
      navigate(`/main/kanMatch/${id}/application/finalPay`);
    }, 1000);
  };

  if (!kanItem) return <div>공간 정보를 찾을 수 없습니다.</div>;

  return (
    <div className={styles.container}>
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
            <img src={Date} className={styles.infoIcon} alt="날짜 아이콘" />
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
                  {kanItem.price.amount}원
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
              <span className={styles.infoDetail}>{kanItem.checkIn}~</span>
            </div>
          </div>

          <div className={styles.infoBox}>
            <img src={CheckOut} className={styles.infoIcon} alt="퇴실 아이콘" />
            <div className={styles.infoContent}>
              <label className={styles.infoLabel}>퇴실시간</label>
              <span className={styles.infoDetail}>~/{kanItem.checkOut}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 결제 UI 부분 */}
      <div className={styles.rentalBox}>
        <label className={styles.rentalLabelBox}>예약날짜</label>
        <div className={styles.rentalCalender}>
          <DateCalendar onDateChange={handleDateChange} />
        </div>
      </div>
      <div className={styles.payMentButton} onClick={handlePayment}>
        <div className={styles.font}>결제하기</div>
      </div>
      {/*이 부분 링크로 바꾸어 수정하면 됩니다. */}
    </div>
  );
}
