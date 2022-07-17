import { Comment } from "./Comment";

export default function CommentsList({
  comments,
  onEditComment,
  onDeleteComment,
}: any) {
  return (
    comments && (
      <ul className="comments">
        {comments.map((comment: any) => (
          <Comment
            key={comment.id}
            comment={comment}
            onEditComment={onEditComment}
            onDeleteComment={onDeleteComment}
          />
        ))}
      </ul>
    )
  );
}
