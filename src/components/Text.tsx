import { Button } from "./Button";

type TextProps = {
  isEditable: boolean;
  replyingTo?: string;
  content: string;
  updatedText: string;
  setUpdatedText: (target: any) => void;
  onClick: () => void;
};

export const Text = ({
  isEditable,
  replyingTo,
  content,
  updatedText,
  setUpdatedText,
  onClick,
}: TextProps) => {
  return (
    <div className="comment">
      {!isEditable ? (
        <p>
          {replyingTo && (
            <strong className="replied">{`@${replyingTo}`}</strong>
          )}{" "}
          {content}
        </p>
      ) : (
        <div className="edit-comment mt-20">
          <label htmlFor="addComment">Add a new comment</label>
          <textarea
            id="addComment"
            className={isEditable ? "textarea" : ""}
            value={updatedText}
            onChange={e => setUpdatedText(e.target.value)}
          ></textarea>
          <Button buttonClass="submit" onClick={onClick}>
            Update
          </Button>
        </div>
      )}
    </div>
  );
};
