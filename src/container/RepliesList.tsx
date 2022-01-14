import { useSelector } from "react-redux";
import { selectReplies } from "../features/replies/repliesSlice";
import { Reply } from "../components/Reply";

export const RepliesList = ({ commentId }: any) => {
  // GET Replies
  const replies = useSelector(selectReplies);

  return (
    replies && <ul>
      {replies.map(
        (reply: any) =>
          reply.commentId === commentId && (
            <Reply key={reply.id} reply={reply} commentId={commentId} />
          )
      )}
    </ul>
  );
};
