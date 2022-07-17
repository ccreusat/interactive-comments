import React, { useState } from "react";
import { Button } from "./Button";
import clsx from "clsx";

export const AddComment = ({ onAddComment, currentUser }: any) => {
  const [value, setValue] = useState("");
  const isCurrentUser = currentUser ? true : false;
  const isReplying = false;

  const classNames = clsx({
    "container grid": true,
    "mt-8": isReplying,
    "mt-20": !isReplying,
  });

  function handleChange({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(value);
  }

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
        value={value}
      ></textarea>
      <Button
        buttonClass="submit"
        onClick={() => {
          onAddComment(value);
          setValue("");
        }}
      >
        {isReplying ? "Reply" : "Send"}
      </Button>
    </div>
  );
};
