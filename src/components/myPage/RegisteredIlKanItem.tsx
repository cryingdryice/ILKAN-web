import registeredIlKanStyle from "../../css/components/myPage/registedIlKan.module.css";
import StateIcon from "../StateIcon";

interface RegisteredIlKanItemProps {
  buildingId: number;
  buildingImage: string;
  buildingName: string;
  buildingStatus: string;
  buildingPrice: number;
}

export default function RegisteredIlKanItem({
  buildingId,
  buildingImage,
  buildingName,
  buildingStatus,
  buildingPrice,
}: RegisteredIlKanItemProps) {
  return (
    <div className={registeredIlKanStyle.itemDiv} key={buildingId}>
      <div className={registeredIlKanStyle.itemHeader}>
        <StateIcon state={buildingStatus} evaluation={true} />
        <img src={buildingImage} alt="사진" />
      </div>
      <div className={registeredIlKanStyle.itemContent}>
        <div className={registeredIlKanStyle.itemTitle}>{buildingName}</div>
        <div className={registeredIlKanStyle.itemPrice}>
          일/<span>{buildingPrice.toLocaleString()}원</span>
        </div>
      </div>
      <div className={registeredIlKanStyle.itemImgDiv}>
        <img src={buildingImage} alt={buildingName} />
      </div>
    </div>
  );
}
