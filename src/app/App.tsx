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
  const [text, setText] = useState("");

  // ADD a new comment
  const submitComment = () => {
    const comment = {
      content: text,
      user: currentUser,
    };
    if (text !== "") {
      dispatch(addComment(comment));
    }
  };

  return (
    <>
      <CommentsList />

      {currentUser && (
        <Textarea
          username={currentUser.username}
          isRepliyng={false}
          getText={setText}
          onClick={submitComment}
        />
      )}
    </>
  );
};

export default App;
