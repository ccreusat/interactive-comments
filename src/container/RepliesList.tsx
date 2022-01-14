import { useSelector } from "react-redux";
import { selectReplies } from "../features/replies/repliesSlice";
import { Reply } from "../components/Reply";
import { memo } from "react";

export const RepliesList = memo(({ commentId }: any) => {
  // GET Replies
  const replies = useSelector(selectReplies);

  // We could sort comments differently if needed
  /* const sortedReplies = [...replies].sort(function (x: any, y: any) {
    return x.createdAt - y.createdAt;
  }); */

  return (
    replies && (
      <ul>
        {replies.map(
          (reply: any) =>
            reply.commentId === commentId && (
              <Reply key={reply.id} reply={reply} commentId={commentId} />
            )
        )}
      </ul>
    )
  );
});
