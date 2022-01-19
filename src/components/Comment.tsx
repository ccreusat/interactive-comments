import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addReply } from "../features/replies/repliesSlice";
import { selectUser } from "../features/user/userSlice";
import {
  updateComment,
  deleteComment,
} from "../features/comments/commentsSlice";

import { Score } from "./Score";
import { Modal } from "./Modal";
import { Textarea } from "./Textarea";
import { RepliesList } from "../container/RepliesList";
import { Text } from "./Text";
import { HeaderActions } from "./HeaderActions";
import { UserToolbar } from "./UserToolbar";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { isCurrentUser } from "../utils/isCurrentUser";
import { Button } from "./Button";
dayjs.extend(relativeTime);

export const Comment = ({ comment }: any) => {
  const dispatch = useDispatch();

  // Destructure comment
  const { id, hasVoted, score, user, content, createdAt } = comment;
  const { username } = user;

  // Get current user
  const currentUser = useSelector(selectUser);
  // const isCurrentUser = currentUser.username === username;

  // Set visible mode Modal and set props
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [modalProps, setModalProps] = useState<any>({
    header: "",
    text: "",
    message: "",
    cancelButtonVisibility: true,
    cancel: () => {},
    confirm: () => {},
  });

  const modalOptions = (
    header: string,
    text: string,
    message: string,
    cancelButtonVisibility: boolean,
    cancel: () => void,
    confirm: () => void
  ) => {
    setModalProps({
      header,
      text,
      message,
      cancelButtonVisibility,
      cancel,
      confirm,
    });
  };

  useEffect(() => {
    isVisible
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "");
  }, [isVisible]);

  // Update Comment
  const [isEditable, setIsEditable] = useState(false);
  const [updatedText, setUpdatedText] = useState("");

  const editComment = () => {
    setIsEditable(true);
    setUpdatedText(content);
  };

  const handleUpdateComment = () => {
    modalOptions(
      "Update Comment",
      "Are you sure you want to update this comment?",
      "Yes, update",
      true,
      resetStatusComment,
      confirmUpdateComment
    );
    setIsVisible(true);
  };

  const confirmUpdateComment = () => {
    const { id } = comment;
    dispatch(updateComment({ id, content: updatedText }));
    resetStatusComment();
  };

  const resetStatusComment = () => {
    setIsEditable(false);
    setIsVisible(false);
  };

  // Delete Comment
  const handleDeleteComment = () => {
    modalOptions(
      "Delete Comment",
      "Are you sure you want to delete this comment? This will remove the comment and can’t be undone.",
      "Yes, delete",
      true,
      () => setIsVisible(false),
      confirmDeleteComment
    );
    setIsVisible(true);
  };

  const confirmDeleteComment = () => {
    dispatch(deleteComment(comment));
    setIsVisible(false);
  };

  // ReplyTo
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const replyTo = () => {
    setIsReplying(!isReplying);
  };
  const handleReplyComment = () => {
    modalOptions(
      "Confirm",
      "Are you sure you want to reply to this comment?",
      "Yes",
      true,
      resetStatusReply,
      submitReply
    );
    setIsVisible(true);
  };
  const alertMention = () => {
    modalOptions(
      "Oops!",
      `You can't reply without mentionning @${username}`,
      "Ok",
      false,
      () => setIsVisible(false),
      () => setIsVisible(false)
    );
    setIsVisible(true);
  };
  // ADD a new reply
  const submitReply = () => {
    const newReply = {
      content: replyText,
      user: currentUser,
      commentId: id,
      replyingTo: comment.user.username,
    };
    if (replyText !== "") {
      dispatch(addReply(newReply));
      setReplyText("");
    }
    resetStatusReply();
  };
  const resetStatusReply = () => {
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
            isCurrentUser={isCurrentUser(currentUser, username)}
          />
          <div className="comment">
            <header className="header">
              <div className="toolbar">
                <UserToolbar
                  username={username}
                  isCurrentUser={isCurrentUser(currentUser, username)}
                />
                <time className="date">{dayjs(createdAt).fromNow()}</time>
              </div>
              <HeaderActions
                isCurrentUser={isCurrentUser(currentUser, username)}
                deleteText={handleDeleteComment}
                editText={editComment}
                replyTo={replyTo}
              />
            </header>
            <Text
              isEditable={isEditable}
              content={content}
              updatedText={updatedText}
              setUpdatedText={setUpdatedText}
              onClick={handleUpdateComment}
            />
          </div>
        </div>

        {isReplying && (
          <Textarea
            username={username}
            isReplying={isReplying}
            setCommentText={setReplyText}
            alertMention={alertMention}
            onClick={handleReplyComment}
          />
        )}

        <RepliesList commentId={id} />
      </li>

      {isVisible && (
        <Modal headerText={modalProps.header} bodyText={modalProps.text}>
          {modalProps.cancelButtonVisibility && (
            <Button
              onClick={modalProps.cancel}
              buttonClass="cancel"
              text="No, cancel"
            />
          )}
          <Button
            onClick={modalProps.confirm}
            buttonClass="confirm"
            text={modalProps.message}
          />
        </Modal>
      )}
    </>
  );
};
