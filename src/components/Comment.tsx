import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addReply, selectReplies } from "../features/replies/repliesSlice";
import { selectUser } from "../features/user/userSlice";
import {
  updateComment,
  deleteComment,
} from "../features/comments/commentsSlice";
import DeleteIcon from "../images/icon-delete.svg";
import EditIcon from "../images/icon-edit.svg";
import ReplyIcon from "../images/icon-reply.svg";

import { Score } from "./Score";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { Textarea } from "./Textarea";
import { RepliesList } from "../container/RepliesList";

export const Comment = ({ comment }: any) => {
  const dispatch = useDispatch();

  const replies = useSelector(selectReplies);

  const { id, hasVoted, score, user, content } = comment;
  const { username } = user;

  // Get current user
  const currentUser = useSelector(selectUser);
  const isCurrentUser = currentUser.username === username;

  // Set visible mode Modal and set props
  const [modalProps, setModalProps] = useState({
    header: "",
    text: "",
    confirmMessage: "",
    cancel: () => {},
    confirm: () => {},
  });
  const [isVisible, setIsVisible] = useState(false);

  // Update Comment
  const [isEditable, setIsEditable] = useState(false);
  const [updatedText, setUpdatedText] = useState("");
  const editComment = () => {
    setIsEditable(true);
    setUpdatedText(comment.content);
  };

  const handleUpdateComment = () => {
    setModalProps({
      header: "Update Comment",
      text: "Are you sure you want to update this comment?",
      confirmMessage: "Yes, update",
      cancel: onCancelUpdateComment,
      confirm: confirmUpdateComment,
    });
    setIsVisible(true);
  };

  const confirmUpdateComment = () => {
    const { id } = comment;
    dispatch(updateComment({ id, content: updatedText }));
    setIsEditable(false);
    setIsVisible(false);
  };

  const onCancelUpdateComment = () => {
    setIsEditable(false);
    setIsVisible(false);
  };

  // Delete Comment
  const handleDeleteComment = () => {
    setModalProps({
      header: "Delete Comment",
      text: "Are you sure you want to delete this comment? This will remove the comment and can’t be undone.",
      confirmMessage: "Yes, delete",
      cancel: () => setIsVisible(false),
      confirm: confirmDeleteComment,
    });
    setIsVisible(true);
  };

  const confirmDeleteComment = () => {
    dispatch(deleteComment(comment));
    setIsVisible(false);
  };

  // ReplyTo
  const [isRepliyng, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const replyTo = () => {
    setIsReplying(true);
  };
  const handleReplyComment = () => {
    setModalProps({
      header: "Confirm",
      text: "Are you sure you want to reply to this comment?",
      confirmMessage: "Yes",
      cancel: () => setIsVisible(false),
      confirm: submitReply,
    });
    setIsVisible(true);
  };
  // ADD a new reply
  const submitReply = () => {
    const reply = {
      content: replyText,
      user: currentUser,
      commentId: id,
      replyingTo: comment.user.username,
    };
    if (replyText !== "") {
      dispatch(addReply(reply));
      setReplyText("");
    }
    setIsReplying(false);
    setIsVisible(false);
  };

  return (
    <>
      <li className="item" data-id={id}>
        <div className="container">
          <Score
            id={id}
            score={score}
            hasVoted={hasVoted}
            isCurrentUser={isCurrentUser}
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
                  <button className="delete" onClick={handleDeleteComment}>
                    <img src={DeleteIcon} alt="reply to" /> Delete
                  </button>
                  <button className="edit" onClick={editComment}>
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
                <Button text="Update" onClick={handleUpdateComment} />
              </div>
            )}
          </div>
        </div>

        {isRepliyng && (
          <Textarea
            username={comment.user.username}
            isRepliyng={isRepliyng}
            getText={setReplyText}
            onClick={handleReplyComment}
          />
        )}

        {replies && <RepliesList commentId={id} />}
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
