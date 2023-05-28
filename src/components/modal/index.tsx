import Modal from "react-modal";
import { SetStateAction } from "react";
import { Dispatch } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface ModalContainerProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  titleModal: string;
}

Modal.setAppElement("body");

export function ModalContainer({
  children,
  isOpen,
  setIsOpen,
  titleModal,
}: ModalContainerProps) {
  return (
    <Modal
      isOpen={isOpen}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0 ,0, 0.8)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        content: {
          borderRadius: "10px",
          padding: "20px",
          width: "fit-content",
          height: "fit-content",
        },
      }}
      className="bg-purple-100"
    >
      <header className="flex justify-between items-center text-2xl text-purple800 mb-[16px] cursor-pointer">
        {titleModal ? <h1> {titleModal} </h1> : null}
        <AiOutlineCloseCircle onClick={() => setIsOpen(false)} size={"34px"} />
      </header>
      {children}
    </Modal>
  );
}
