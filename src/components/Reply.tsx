import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addReply } from "../features/replies/repliesSlice";
import { selectUser } from "../features/user/userSlice";
import { updateReply, deleteReply } from "../features/replies/repliesSlice";

import DeleteIcon from "../images/icon-delete.svg";
import EditIcon from "../images/icon-edit.svg";
import ReplyIcon from "../images/icon-reply.svg";

import { Score } from "./Score";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { Textarea } from "./Textarea";

export const Reply = ({ reply, commentId }: any) => {
  const dispatch = useDispatch();

  // Get current user
  const currentUser = useSelector(selectUser);
  const isCurrentUser = currentUser.username === reply.user.username;

  // Set visible mode Modal and set props
  const [modalProps, setModalProps] = useState({
    header: "",
    text: "",
    confirmMessage: "",
    cancel: () => {},
    confirm: () => {},
  });
  const [isVisible, setIsVisible] = useState(false);

  // Update Reply
  const [isEditable, setIsEditable] = useState(false);
  const [updatedText, setUpdatedText] = useState("");
  const editReply = () => {
    setIsEditable(true);
    setUpdatedText(reply.content);
  };

  const handleUpdateReply = () => {
    setModalProps({
      header: "Update Reply",
      text: "Are you sure you want to update this reply?",
      confirmMessage: "Yes, update",
      cancel: onCancelUpdateReply,
      confirm: confirmUpdateReply,
    });
    setIsVisible(true);
  };

  const confirmUpdateReply = () => {
    const { id } = reply;
    dispatch(updateReply({ id, content: updatedText }));
    setIsEditable(false);
    setIsVisible(false);
  };

  const onCancelUpdateReply = () => {
    setIsEditable(false);
    setIsVisible(false);
  };

  // Delete Reply
  const handleDeleteReply = () => {
    setModalProps({
      header: "Delete Reply",
      text: "Are you sure you want to delete this reply? This will remove the reply and can’t be undone.",
      confirmMessage: "Yes, delete",
      cancel: () => setIsVisible(false),
      confirm: confirmDeleteReply,
    });
    setIsVisible(true);
  };

  const confirmDeleteReply = () => {
    dispatch(deleteReply(reply));
    setIsVisible(false);
  };

  // ReplyTo
  const [isRepliyng, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const replyTo = () => setIsReplying(true);

  const handleReplyReply = () => {
    setModalProps({
      header: "Confirm",
      text: "Are you sure you want to reply to this reply?",
      confirmMessage: "Yes",
      cancel: () => setIsVisible(false),
      confirm: submitReply,
    });
    setIsVisible(true);
  };
  // ADD a new reply
  const submitReply = () => {
    const newReply = {
      content: replyText,
      user: currentUser,
      commentId: commentId,
      replyingTo: reply.user.username,
    };
    if (replyText !== "") {
      dispatch(addReply(newReply));
      setReplyText("");
    }
    setIsReplying(false);
    setIsVisible(false);
  };

  const { id, hasVoted, score, user, content } = reply;
  const { username } = user;
  return (
    <>
      <li className="item" data-id={id}>
        <div className="container">
          <Score
            id={id}
            hasVoted={hasVoted}
            score={score}
            isCurrentUser={isCurrentUser}
            type="reply"
          />
          <div className="comment">
            <header className="header">
              <div className="toolbar">
                <div className="user">
                  <figure className="avatar">
                    <img
                      src={`src/images/avatars/image-${username}.webp`}
                      alt={username}
                    />
                  </figure>
                  <span>{username}</span>
                  {isCurrentUser && <span className="current-user">you</span>}
                </div>
                <time className="date">2 weeks ago</time>
              </div>
              {isCurrentUser && (
                <div className="user-actions">
                  <button className="delete" onClick={handleDeleteReply}>
                    <img src={DeleteIcon} alt="reply to" /> Delete
                  </button>
                  <button className="edit" onClick={editReply}>
                    <img src={EditIcon} alt="reply to" /> Edit
                  </button>
                </div>
              )}
              {!isCurrentUser && (
                <button className="reply" onClick={replyTo}>
                  <img src={ReplyIcon} alt="reply to" /> Reply
                </button>
              )}
            </header>
            {!isEditable ? (
              <p className={isEditable ? "textarea" : ""}>{content}</p>
            ) : (
              <div className="edit-comment mt-20">
                <textarea
                  className={isEditable ? "textarea" : ""}
                  value={updatedText}
                  onChange={e => setUpdatedText(e.target.value)}
                ></textarea>
                <Button text="Update" onClick={handleUpdateReply} />
              </div>
            )}
          </div>
        </div>

        {isRepliyng && (
          <Textarea
            username={username}
            isRepliyng={isRepliyng}
            getText={setReplyText}
            onClick={handleReplyReply}
          />
        )}
      </li>

      {isVisible && (
        <Modal
          headerText={modalProps.header}
          bodyText={modalProps.text}
          setIsVisible={setIsVisible}
        >
          <button className="button cancel" onClick={modalProps.cancel}>
            No, cancel
          </button>
          <button className="button confirm" onClick={modalProps.confirm}>
            {modalProps.confirmMessage}
          </button>
        </Modal>
      )}
    </>
  );
};
