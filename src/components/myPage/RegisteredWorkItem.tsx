import registeredWorkStyle from "../../css/components/myPage/registeredWork.module.css";
import cancelImg from "../../assets/myPage/X.svg";
import handShake from "../../assets/myPage/handshake.svg";
import clock from "../../assets/myPage/clock.svg";
import person from "../../assets/myPage/person.svg";
import check from "../../assets/myPage/performerReady-icon.svg";
import right from "../../assets/myPage/calendarRight.svg";
import left from "../../assets/myPage/calendarLeft.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";
import confirmStandby from "../../assets/myPage/confirmStandby.svg";
type Props = {
  item: Item;
  role: string | null;
  startDate: Date | null;
  endDate: Date | null;
  // setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  // setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
};
interface Item {
  taskId: number;
  requester: {
    id: number;
    name: string;
    phoneNumber: string;
    role: string;
  };
  performer: {
    id: number | null;
    name: string | null;
    phoneNumber: string | null;
    role: string | null;
  } | null;
  title: string;
  description: string;
  createdAt: string;
  price: number;
  status: string;
  taskStart: string | null;
  taskEnd: string | null;
  recruitmentPeriod: string;
}
export default function RegisteredWork({ item, role }: Props) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selected, setSelected] = useState(false);
  const [ready, setReady] = useState(false);

  // 월의 첫 날과 마지막 날 구하기
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const daysInMonth = [];
  for (let i = 1; i <= lastDay.getDate(); i++) {
    daysInMonth.push(i);
  }

  const prevMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const viewCalendar = () => {
    setCalendarOpen((prev) => !prev);
    console.log("캘린더 open");
  };

  //타임존 해결하는 함수!!
  const toLocalISOString = (date: Date) => {
    const tzOffset = date.getTimezoneOffset() * 60000;
    const localISOTime = new Date(date.getTime() - tzOffset)
      .toISOString()
      .slice(0, 19);
    return localISOTime;
  };

  useEffect(() => {
    if (startDate && endDate && !selected) {
      requesterReady();
    }
  }, [startDate, endDate]);

  const requesterReady = async () => {
    console.log(selected);
    if (!startDate || !endDate) {
      alert("날짜를 선택해주세요");
      return;
    }

    const requestBody = selected
      ? {}
      : {
          taskStart: startDate ? startDate.toISOString() : null,
          taskEnd: endDate ? endDate.toISOString() : null,
        };
    console.log(requestBody);
    try {
      const response = await api.patch(
        `/myprofile/commissions/${item.taskId}/status/requester`,
        requestBody
      );
      if (response.status === 200) {
        setReady(true);
        window.location.reload();
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

  return (
    <div key={item.taskId} className={registeredWorkStyle.itemContainer}>
      <img src={cancelImg} alt="닫기" />

      <div className={registeredWorkStyle.itemContent}>
        {/* <div className={registeredWorkStyle.itemTopDiv}>
                <span>
                  {item.requester.name} ({item.requester.role})
                </span>
              </div> */}
        <div className={registeredWorkStyle.itemTitleDiv}>
          <span className={registeredWorkStyle.itemTitle}>{item.title}</span>
          <span className={registeredWorkStyle.price}>
            {item.price.toLocaleString()}원~
          </span>
          <span className={registeredWorkStyle.date}>
            ~{new Date(item.recruitmentPeriod).toLocaleDateString("ko-KR")}
          </span>
        </div>
        <div className={registeredWorkStyle.itemBottomDiv}>
          <div className={registeredWorkStyle.leftDiv}>
            <Link
              state={{ taskId: item.taskId, title: item.title }}
              to={`/main/performerList/${item.taskId}`}
              className={
                item.performer === null
                  ? registeredWorkStyle.performerEmptyDiv
                  : registeredWorkStyle.performerSelectDiv
              }
            >
              {item.performer === null ? (
                <>
                  <img src={person} alt="지원자 보기" />
                  <span>지원자 보기 {">"}</span>
                </>
              ) : (
                <>
                  <img src={handShake} alt="선정된 지원자" />
                  <span>{item.performer.name}</span>
                </>
              )}
            </Link>

            <div
              className={
                startDate && endDate
                  ? registeredWorkStyle.dateSelectDiv
                  : registeredWorkStyle.dateEmptyDiv
              }
              onClick={viewCalendar}
            >
              <img src={clock} alt="기간 설정" />
              <span>
                {startDate && endDate
                  ? `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`
                  : "사용자와 협의된 계약기간을 설정해주세요"}
              </span>
              {calendarOpen && (
                <div
                  className={registeredWorkStyle.calendar}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div className={registeredWorkStyle.calendarTop}>
                    <img
                      src={left}
                      alt="prev"
                      onClick={(e) => {
                        prevMonth();
                      }}
                    />
                    <div className={registeredWorkStyle.yyyyMM}>
                      {year} / {String(month + 1).padStart(2, "0")}
                    </div>
                    <img
                      src={right}
                      alt="next"
                      onClick={(e) => {
                        nextMonth();
                      }}
                    />
                  </div>

                  <div className={registeredWorkStyle.calendarBody}>
                    {daysInMonth.map((day) => {
                      const current = new Date(year, month, day);
                      const isStart =
                        startDate &&
                        current.toDateString() === startDate.toDateString();
                      const isEnd =
                        endDate &&
                        current.toDateString() === endDate.toDateString();
                      const inRange =
                        startDate &&
                        endDate &&
                        current > startDate &&
                        current < endDate;

                      return (
                        <div
                          key={day}
                          className={`${registeredWorkStyle.day} ${
                            isStart || isEnd
                              ? registeredWorkStyle.selectedDay
                              : ""
                          } ${inRange ? registeredWorkStyle.inRangeDay : ""}`}
                          onClick={() => {
                            if (!startDate || (startDate && endDate)) {
                              setStartDate(current);
                              setEndDate(null);
                            } else if (startDate && !endDate) {
                              if (current < startDate) {
                                setEndDate(startDate);
                                setStartDate(current);
                              } else {
                                setEndDate(current);
                              }
                            }
                          }}
                        >
                          {day}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {ready == true ? (
            <div className={registeredWorkStyle.standByBtn}>
              <img src={confirmStandby} alt="사용자 수락 대기중" />
              <span>사용자 수락 대기중</span>
            </div>
          ) : (
            <div
              className={registeredWorkStyle.readyBtn}
              onClick={() => {
                setSelected(true);
                requesterReady();
              }}
            >
              <img src={check} alt="준비 완료" />
              <span>준비 완료</span>
            </div>
          )}
        </div>
      </div>

      <Link to="#" className={registeredWorkStyle.editDiv}>
        <span>수정하기</span>
        <img src={check} alt="수정하기" />
      </Link>
    </div>
  );
}
