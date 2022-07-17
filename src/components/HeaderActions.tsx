import DeleteIcon from "../images/icon-delete.svg";
import EditIcon from "../images/icon-edit.svg";
import ReplyIcon from "../images/icon-reply.svg";

type HeaderActionsProps = {
  id: string;
  isCurrentUser: boolean;
  onEditingStatus: () => void;
  onDeleteComment: (id: string) => void;
};

export const HeaderActions = ({
  id,
  isCurrentUser,
  onEditingStatus,
  onDeleteComment,
}: HeaderActionsProps) => {
  return isCurrentUser ? (
    <div className="user-actions">
      <button className="delete" onClick={() => onDeleteComment(id)}>
        <img src={DeleteIcon} alt="delete comment" /> Delete
      </button>
      <button className="edit" onClick={onEditingStatus}>
        <img src={EditIcon} alt="edit text" /> Edit
      </button>
    </div>
  ) : (
    <div className="user-actions">
      {/* <button className="reply" onClick={replyTo}>
        <img src={ReplyIcon} alt="reply to" /> Reply
      </button> */}
    </div>
  );
};
