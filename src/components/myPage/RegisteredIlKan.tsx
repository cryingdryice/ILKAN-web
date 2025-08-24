import api from "../../api/api";
import registeredIlKanStyle from "../../css/components/myPage/registedIlKan.module.css";
import StateIcon from "../StateIcon";
import AddMyIlKanBtn from "./AddMyIlKanBtn";
import RegisteredIlKanItem from "./RegisteredIlKanItem";
import RemodelingIlKanBtn from "./RemodelingIlKanBtn";
import Modal from "../../components/Modal";
import modalStyle from "../../css/components/modal.module.css";
import { useEffect, useState } from "react";

type Props = {
  role: string | null;
};

interface RegisteredIlKan {
  buildingId: number;
  buildingImage: string;
  buildingName: string;
  buildingStatus: string;
  buildingPrice: number;
}

export default function RegisterdIlKan({ role }: Props) {
  // 🔥 배열 타입으로 수정
  const [ilKanList, setIlKanList] = useState<RegisteredIlKan[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalOnConfirm, setModalOnConfirm] = useState<(() => void) | null>(
    null
  );

  const fetchProfileInfo = async () => {
    try {
      const response = await api.get("/myprofile/buildings/registered");
      if (response.status === 200) {
        setIlKanList(response.data.content); // content가 배열이라고 가정
      } else {
        const error = await response.data;
        setModalTitle("사용중인 건물 조회");
        setModalText(error.message);
        setIsOpen(true);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      setModalTitle("사용중인 건물 조회");
      setModalText(errorMessage);
      setIsOpen(true);
    }
  };

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const storedName = localStorage.getItem("name");

  return (
    <div className={registeredIlKanStyle.container}>
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

      <div className={registeredIlKanStyle.header}>
        <span>{storedName}님이 등록하신 건물이에요!</span>
      </div>

      <div className={registeredIlKanStyle.body}>
        {/* 🔥 ilKanList를 map으로 돌려서 아이템 그리기 */}
        {ilKanList.map((item) => (
          <RegisteredIlKanItem
            key={item.buildingId}
            buildingId={item.buildingId}
            buildingImage={item.buildingImage}
            buildingName={item.buildingName}
            buildingStatus={item.buildingStatus}
            buildingPrice={item.buildingPrice}
          />
        ))}

        {/* 나머지 버튼 */}
        <AddMyIlKanBtn />
        <RemodelingIlKanBtn />
      </div>
    </div>
  );
}
