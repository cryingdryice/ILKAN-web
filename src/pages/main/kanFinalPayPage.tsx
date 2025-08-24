import styles from "../../css/pages/kanFinalPayPage.module.css";
import Arrow from "../../assets/arrowRight.svg";
import { useLocation, Link, useParams } from "react-router-dom";
import PayHeader from "../../assets/payheader.svg";
import Bank from "../../assets/bank.svg";
import { useState } from "react";
import simpleHeader from "../../assets/simplePage.svg";

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

const simpleOptions = [
  "선택안함",
  "네이버페이",
  "카카오페이",
  "토스",
  "삼성페이",
  "페이코",
];

export default function KanFinalPayPage() {
  const { id } = useParams<{ id: string }>();
  const [values, setValues] = useState({
    cardBack: "",
    pin: "",
  });

  // 새로운 상태 추가: 카드 번호, 유효기간, CVC
  const [cardNumber, setCardNumber] = useState(["", "", "", ""]);
  const [expDate, setExpDate] = useState("");
  const [cvc, setCvc] = useState("");

  const handleChange =
    (field: string, maxLength: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const filtered = e.target.value.replace(/\D/g, "").slice(0, maxLength);
      setValues((prev) => ({ ...prev, [field]: filtered }));
    };

  // 새로운 핸들러 함수: 카드 번호 입력
  const handleCardNumberChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const filtered = e.target.value.replace(/\D/g, "").slice(0, 4);
      const newCardNumber = [...cardNumber];
      newCardNumber[index] = filtered;
      setCardNumber(newCardNumber);
    };

  // 새로운 핸들러 함수: 유효기간 입력
  const handleExpDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    setExpDate(value);
  };

  // 새로운 핸들러 함수: CVC 입력
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCvc(filtered);
  };

  const location = useLocation();
  const { address, building_name, images } = location.state as FinalPayState;

  // 신용카드 드롭다운 상태
  const [isBankDropdownOpen, setIsBankDropdownOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState("은행 선택");

  const handleBankSelect = (bankName: string) => {
    setSelectedBank(bankName);
    setIsBankDropdownOpen(false);
  };

  // 간편결제 드롭다운 상태
  const [isSimpleDropdownOpen, setIsSimpleDropdownOpen] = useState(false);
  const [selectedSimpleOption, setSelectedSimpleOption] =
    useState("결제 수단 선택");

  const handleSimpleSelect = (option: string) => {
    setSelectedSimpleOption(option);
    setIsSimpleDropdownOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      {/* 체크인/체크아웃 */}
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

      {/* 신용카드 결제 */}
      <div className={styles.payBox}>
        <div className={styles.payHeader}>
          <img src={PayHeader} className={styles.payImg} alt="결제 헤더" />
          <span className={styles.Subtitle}>신용카드 결제하기</span>
        </div>
        <div className={styles.paymentBox}>
          <div className={styles.paymentElementBox}>
            <img src={Bank} className={styles.BoxImage} alt="은행 아이콘" />
            <span className={styles.paymentPhrase}>은행 선택</span>
            <div
              className={`${styles.inputBox} ${styles.dropdownToggle}`}
              onClick={() => setIsBankDropdownOpen(!isBankDropdownOpen)}
            >
              <div className={styles.dropdownValue}>{selectedBank}</div>
              <div className={styles.dropdownArrow}>&#9660;</div>
            </div>
          </div>
          {isBankDropdownOpen && (
            <div className={styles.dropdownMenu}>
              {banks.map((bank, idx) => (
                <div
                  key={idx}
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

          {/* 카드 번호 */}
          <div className={styles.paymentElementBox}>
            <img src={Bank} className={styles.BoxImage} alt="카드 번호" />
            <span className={styles.paymentPhrase}>카드 번호</span>
            <div className={styles.inputNumWholeBox}>
              <input
                type="text"
                className={styles.inputNumBox}
                placeholder="0000"
                maxLength={4}
                value={cardNumber[0]}
                onChange={handleCardNumberChange(0)}
              />
              <div className={styles.inputHyphen}>-</div>
              <input
                type="text"
                className={styles.inputNumBox}
                placeholder="0000"
                maxLength={4}
                value={cardNumber[1]}
                onChange={handleCardNumberChange(1)}
              />
              <div className={styles.inputHyphen}>-</div>
              <input
                type="text"
                className={styles.inputNumBox}
                placeholder="0000"
                maxLength={4}
                value={cardNumber[2]}
                onChange={handleCardNumberChange(2)}
              />
              <div className={styles.inputHyphen}>-</div>
              <input
                type="text"
                className={styles.inputNumBox}
                placeholder="0000"
                maxLength={4}
                value={cardNumber[3]}
                onChange={handleCardNumberChange(3)}
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
                <input
                  className={styles.content}
                  placeholder="MM/YY(월/년)"
                  value={expDate}
                  onChange={handleExpDateChange}
                />
              </div>
            </div>
            <div className={styles.paymentElementHalfBox}>
              <img src={Bank} className={styles.BoxImage} alt="CVC/CVV" />
              <span className={styles.paymentPhrase}>cvc/cvv/ccv</span>
              <div className={styles.inputBoxHalf}>
                <input
                  className={styles.content}
                  placeholder="카드 뒷면 마지막 3자리"
                  type="password"
                  value={cvc}
                  onChange={handleCvcChange}
                  maxLength={3}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 간편결제 */}
      <div className={styles.simplePayBox}>
        <div className={styles.simpleHeader}>
          <img src={simpleHeader} className={styles.payImg} alt="결제 헤더" />
          <span className={styles.Subtitle}>간편 결제하기</span>
        </div>
        <div className={styles.paymentElementBox}>
          <img src={Bank} className={styles.BoxImage} alt="간편 결제 아이콘" />
          <span className={styles.paymentPhrase}>결제 수단 선택</span>
          <div
            className={`${styles.inputBox} ${styles.dropdownToggle}`}
            onClick={() => setIsSimpleDropdownOpen(!isSimpleDropdownOpen)}
          >
            <div className={styles.dropdownValue}>{selectedSimpleOption}</div>
            <div className={styles.dropdownArrow}>&#9660;</div>
          </div>

          {isSimpleDropdownOpen && (
            <div className={styles.simpleDropdownMenu}>
              {simpleOptions.map((option, idx) => (
                <div
                  key={idx}
                  className={styles.dropdownItem}
                  onClick={() => handleSimpleSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.infoBox}>
          <ul>
            <li>
              다음 결제방법(NAVER PAY)를 선택하셨습니다.결제 진행을 위해 해당
              결제방법 사이트로 이동됩니다.
            </li>
            <li>
              예약을 변경하실 경우 카드사의 정액에 따라 신용카드 혜택 또는 할부
              적용 여부가 변경될 수 있습니다
            </li>
          </ul>
        </div>
      </div>

      <Link
        to={`/main/kanMatch/${id}/application/finalPay/success`}
        className={styles.applyBtn}
      >
        <div>450,000원</div>
      </Link>
    </div>
  );
}
