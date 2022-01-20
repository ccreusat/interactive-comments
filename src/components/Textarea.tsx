import { useState, memo, useCallback } from "react";
import { Button } from "./Button";
import { selectUser } from "../features/user/userSlice";
import { useSelector } from "react-redux";

export const Textarea = memo(
  ({ setCommentText, onClick, username, isReplying, alertMention }: any) => {
    // GET Current User
    const currentUser = useSelector(selectUser);

    // GEt Text
    const defaultText = isReplying ? `@${username} ` : "";
    const [text, setText] = useState(defaultText);

    const handleChange = ({ target }: any) => {
      setText(target.value);
      setCommentText(target.value);
    };
    const handleOnClick = () => {
      if (isReplying) {
        if (!text.includes(`@${username}`) || text === "") {
          alertMention();
        } else {
          onClick().then(()=> {
            setText("");
            setCommentText("");
          });
        }
        
      }
      
      if (!isReplying && text !== "") {
        onClick();
        setText("");
        setCommentText("");
      }
    };

    return (
      <div className={`container ${isReplying ? "mt-8" : "mt-20"}`}>
        {currentUser && (
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
          onChange={e => handleChange(e)}
          placeholder="Add a comment..."
          value={text}
        ></textarea>
        <Button
          text={isReplying ? "Reply" : "Send"}
          buttonClass="submit"
          onClick={handleOnClick}
        />
      </div>
    );
  }
);
