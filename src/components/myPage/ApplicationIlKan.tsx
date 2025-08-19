import applicationIlKanStyle from "../../css/components/myPage/applicationIlKan.module.css";
import StateIcon from "../StateIcon";
import roomCheck from "../../assets/roomCheck-icon.svg";
import roomConfirm from "../../assets/roomConfirm-icon.svg";

type Props = {
  role: string | null;
};

export default function ApplicationIlKan({ role }: Props) {
  const applicationIlKanData = [
    {
      id: 1,
      state: "신청중",
      title:
        "경산시 공유 오피스 회의실, 모던, 화이트톤, 집중이 잘 되는, 방음, 조용한, 공부, 화이트",
      ownerName: "김성철",
      price: "600,000",
      date: "2025/ 08/ 31 ~ 2025/ 09/ 11",
      status: "확인중", // '확인중' 또는 '수락완료' 상태를 나타냅니다.
    },
    {
      id: 2,
      state: "수락완료",
      title:
        "대구 동성로 스터디룸, 쾌적하고 넓은 공간, 책상과 의자 구비, 빔프로젝터, 개인 사물함",
      ownerName: "박영희",
      price: "800,000",
      date: "2025/ 09/ 15 ~ 2025/ 09/ 30",
      status: "수락완료",
    },
    {
      id: 3,
      state: "신청중",
      title:
        "구미시 카페형 코워킹 스페이스, 스터디, 팀 프로젝트, 10인 이상 수용 가능, 음료 제공",
      ownerName: "이민수",
      price: "450,000",
      date: "2025/ 10/ 05 ~ 2025/ 10/ 20",
      status: "확인중",
    },
  ];
  return (
    <div className={applicationIlKanStyle.container}>
      <div className={applicationIlKanStyle.headerDiv}>
        <StateIcon state="신청중" />
        <span className={applicationIlKanStyle.headerTitle}>
          예약중인 일칸이 {applicationIlKanData.length}개 있어요!
        </span>
      </div>

      <div className={applicationIlKanStyle.body}>
        {applicationIlKanData.map((item) => (
          <div key={item.id} className={applicationIlKanStyle.itemContainer}>
            <div className={applicationIlKanStyle.itemImgDiv}></div>
            <div className={applicationIlKanStyle.itemRightDiv}>
              <div className={applicationIlKanStyle.itemTitleDiv}>
                <span className={applicationIlKanStyle.itemTitle}>
                  {item.title}
                </span>
              </div>
              <div className={applicationIlKanStyle.itemContentDiv}>
                <div className={applicationIlKanStyle.ownerDiv}>
                  <div className={applicationIlKanStyle.ownerImg}></div>
                  <span className={applicationIlKanStyle.ownerName}>
                    {item.ownerName}
                  </span>
                </div>
                <div className={applicationIlKanStyle.price}>
                  {item.price}원
                </div>
              </div>
              <div className={applicationIlKanStyle.itemFooter}>
                <span className={applicationIlKanStyle.date}>{item.date}</span>
                <div
                  className={`${applicationIlKanStyle.btnDiv} ${
                    item.status === "수락완료"
                      ? applicationIlKanStyle.accepted
                      : ""
                  }`}
                >
                  <img
                    src={item.status === "확인중" ? roomCheck : roomConfirm}
                    alt={item.status}
                  />
                  <span>{item.status}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
