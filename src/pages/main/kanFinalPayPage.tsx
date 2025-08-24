import styles from "../../css/pages/kanFinalPayPage.module.css";
import Arrow from "../../assets/arrowRight.svg";
import { useLocation } from "react-router-dom";
import PayHeader from "../../assets/payheader.svg";
import Bank from "../../assets/bank.svg";
import { useState } from "react";

interface FinalPayState {
  address: string;
  building_name: string;
  images: {
    cover: string;
  };
}

const banks = [
  "선택안함",
  "국민은행",
  "신한은행",
  "우리은행",
  "하나은행",
  "농협은행",
  "기업은행",
  "카카오뱅크",
  "케이뱅크",
  "산업은행",
  "수협은행",
  "신협은행",
  "새마을금고",
  "대구은행",
];

export default function KanFinalPayPage() {
  const location = useLocation();
  const { address, building_name, images } = location.state as FinalPayState;

  // 은행 드롭다운 상태
  const [isBankDropdownOpen, setIsBankDropdownOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState("은행 선택");

  const handleBankDropdownClick = () => {
    setIsBankDropdownOpen(!isBankDropdownOpen);
  };

  const handleBankSelect = (bankName: string) => {
    setSelectedBank(bankName);
    setIsBankDropdownOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      {/* 체크인/체크아웃 박스 */}
      <div className={styles.checkInOutBox}>
        <div className={styles.dateBox}>
          <div className={styles.dateStart}>2025년 8월 13일 (수)</div>
          <span className={styles.checkTable}>체크인</span>
        </div>
        <img src={Arrow} className={styles.imgBox} alt="우측화살표" />
        <div className={styles.dateBox}>
          <div className={styles.dateEnd}>2025년 8월 21일 (토)</div>
          <span className={styles.checkTable}>체크아웃</span>
        </div>
        <div className={styles.checkDate}>9일</div>
      </div>

      {/* 장소 정보 */}
      <div className={styles.locationBox}>
        <div className={styles.leftSide}>
          <label className={styles.locationSubtitle}>{address}</label>
          <span className={styles.locationTitle}>{building_name}</span>
          <div className={styles.checkArea}>
            <div className={styles.timeArea}>입실시간</div>
            <div className={styles.timeSet}>오전 8시~</div>
          </div>
          <div className={styles.checkArea}>
            <div className={styles.timeArea}>퇴실시간</div>
            <div className={styles.timeSet}>오후 6시~</div>
          </div>
        </div>
        <div className={styles.rightSide}>
          <img
            src={images.cover}
            alt="공간 이미지"
            className={styles.rightSideImg}
          />
        </div>
      </div>

      {/* 요금 */}
      <div className={styles.totalFeeBox}>
        <div className={styles.Header}>
          <div className={styles.left}>하루대여비</div>
          <div className={styles.middle}>대여일 수</div>
          <div className={styles.right}>합계</div>
        </div>
        <div className={styles.footer}>
          <div className={styles.left}>50,000원</div>
          <div className={styles.middle}>9일</div>
          <div className={styles.rightfee}>450,000원</div>
        </div>
      </div>

      {/* 결제 */}
      <div className={styles.payBox}>
        <div className={styles.payHeader}>
          <img src={PayHeader} className={styles.payImg} alt="결제 헤더" />
          <span className={styles.Subtitle}>신용카드 결제하기</span>
        </div>

        <div className={styles.paymentBox}>
          {/* 은행 선택 */}
          <div className={styles.paymentElementBox}>
            <img src={Bank} className={styles.BoxImage} alt="은행 아이콘" />
            <span className={styles.paymentPhrase}>은행 선택</span>
            <div
              className={`${styles.inputBox} ${styles.dropdownToggle}`}
              onClick={handleBankDropdownClick}
            >
              <div className={styles.dropdownValue}>{selectedBank}</div>
              <div className={styles.dropdownArrow}>&#9660;</div>
            </div>
          </div>
          {isBankDropdownOpen && (
            <div className={styles.dropdownMenu}>
              {banks.map((bank, index) => (
                <div
                  key={index}
                  className={styles.dropdownItem}
                  onClick={() => handleBankSelect(bank)}
                >
                  {bank}
                </div>
              ))}
            </div>
          )}

          {/* 카드 소유자 */}
          <div className={styles.paymentElementBox}>
            <img src={Bank} className={styles.BoxImage} alt="카드 소유자" />
            <span className={styles.paymentPhrase}>카드 명의자 이름</span>
            <div className={styles.inputBox}>
              <input
                className={styles.content}
                placeholder="카드 명의자 이름"
              />
            </div>
          </div>

          {/* 카드 번호 (기본 input으로 변경) */}
          <div className={styles.paymentElementBox}>
            <img src={Bank} className={styles.BoxImage} alt="카드 번호" />
            <span className={styles.paymentPhrase}>카드 번호</span>
            <div className={styles.inputBox}>
              <input
                type="text"
                className={styles.content}
                placeholder="0000-0000-0000-0000"
              />
            </div>
          </div>

          {/* 카드 유효기간 / CVC */}
          <div className={styles.paymentLayout}>
            <div className={styles.paymentElementHalfBox}>
              <img
                src={Bank}
                className={styles.BoxImage}
                alt="카드 유효 기간"
              />
              <span className={styles.paymentPhrase}>카드 유효 기간</span>
              <div className={styles.inputBoxHalf}>
                <input className={styles.content} placeholder="MM/YY(월/년)" />
              </div>
            </div>
            <div className={styles.paymentElementHalfBox}>
              <img src={Bank} className={styles.BoxImage} alt="CVC/CVV" />
              <span className={styles.paymentPhrase}>cvc/cvv/ccv</span>
              <div className={styles.inputBoxHalf}>
                <input
                  className={styles.content}
                  placeholder="카드 뒷면 마지막 3자리"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
