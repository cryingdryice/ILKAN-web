import registeredIlKanStyle from "../../css/components/myPage/registedIlKan.module.css";
import StateIcon from "../StateIcon";
interface Props {
  buildingImage: string;
  buildingName: string;
  buildingStatus: string;
  buildingPrice: number;
}
export default function RegisteredIlKanItem({
  buildingImage,
  buildingName,
  buildingStatus,
  buildingPrice,
}: Props) {
  return (
    <div className={registeredIlKanStyle.itemDiv}>
      <div className={registeredIlKanStyle.itemHeader}>
        {/* <StateIcon state="심사 완료" evaluation={true} /> */}
        <img src={buildingImage} alt="사진" />
      </div>
      <div className={registeredIlKanStyle.itemContent}>
        <div className={registeredIlKanStyle.itemTitle}>{buildingName}</div>
        <div className={registeredIlKanStyle.itemPrice}>
          일/<span>{buildingPrice.toLocaleString()}원</span>
        </div>
      </div>
    </div>
  );
}
