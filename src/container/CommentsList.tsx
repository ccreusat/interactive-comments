import { useSelector } from "react-redux";
import { selectComments } from "../features/comments/commentsSlice";
import { Comment } from "../components/Comment";

export const CommentsList = () => {
  // GET Comments
  const comments = useSelector(selectComments);

  // We could sort comments differently if needed
  const sortedComments = [...comments].sort(function (x: any, y: any) {
    return x.createdAt - y.createdAt;
  });

  return (
    comments && (
      <ul className="comments">
        {sortedComments.map((comment: any) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
    )
  );
};
