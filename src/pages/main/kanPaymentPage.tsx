import styles from "../../css/pages/kanPaymentPage.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Date from "../../assets/date.svg";
import Salary from "../../assets/salary.svg";
import Phone from "../../assets/telephone.svg";
import Email from "../../assets/email.svg";
import CheckIn from "../../assets/check-in.svg";
import CheckOut from "../../assets/check-out.svg";
import api from "../../api/api";
import DateCalendar from "../../components/kanMatch/dateCalender"; // DateCalendar 컴포넌트 import

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
    console.log("시작일:", startDate);
    console.log("종료일:", endDate);
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
      <div className={styles.payMentButton}>결제하기</div>
    </div>
  );
}
