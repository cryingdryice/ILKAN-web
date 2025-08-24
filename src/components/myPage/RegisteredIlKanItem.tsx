import registeredIlKanStyle from "../../css/components/myPage/registedIlKan.module.css";
import StateIcon from "../StateIcon";
import cancleBtn from "../../assets/myPage/X.svg";
import api from "../../api/api";
import { useEffect, useState } from "react";

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

  const deleteIlKan = async () => {
    try {
      const response = await api.delete(`/buildings/${buildingId}`);
      if (response.status === 204 || response.status === 200) {
        alert("삭제 성공!");
        onDelete(buildingId);
      } else {
        const error = await response.data.content;
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
    <div className={registeredIlKanStyle.itemDiv}>
      <div className={registeredIlKanStyle.itemHeader}>
        <div className={registeredIlKanStyle.iconOverlay}>
          <StateIcon state={evaluationText} evaluation={true} />
          <img src={cancleBtn} alt="닫기" onClick={deleteIlKan} />
        </div>
        <img src={buildingImage} alt="사진" />
      </div>
      <div className={registeredIlKanStyle.itemContent}>
        <div>
          <div className={registeredIlKanStyle.itemTitle}>{buildingName}</div>
          <div className={registeredIlKanStyle.itemAddress}>
            {buildingAddress}
          </div>
        </div>
        <div className={registeredIlKanStyle.itemPrice}>
          일/<span>{buildingPrice.toLocaleString()}원</span>
        </div>
      </div>
    </div>
  );
}
