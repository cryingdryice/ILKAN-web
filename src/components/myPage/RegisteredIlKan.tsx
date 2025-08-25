import { useEffect, useState } from "react";
import registeredIlKanStyle from "../../css/components/myPage/registedIlKan.module.css";
import StateIcon from "../StateIcon";
import AddMyIlKanBtn from "./AddMyIlKanBtn";
import RegisteredIlKanItem from "./RegisteredIlKanItem";
import RemodelingIlKanBtn from "./RemodelingIlKanBtn";
import api from "../../api/api";
import Modal from "../../components/Modal";
import modalStyle from "../../css/components/modal.module.css";
type Props = {
  role: string | null;
};
interface RegisteredIlKan {
  buildingId: number;
  buildingImage: string;
  buildingName: string;
  buildingStatus: string;
  buildingPrice: number;
  buildingAddress: string;
}
export default function RegisterdIlKan({ role }: Props) {
  const [ilKanList, setIlKanList] = useState<RegisteredIlKan[]>([]);
  const storedName = localStorage.getItem("userName");
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalOnConfirm, setModalOnConfirm] = useState<(() => void) | null>(
    null
  );

  const fetchWorkInfo = async () => {
    try {
      const response = await api.get("/myprofile/buildings/registered");
      if (response.status === 200) {
        setIlKanList(response.data.content);
      } else {
        const error = await response.data;
        setIsOpen(true);
        setModalText(error.message);
        setModalTitle("오류");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      setIsOpen(true);
      setModalText(errorMessage);
      setModalTitle("오류");
    }
  };
  const handleDelete = (buildingId: number) => {
    setIlKanList((prev) =>
      prev.filter((item) => item.buildingId !== buildingId)
    );
  };
  useEffect(() => {
    fetchWorkInfo();
  }, []);
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
        {ilKanList == null ? (
          <span>{storedName}님이 등록하신 건물이 없어요!</span>
        ) : (
          <span>{storedName}님이 등록하신 건물이에요!</span>
        )}
      </div>
      <div className={registeredIlKanStyle.body}>
        <AddMyIlKanBtn />
        <RemodelingIlKanBtn />
        {ilKanList.map((ilkan) => (
          <RegisteredIlKanItem
            key={ilkan.buildingId}
            buildingId={ilkan.buildingId}
            buildingImage={ilkan.buildingImage}
            buildingName={ilkan.buildingName}
            buildingStatus={ilkan.buildingStatus}
            buildingPrice={ilkan.buildingPrice}
            buildingAddress={ilkan.buildingAddress}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
