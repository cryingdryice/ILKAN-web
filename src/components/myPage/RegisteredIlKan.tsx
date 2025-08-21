import registeredIlKanStyle from "../../css/components/myPage/registedIlKan.module.css";
import StateIcon from "../StateIcon";
import AddMyIlKanBtn from "./AddMyIlKanBtn";
import RegisteredIlKanItem from "./RegisteredIlKanItem";
import RemodelingIlKanBtn from "./RemodelingIlKanBtn";

type Props = {
  role: string | null;
};
export default function RegisterdIlKan({ role }: Props) {
  const storedName = localStorage.getItem("name");
  return (
    <div className={registeredIlKanStyle.container}>
      <div className={registeredIlKanStyle.header}>
        <span>{storedName}님이 등록하신 건물이에요!</span>
      </div>
      <div className={registeredIlKanStyle.body}>
        <RegisteredIlKanItem />
        <RegisteredIlKanItem />
        <RegisteredIlKanItem />
        <RegisteredIlKanItem />
        <AddMyIlKanBtn />
        <RemodelingIlKanBtn />
      </div>
    </div>
  );
}
