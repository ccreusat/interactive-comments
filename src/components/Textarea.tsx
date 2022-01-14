import { useEffect, useState } from "react";
import { Button } from "./Button";
import { selectUser } from "../features/user/userSlice";
import { useSelector } from "react-redux";

export const Textarea = ({ username, isRepliyng, getText, onClick }: any) => {
  // GET Current User
  const user = useSelector(selectUser);

  // GET value from textarea and handle it
  const [text, setText] = useState("");
  const handleChange = ({ target }: any) => setText(target.value);

  useEffect(() => {
    getText(text);
  }, [text]);

  return (
    <div className={`container ${isRepliyng ? "mt-8" : "mt-20"}`}>
      {user && (
        <div className="user">
          <figure className="avatar">
            <img
              src={`src/images/avatars/image-${user.username}.webp`}
              alt="username"
            />
          </figure>
        </div>
      )}
      <textarea
        className="textarea"
        onChange={e => handleChange(e)}
        placeholder="Add a comment..."
        value={isRepliyng ? `${text}` : `${text}`}
      ></textarea>
      <Button text={isRepliyng ? "Reply" : "Send"} onClick={onClick} />
    </div>
  );
};
