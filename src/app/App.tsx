import { useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { addComment } from "../features/comments/commentsSlice";
import { selectUser } from "../features/user/userSlice";
import { Textarea } from "../components/Textarea";
import { CommentsList } from "../container/CommentsList";

const App = () => {
  const dispatch = useDispatch();
  // GET Current User
  const currentUser = useSelector(selectUser);

  // GET value from textarea and handle it
  const [commentText, setCommentText] = useState<string>("");

  // ADD a new comment
  const addNewComment = () => {
    const comment = { content: commentText, user: currentUser };
    dispatch(addComment(comment));
  };

  return (
    <>
      <CommentsList />

      {currentUser && (
        <Textarea setCommentText={setCommentText} onClick={addNewComment} />
      )}
    </>
  );
};

export default App;
