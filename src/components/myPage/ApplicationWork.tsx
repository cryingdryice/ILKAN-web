import applicationWorkStyle from "../../css/components/myPage/applicationWork.module.css";
import ApplicationWorkItem from "./ApplicationWorkItem";
import StateIcon from "../StateIcon";
import { useEffect, useState } from "react";
import api from "../../api/api";
import Modal from "../../components/Modal";
import modalStyle from "../../css/components/modal.module.css";

type Props = {
  role: string | null;
};

interface Items {
  taskId: number;
  title: string;
  price: number;
  recruitmentPeriod: string;
}

export default function ApplicationWork({ role }: Props) {
  const [items, setItems] = useState<Items[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalOnConfirm, setModalOnConfirm] = useState<(() => void) | null>(
    null
  );
  const fetchWorkInfo = async () => {
    try {
      const response = await api.get("/myprofile/commissions/applied");
      if (response.status === 200) {
        setItems(response.data.content);
      } else {
        const error = await response.data;
        // alert(error.message);
        setModalTitle("지원중인 의뢰");
        setModalText(error.message);
        setIsOpen(true);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      // alert(errorMessage);
      setModalTitle("지원중인 의뢰");
      setModalText(errorMessage);
      setIsOpen(true);
    }
  };

  useEffect(() => {
    fetchWorkInfo();
  }, []);
  return (
    <div className={applicationWorkStyle.container}>
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
      <div className={applicationWorkStyle.headerDiv}>
        <StateIcon state="신청중" evaluation={false} />
        <span className={applicationWorkStyle.headerTitle}>
          지원중인 의뢰가 있어요!
        </span>
      </div>
      <div className={applicationWorkStyle.body}>
        {items.map((item) => {
          const date = new Date(item.recruitmentPeriod);
          const year = date.getFullYear().toString().slice(2);
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          const formattedDate = `${year}/${month}/${day}`;

          return (
            <ApplicationWorkItem
              key={item.taskId}
              item={item}
              role={role}
              formattedDate={formattedDate}
            />
          );
        })}
      </div>
    </div>
  );
}
