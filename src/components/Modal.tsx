import { ReactChild, ReactChildren } from "react";

type ModalProps = {
  headerText: string;
  bodyText: string;
  children?: JSX.Element | JSX.Element[];
};

export const Modal = ({ headerText, bodyText, children }: ModalProps) => {
  return (
    <>
      <div className="modal">
        <div className="modal-header">{headerText}</div>
        <div className="modal-body">
          <p>{bodyText}</p>
        </div>
        <div className="modal-footer"> {children} </div>
      </div>
      <div className="modal-overlay"></div>
    </>
  );
};
