export const Modal = ({ headerText, bodyText, children }: any) => {
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
