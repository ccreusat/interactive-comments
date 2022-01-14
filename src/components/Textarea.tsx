import { useState } from "react";
import { Button } from "./Button";
import { selectUser } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../hooks/useCurrentUser";
import clsx from "clsx";

export const Textarea = ({
  handleCommentText,
  onClick,
  username,
  isReplying,
  alertMention,
}: any) => {
  // GET Current User
  const { isCurrentUser } = useCurrentUser(username);
  const currentUser = useSelector(selectUser);

  // GEt Text
  const defaultText = isReplying ? `@${username} ` : "";
  const [text, setText] = useState(defaultText);

  const handleChange = ({ target }: any) => {
    setText(target.value);
    handleCommentText(target.value);
  };

  const handleOnClick = () => {
    if (isReplying) {
      if (!text.includes(`@${username}`) || text === "") {
        alertMention();
      } else {
        onClick();
        setText("");
        handleCommentText("");
      }
    }

    if (!isReplying && text !== "") {
      onClick();
      setText("");
      handleCommentText("");
    }
  };

  const classNames = clsx({
    'container grid': true,
    "mt-8": isReplying,
    "mt-20": !isReplying
  })

  return (
    <div className={classNames}>
      {isCurrentUser && (
        <div className="user">
          <figure className="avatar">
            <img
              src={`./avatars/image-${currentUser.username}.webp`}
              alt="username"
            />
          </figure>
        </div>
      )}
      <textarea
        className="textarea"
        onChange={handleChange}
        placeholder="Add a comment..."
        value={text}
      ></textarea>
      <Button
        buttonClass="submit"
        onClick={handleOnClick}>{isReplying ? "Reply" : "Send"}</Button>
    </div>
  );
};
