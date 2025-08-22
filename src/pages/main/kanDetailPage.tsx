import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../../css/pages/kanDetailPage.module.css";
import Date from "../../assets/date.svg";
import Salary from "../../assets/salary.svg";
import Phone from "../../assets/telephone.svg";
import Email from "../../assets/email.svg";
import CheckIn from "../../assets/check-in.svg";
import CheckOut from "../../assets/check-out.svg";

import api from "../../api/api";

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

export default function KanDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [kanItem, setKanItem] = useState<KanItem | null>(null);

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

  if (!kanItem) return <div>공간 정보를 찾을 수 없습니다.</div>;

  return (
    <div className={styles.container}>
      <img
        src={kanItem.images.cover}
        className={styles.imageBox}
        alt="상품 커버 이미지"
      />

      <div className={styles.kanPosting}>
        <div className={styles.kanPostingAddress}>{kanItem.address}</div>
        <div className={styles.kanPostingSubtitle}>{kanItem.building_name}</div>

        <div className={styles.kanPostingWriter}>
          <img src={kanItem.profileImage} alt="작성자 아이콘" />
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
                <span className={styles.infoDate}>{kanItem.price.unit}/</span>
                <span className={styles.infoRentalFeeValue}>
                  {kanItem.price.amount}
                  {kanItem.price.currency}
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

      <div className={styles.postingArea}>
        <span className={styles.postingAreaSubtitle}>사진 첨부</span>
        <div className={styles.postingAreaImageGrid}>
          {kanItem.images.gallery.map((img: string, idx: number) => (
            <div key={idx}>
              <img
                src={img} // 배열에서 현재 이미지 URL 사용
                alt={`갤러리 이미지 ${idx + 1}`}
                className={styles.postingAreaImageBox}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.detailArea}>
        <span className={styles.detailAreaSubtitle}>상세설명</span>
        <div className={styles.detailAreaContent}>{kanItem.description}</div>
      </div>
      <Link to={`/main/kanMatch/${id}/application`} className={styles.applyBtn}>
        지원하기
      </Link>
    </div>
  );
}
