import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../../css/pages/kanDetailPage.module.css";
import Date from "../../assets/date.svg";
import Salary from "../../assets/salary.svg";
import Phone from "../../assets/telephone.svg";
import Email from "../../assets/email.svg";
import CheckIn from "../../assets/check-in.svg";
import CheckOut from "../../assets/check-out.svg";
import detailInfoSvg from "../../assets/detailInfo.svg";
import Modal from "../../components/Modal";
import modalStyle from "../../css/components/modal.module.css";
import api from "../../api/api";
import { useLoading } from "../../context/LoadingContext"; // ⬅️ 전역 로딩

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

  // 모달 상태
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalOnConfirm, setModalOnConfirm] = useState<(() => void) | null>(
    null
  );

  const { setLoading } = useLoading(); // ⬅️ 전역 스피너 제어

  const fetchKanItem = async (signal?: AbortSignal) => {
    setLoading(true);

    try {
      const response = await api.get(`/buildings/${id}`, { signal });
      if (response.status === 200) {
        setKanItem(response.data);
      } else {
        const error = response.data;
        setModalTitle("공간 상세 정보");
        setModalText(error?.message ?? "공간 상세 정보를 불러오지 못했습니다.");
        setIsOpen(true);
      }
    } catch (error: any) {
      if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
        return; // 취소된 요청은 무시
      }
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      setModalTitle("공간 상세 정보");
      setModalText(errorMessage);
      setIsOpen(true);
    } finally {
      // if (timer) clearTimeout(timer);
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchKanItem(controller.signal);
    return () => controller.abort();
  }, [id]);

  // 최초 로딩 중에는 전역 스피너만 보여주도록 조용히 리턴
  if (!kanItem)
    return (
      <>
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
      </>
    );

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

      <div className={styles.kanPosting}>
        <div className={styles.kanPostingAddress}>{kanItem.address}</div>
        <div className={styles.kanPostingSubtitle}>{kanItem.building_name}</div>

        <div className={styles.kanPostingWriter}>
          <img
            src={kanItem.profileImage}
            alt="작성자 아이콘"
            className={styles.writerImage}
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
                <span className={styles.infoDate}>일 / </span>
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
              <span className={styles.infoDetail}>오후 03:00 ~</span>
            </div>
          </div>

          <div className={styles.infoBox}>
            <img src={CheckOut} className={styles.infoIcon} alt="퇴실 아이콘" />
            <div className={styles.infoContent}>
              <label className={styles.infoLabel}>퇴실시간</label>
              <span className={styles.infoDetail}>~ 오전 11:00</span>
            </div>
          </div>
        </div>
      </div>

      {kanItem.images.gallery.length == 0 ? (
        <></>
      ) : (
        <div className={styles.postingArea}>
          <span className={styles.postingAreaSubtitle}>사진 첨부</span>
          <div className={styles.postingAreaImageGrid}>
            {kanItem.images.gallery.map((img: string, idx: number) => (
              <div key={idx}>
                <img
                  src={img}
                  alt={`갤러리 이미지 ${idx + 1}`}
                  className={styles.postingAreaImageBox}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.detailArea}>
        <span className={styles.detailAreaSubtitle}>
          <img src={detailInfoSvg} alt="상세 설명" />
          <span>상세 설명</span>
        </span>
        <div className={styles.detailAreaContent}>{kanItem.description}</div>
      </div>

      <Link to={`/main/kanMatch/${id}/application`} className={styles.applyBtn}>
        <div className={styles.font}>예약하기</div>
      </Link>
    </div>
  );
}
