import { Score } from "../../components/Score";
import { Text } from "../../components/Text";
import { HeaderActions } from "../../components/HeaderActions";
import { UserToolbar } from "../../components/UserToolbar";

import { isCurrentUser } from "../../utils/isCurrentUser";
import { useState } from "react";

type Comment = {
  id: number;
  hasVoted: boolean;
  score: number;
  user: string;
  content: string;
  createdAt: number;
};

interface CommentProps {
  comment: Comment;
  onEditComment: (id: string, content: string) => void;
  onDeleteComment: (id: string) => void;
}

export const Comment = ({
  comment,
  onEditComment,
  onDeleteComment,
}: CommentProps) => {
  const { id, content, score, createdAt, user } = comment;
  const { username } = user;

  const isCurrentUser = username === "juliusomo";
  const [status, setStatus] = useState<string>("idle");

  return (
    <>
      <li className="item" data-id={id}>
        <div className="container">
          <Score score={score} isCurrentUser={isCurrentUser} />
          <UserToolbar username={username} createdAt={createdAt} />
          <HeaderActions
            id={String(id)}
            isCurrentUser={isCurrentUser}
            onDeleteComment={onDeleteComment}
            onEditingStatus={() => setStatus("editing")}
          />
          <Text
            id={String(id)}
            content={content}
            status={status}
            onEditComment={onEditComment}
            onEditingStatus={() => setStatus("idle")}
          />
        </div>
      </li>

      {/* {isVisible && (
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
      )} */}
    </>
  );
};
