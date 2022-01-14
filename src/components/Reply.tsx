import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addReply } from "../features/replies/repliesSlice";
import { selectUser } from "../features/user/userSlice";
import { updateReply, deleteReply } from "../features/replies/repliesSlice";

import { Score } from "./Score";
import { Modal } from "./Modal";
import { Textarea } from "./Textarea";
import { Text } from "./Text";
import { HeaderActions } from "./HeaderActions";
import { UserToolbar } from "./UserToolbar";

import { isCurrentUser } from "../utils/isCurrentUser";
import { Button } from "./Button";

type Reply = {
  id: number;
  hasVoted: boolean;
  score: number;
  user: string;
  content: string;
  createdAt: any;
  replyingTo: string;
};

interface ReplyProps {
  reply: Reply;
  commentId: number;
}

export const Reply = ({ reply, commentId }: ReplyProps) => {
  const dispatch = useDispatch();

  const { id, hasVoted, score, user, content, createdAt, replyingTo } = reply;
  const { username }: any = user;

  // Get current user
  const currentUser = useSelector(selectUser);

  // Set visible mode Modal and set props
  const [modalProps, setModalProps] = useState<any>({
    header: "",
    text: "",
    message: "",
    cancelButtonVisibility: true,
    cancel: () => {},
    confirm: () => {},
  });
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Update Reply
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [updatedText, setUpdatedText] = useState<string>("");
  const editReply = () => {
    setIsEditable(!isEditable);
    setUpdatedText(content);
  };

  const handleUpdateReply = () => {
    setModalProps({
      header: "Update Reply",
      text: "Are you sure you want to update this reply?",
      message: "Yes, update",
      cancelButtonVisibility: true,
      cancel: onCancelUpdateReply,
      confirm: confirmUpdateReply,
    });
    setIsVisible(true);
  };

  const confirmUpdateReply = () => {
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
      message: "Yes, delete",
      cancelButtonVisibility: true,
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
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>("");

  const replyTo = () => setIsReplying(!isReplying);

  const confirmReply = () => {
    setModalProps({
      header: "Confirm",
      text: "Are you sure you want to reply?",
      message: "Yes",
      cancelButtonVisibility: true,
      cancel: resetStatusReply,
      confirm: submitReply,
    });
    setIsVisible(true);
  };
  const alertMention = () => {
    setModalProps({
      header: "Oops!",
      text: `You can't reply without mentionning @${username}`,
      message: "Ok",
      cancelButtonVisibility: false,
      cancel: () => setIsVisible(false),
      confirm: () => setIsVisible(false),
    });
    setIsVisible(true);
  };
  // ADD a new reply
  const submitReply = () => {
    const newReply = {
      content: replyText,
      user: currentUser,
      commentId: commentId,
      replyingTo: username,
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
            hasVoted={hasVoted}
            score={score}
            isCurrentUser={isCurrentUser(currentUser, username)}
            type="reply"
          />
          <UserToolbar
            username={username}
            createdAt={createdAt}
            isCurrentUser={isCurrentUser(currentUser, username)}
          />
          <HeaderActions
            isCurrentUser={isCurrentUser(currentUser, username)}
            deleteText={handleDeleteReply}
            editText={editReply}
            replyTo={replyTo}
          />
          <Text
            isEditable={isEditable}
            replyingTo={replyingTo}
            content={content}
            updatedText={updatedText}
            setUpdatedText={setUpdatedText}
            onClick={handleUpdateReply}
          />
        </div>

        {isReplying && (
          <Textarea
            username={username}
            isReplying={isReplying}
            setCommentText={setReplyText}
            alertMention={alertMention}
            onClick={confirmReply}
          />
        )}
      </li>

      {isVisible && (
        <Modal headerText={modalProps.header} bodyText={modalProps.text}>
          {modalProps.cancelButtonVisibility && (
            <Button onClick={modalProps.cancel} buttonClass="cancel">
              No, cancel
            </Button>
          )}
          <Button onClick={modalProps.confirm} buttonClass="confirm">
            {modalProps.message}
          </Button>
        </Modal>
      )}
    </>
  );
};
