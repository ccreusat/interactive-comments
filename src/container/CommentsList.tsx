import { useSelector } from "react-redux";
import { selectComments } from "../features/comments/commentsSlice";
import { Comment } from "../components/Comment";
import { memo } from "react";

export const CommentsList = memo(() => {
  // GET Comments
  const comments = useSelector(selectComments);

  // We could sort comments differently if needed
  /* const sortedComments = [...comments].sort(function (x: any, y: any) {
    return x.createdAt - y.createdAt;
  }); */

  return (
    comments && (
      <ul className="comments">
        {comments.map((comment: any) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
    )
  );
});
