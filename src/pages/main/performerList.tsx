import { useEffect, useState } from "react";
import listStyle from "../../css/pages/performerList.module.css";
import select from "../../assets/performerList/selectPerformer.svg";
import unselect from "../../assets/performerList/unselectPerformer.svg";
import api from "../../api/api";
import { useParams } from "react-router-dom";

interface Performers {
  performerId: number;
  performerName: string;
  workTitle: string;
  portfolioUrl: string;
}

export default function ShowPerformerList() {
  const [performers, setPerformers] = useState<Performers[]>([]);
  const { taskId } = useParams<{ taskId: string }>();
  const [selectedId, setSelectedId] = useState<number>(
    performers[0]?.performerId ?? -1
  );

  const fetchPerformerList = async () => {
    try {
      const response = await api.get("/myprofile/commissions/applies");
      if (response.status === 200) {
        setPerformers(response.data);
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
    } finally {
      // setIsLoadingProfile(false);
    }
  };
  const selectPerformer = async () => {
    try {
      const response = await api.get(
        `/myprofile/commissions/${taskId}/approve/${selectedId}`
      );
      if (response.status === 200) {
        setPerformers(response.data);
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
    } finally {
      // setIsLoadingProfile(false);
    }
  };
  useEffect(() => {
    fetchPerformerList();
  }, []);
  // const [performers, setPerformers] = useState<Performers[]>([
  //   {
  //     performerid: 1,
  //     performerName: "유설희",
  //     workTitle: "[카페 반절] 인스타 분위기 카페 BI 및 로고 디자인 외주 의뢰",
  //     portfolioUrl:
  //       "https://www.notion.so/ABOUT-ME-1dac7917f2c2803db666f1e38d72cbde",
  //   },
  //   {
  //     performerid: 2,
  //     performerName: "유설희",
  //     workTitle: "[카페 반절] 인스타 분위기 카페 BI 및 로고 디자인 외주 의뢰",
  //     portfolioUrl:
  //       "https://www.notion.so/ABOUT-ME-1dac7917f2c2803db666f1e38d72cbde",
  //   },
  //   {
  //     performerid: 3,
  //     performerName: "유설희",
  //     workTitle: "[카페 반절] 인스타 분위기 카페 BI 및 로고 디자인 외주 의뢰",
  //     portfolioUrl:
  //       "https://www.notion.so/ABOUT-ME-1dac7917f2c2803db666f1e38d72cbde",
  //   },
  // ]);

  const handleSelect = (id: number) => {
    setSelectedId(id);
    console.log(`Selected Performer ID: ${id}`);
  };

  return (
    <div className={listStyle.pageContainer}>
      <div className={listStyle.titleDiv}>
        [카페 반절] 인스타 분위기 카페 BI 로고 디자인 외주 의뢰
      </div>
      <table>
        <thead>
          <tr>
            <th className={listStyle.headCol1}>기업명/공고</th>
            <th className={listStyle.headCol2}>포토폴리오</th>
            <th className={listStyle.headCol3}>선택</th>
          </tr>
        </thead>
        <tbody>
          {performers.length > 0 ? (
            performers.map((p) => (
              <tr key={p.performerId}>
                <td className={listStyle.bodyCol1}>
                  <span className={listStyle.name}>{p.performerName}</span>
                  <span className={listStyle.title}>{p.workTitle}</span>
                </td>
                <td className={listStyle.link}>{p.portfolioUrl}</td>
                <td>
                  <img
                    src={selectedId === p.performerId ? select : unselect}
                    alt={selectedId === p.performerId ? "선택" : "미선택"}
                    className={listStyle.img}
                    onClick={() => handleSelect(p.performerId)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <>
              <tr>
                <td colSpan={1} className={listStyle.noEmployee}>
                  수행자 정보가 없습니다.
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      <div className={listStyle.footer}>
        <div className={listStyle.selectBtn} onClick={selectPerformer}>
          전문가 선택
        </div>
      </div>
    </div>
  );
}
