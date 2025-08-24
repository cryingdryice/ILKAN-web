import styles from "../../css/pages/kanFinalPayPage.module.css";
import Arrow from "../../assets/arrowRight.svg";
import { useLocation, Link, useParams, useNavigate } from "react-router-dom";
import PayHeader from "../../assets/payheader.svg";
import Bank from "../../assets/bank.svg";
import { useMemo, useState } from "react";
import simpleHeader from "../../assets/simplePage.svg";
import Dates from "../../assets/dates.svg";
import Name from "../../assets/name.svg";
import Card from "../../assets/card.svg";
import CVC from "../../assets/cvc.svg";
import api from "../../api/api";
import { useLoading } from "../../context/LoadingContext";

interface FinalPayState {
  address: string;
  building_name: string;
  images: { cover: string };
  startDate: string; // "YYYY-MM-DD"
  endDate: string; // "YYYY-MM-DD"
  price: { amount: number; currency: string; unit: string };
  reservationId: number; // ✅ 예약 생성 단계에서 받은 ID
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

const formatKoreanDate = (yyyyMMdd: string) => {
  const [y, m, d] = yyyyMMdd.split("-").map(Number);
  const date = new Date(y, (m || 1) - 1, d || 1);
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  return `${y}년 ${m}월 ${d}일 (${dayNames[date.getDay()]})`;
};
const diffDays = (start: string, end: string) =>
  Math.round((new Date(end).getTime() - new Date(start).getTime()) / 86400000);

export default function KanFinalPayPage() {
  const { id } = useParams<{ id: string }>(); // 기존 라우팅 파라미터(페이지 이동용)
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  // 입력값들
  const [ownerName, setOwnerName] = useState(""); // 카드 명의자
  const [cardNumber, setCardNumber] = useState(["", "", "", ""]);
  const [expDate, setExpDate] = useState(""); // "MM/YY"
  const [cvc, setCvc] = useState("");
  const [selectedBank, setSelectedBank] = useState("은행 선택");
  const [isBankDropdownOpen, setIsBankDropdownOpen] = useState(false);
  const [isSimpleDropdownOpen, setIsSimpleDropdownOpen] = useState(false);
  const [selectedSimpleOption, setSelectedSimpleOption] =
    useState("결제 수단 선택");

  const handleCardNumberChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const filtered = e.target.value.replace(/\D/g, "").slice(0, 4);
      const next = [...cardNumber];
      next[index] = filtered;
      setCardNumber(next);
    };
  const handleExpDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 2) v = v.substring(0, 2) + "/" + v.substring(2, 4);
    setExpDate(v);
  };
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCvc(e.target.value.replace(/\D/g, "").slice(0, 3));

  const location = useLocation();
  const {
    address,
    building_name,
    images,
    startDate,
    endDate,
    price,
    reservationId, // ✅ 여기서 reservationId 받음
  } = location.state as FinalPayState;

  const nights = useMemo(
    () => diffDays(startDate, endDate),
    [startDate, endDate]
  );
  const displayStart = useMemo(() => formatKoreanDate(startDate), [startDate]);
  const displayEnd = useMemo(() => formatKoreanDate(endDate), [endDate]);
  const total = price.amount * Math.max(0, nights);

  const handleBankSelect = (bankName: string) => {
    setSelectedBank(bankName);
    setIsBankDropdownOpen(false);
  };
  const handleSimpleSelect = (option: string) => {
    setSelectedSimpleOption(option);
    setIsSimpleDropdownOpen(false);
  };

  // ✅ 하단 버튼 클릭 시 결제 요청 (reservationId 사용)
  const onClickPay = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // 간단 검증
    if (selectedBank === "은행 선택" || selectedBank === "선택안함") {
      alert("은행을 선택해주세요.");
      return;
    }
    if (!ownerName.trim()) {
      alert("카드 명의자 이름을 입력해주세요.");
      return;
    }
    if (cardNumber.some((p) => p.length !== 4)) {
      alert("카드 번호 16자리를 모두 입력해주세요.");
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(expDate)) {
      alert("유효기간은 MM/YY 형식으로 입력해주세요.");
      return;
    }
    if (cvc.length !== 3) {
      alert("CVC 3자리를 입력해주세요.");
      return;
    }
    if (!reservationId) {
      alert("결제에 필요한 예약 ID가 없습니다.");
      return;
    }

    const payload = {
      bankName: selectedBank,
      cardOwner: ownerName,
      cardNumber: cardNumber.join("-"), // "0000-0000-0000-0000"
      cvc,
      expiry: expDate, // "MM/YY"
    };

    setLoading(true);
    try {
      // POST /api/v1/credit/spaces/{reservationId}
      const res = await api.post(`/credit/spaces/${reservationId}`, payload);
      if (res.status >= 200 && res.status < 300) {
        navigate(`/main/kanMatch/${id}/application/finalPay/success`, {
          state: {
            address,
            building_name,
            images,
            startDate,
            endDate,
            total,
            reservationId,
          },
        });
      } else {
        alert(res.data?.message || "결제에 실패했습니다.");
      }
    } catch (err: any) {
      alert(
        err?.response?.data?.message ||
          err?.message ||
          "결제 중 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* 체크인/체크아웃 */}
      <div className={styles.checkInOutBox}>
        <div className={styles.dateBox}>
          <div className={styles.dateStart}>{displayStart}</div>
          <span className={styles.checkTable}>체크인</span>
        </div>
        <img src={Arrow} className={styles.imgBox} alt="우측화살표" />
        <div className={styles.dateBox}>
          <div className={styles.dateEnd}>{displayEnd}</div>
          <span className={styles.checkTable}>체크아웃</span>
        </div>
        <div className={styles.checkDate}>{nights}일</div>
      </div>

      {/* 장소 정보 */}
      <div className={styles.locationBox}>
        <div className={styles.leftSide}>
          <label className={styles.locationSubtitle}>{address}</label>
          <span className={styles.locationTitle}>{building_name}</span>
          <div className={styles.checkArea}>
            <div className={styles.timeArea}>입실시간</div>
            <div className={styles.timeSet}>오후 3시~</div>
          </div>
          <div className={styles.checkArea}>
            <div className={styles.timeArea}>퇴실시간</div>
            <div className={styles.timeSet}>오전 11시~</div>
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
          <div className={styles.left}>
            {Number(price.amount).toLocaleString()}원
          </div>
          <div className={styles.middle}>{nights}일</div>
          <div className={styles.rightfee}>
            {Number(total).toLocaleString()}원
          </div>
        </div>
      </div>

      {/* 신용카드 결제 */}
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
            <img src={Name} className={styles.BoxImage} alt="카드 소유자" />
            <span className={styles.paymentPhrase}>카드 명의자 이름</span>
            <div className={styles.inputBox}>
              <input
                className={styles.content}
                placeholder="카드 명의자 이름"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
              />
            </div>
          </div>

          {/* 카드 번호 */}
          <div className={styles.paymentElementBox}>
            <img src={Card} className={styles.BoxImage} alt="카드 번호" />
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
                type="password"
                className={styles.inputNumBox}
                placeholder="0000"
                maxLength={4}
                value={cardNumber[2]}
                onChange={handleCardNumberChange(2)}
              />
              <div className={styles.inputHyphen}>-</div>
              <input
                type="password"
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
                src={Dates}
                className={styles.BoxImage}
                alt="카드 유효 기간"
              />
              <span className={styles.paymentPhrase}>카드 유효 기간</span>
              <div className={styles.inputBoxHalf}>
                <input
                  type="password"
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
          <img src={CVC} className={styles.BoxImage} alt="간편 결제 아이콘" />
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
              다음 결제방법(NAVER PAY)를 선택하셨습니다. 결제 진행을 위해 해당
              결제방법 사이트로 이동됩니다.
            </li>
            <li>
              예약을 변경하실 경우 카드사의 정책에 따라 신용카드 혜택 또는 할부
              적용 여부가 변경될 수 있습니다
            </li>
          </ul>
        </div>
      </div>

      {/* 결제 버튼: 클릭 시 결제 API 호출 후 성공하면 이동 */}
      <Link
        to={`/main/kanMatch/${id}/application/finalPay/success`}
        className={styles.applyBtn}
        onClick={onClickPay}
      >
        <div>{Number(total).toLocaleString()}원</div>
      </Link>
    </div>
  );
}
