import DeleteIcon from "../images/icon-delete.svg";
import EditIcon from "../images/icon-edit.svg";
import ReplyIcon from "../images/icon-reply.svg";

type HeaderActionsProps = {
  isCurrentUser: boolean;
  deleteText: () => void;
  editText: () => void;
  replyTo: () => void;
};

export const HeaderActions = ({
  isCurrentUser,
  deleteText,
  editText,
  replyTo,
}: HeaderActionsProps) => {
  return isCurrentUser ? (
    <div className="user-actions">
      <button className="delete" onClick={deleteText}>
        <img src={DeleteIcon} alt="reply to" /> Delete
      </button>
      <button className="edit" onClick={editText}>
        <img src={EditIcon} alt="reply to" /> Edit
      </button>
    </div>
  ) : (
    <button className="reply" onClick={replyTo}>
      <img src={ReplyIcon} alt="reply to" /> Reply
    </button>
  );
};
