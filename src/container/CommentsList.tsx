import { useSelector } from "react-redux";
import { selectComments } from "../features/comments/commentsSlice";
import { Comment } from "../components/Comment";

export const CommentsList = () => {
  // GET Comments
  const comments = useSelector(selectComments);

  return (
    comments &&
    <ul className="comments">
      {comments.map((comment: any) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </ul>
  );
};
