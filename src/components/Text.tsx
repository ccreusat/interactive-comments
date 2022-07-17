import React, { useState } from "react";
import { Button } from "./Button";

type TextProps = {
  id: string;
  content: string;
  status: string;
  onEditingStatus: () => void;
  onEditComment: (id: string, content: string) => void;
};

export const Text = ({
  content,
  id,
  status,
  onEditingStatus,
  onEditComment,
}: TextProps) => {
  const isEditing = status === "editing";
  const [value, setValue] = useState(content);

  function handleEditChange({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(value);
  }
  return (
    <div className="comment">
      {!isEditing ? (
        <p>{content}</p>
      ) : (
        <div className="edit-comment mt-20">
          <label htmlFor="addComment" className="visually-hidden">
            Add a new comment
          </label>
          <textarea
            id="addComment"
            className={isEditing ? "textarea" : ""}
            value={value}
            onChange={handleEditChange}
          ></textarea>
          <Button
            buttonClass="submit"
            onClick={() => {
              onEditComment(id, value);
              onEditingStatus();
            }}
          >
            Update
          </Button>
        </div>
      )}
    </div>
  );
};
