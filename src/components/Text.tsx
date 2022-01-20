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
  return !isEditable ? (
    <p>
      {replyingTo && <strong className="replied">{`@${replyingTo}`}</strong>}{" "}
      {content}
    </p>
  ) : (
    <div className="edit-comment mt-20">
      <textarea
        className={isEditable ? "textarea" : ""}
        value={updatedText}
        onChange={e => setUpdatedText(e.target.value)}
      ></textarea>
      <Button text="Update" buttonClass="submit" onClick={onClick} />
    </div>
  );
};
