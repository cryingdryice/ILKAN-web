import registeredIlKanStyle from "../../css/components/myPage/registedIlKan.module.css";
import StateIcon from "../StateIcon";
import cancleBtn from "../../assets/myPage/X.svg";
import api from "../../api/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import modalStyle from "../../css/components/modal.module.css";

interface Props {
  buildingImage: string;
  buildingName: string;
  buildingStatus: string;
  buildingPrice: number;
  buildingAddress: string;
  buildingId: number;
  onDelete: (id: number) => void;
}

export default function RegisteredIlKanItem({
  buildingImage,
  buildingName,
  buildingStatus,
  buildingPrice,
  buildingAddress,
  buildingId,
  onDelete,
}: Props) {
  const evaluationText = buildingStatus === "REGISTERED" ? "심사 완료" : "";
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalOnConfirm, setModalOnConfirm] = useState<(() => void) | null>(
    null
  );

  const deleteIlKan = async (e: React.MouseEvent<HTMLImageElement>) => {
    // e.stopPropagation();
    // e.preventDefault();

    try {
      const response = await api.delete(`/buildings/${buildingId}`);
      if (response.status === 204 || response.status === 200) {
        onDelete(buildingId);
        setModalTitle("일칸 삭제");
        setModalText("삭제 성공!");
        setIsOpen(true);
      } else {
        const error = await response.data.content;
        setModalTitle("일칸 삭제");
        setModalText(error);
        setIsOpen(true);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      setModalTitle("일칸 삭제");
      setModalText(errorMessage);
      setIsOpen(true);
    }
  };
  const handleDeleteClick = () => {
    setModalTitle("삭제 확인");
    setModalText("정말 이 일칸을 삭제하시겠습니까?");
    setModalOnConfirm(() => deleteIlKan);
    setIsOpen(true);
  };
  return (
    <div className={registeredIlKanStyle.itemDiv}>
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
      <div className={registeredIlKanStyle.itemHeader}>
        <div className={registeredIlKanStyle.iconOverlay}>
          <StateIcon state={evaluationText} evaluation={true} />
          <img src={cancleBtn} alt="닫기" onClick={handleDeleteClick} />
        </div>
        <img src={buildingImage} alt="사진" />
      </div>
      <Link
        to={`/main/kanMatch/${buildingId}`}
        className={registeredIlKanStyle.itemContent}
      >
        <div>
          <div className={registeredIlKanStyle.itemTitle}>{buildingName}</div>
          <div className={registeredIlKanStyle.itemAddress}>
            {buildingAddress}
          </div>
        </div>
        <div className={registeredIlKanStyle.itemPrice}>
          일/<span>{buildingPrice.toLocaleString()}원</span>
        </div>
      </Link>
    </div>
  );
}
