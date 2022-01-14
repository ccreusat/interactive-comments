import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addComment } from "../features/comments/commentsSlice";
import { selectUser } from "../features/user/userSlice";
import { Textarea } from "../components/Textarea";
import { CommentsList } from "../container/CommentsList";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  // GET Current User
  const currentUser = useSelector(selectUser);
  // GET value from textarea and handle it
  const [commentText, setCommentText] = useState<string>("");
  // ADD a new comment
  const onAddComment = () => {
    const comment = { content: commentText, user: currentUser };
    dispatch(addComment(comment));
  };

  const handleCommentText = useCallback(
    (value: any) => {
      setCommentText(value);
    },
    [commentText]
  );

  return (
    <>
      <CommentsList />

      {currentUser && (
        <Textarea
          handleCommentText={handleCommentText}
          onClick={onAddComment}
        />
      )}
    </>
  );
};

export default App;
