import { useState } from "react";
import UpVote from "../images/icon-plus.svg";
import DownVote from "../images/icon-minus.svg";
import { useDispatch } from "react-redux";
import {
  incrementScore,
  decrementScore,
} from "../features/comments/commentsSlice";
import {
  incrementReplyScore,
  decrementReplyScore,
} from "../features/replies/repliesSlice";
import { useCounter } from "../hooks/useCounter";
import { useDisabled } from "../hooks/useDisabled";

export const Score = ({ id, score, hasVoted, isCurrentUser, type }: any) => {
  const dispatch = useDispatch();
  const [toggleVote, setToggleVote] = useState<boolean>(hasVoted);
  const { isDisabled: voteDisabled } = useDisabled(hasVoted);
  const { isDisabled: currentUserDisabled } = useDisabled(isCurrentUser);

  const {
    count: commentCount,
    increment: incrementComment,
    decrement: decrementComment,
  } = useCounter(score);

  const {
    count: replyCount,
    increment: incrementReply,
    decrement: decrementReply,
  } = useCounter(score);

  const handleUpvoteComment = () => {
    if (type === "reply") {
      incrementComment();
      dispatch(incrementReplyScore({ id, score: replyCount }));
    } else {
      incrementReply();
      dispatch(incrementScore({ id, score: commentCount }));
    }
    setToggleVote(true);
  };
  const handleDownvoteComment = () => {
    if (type === "reply") {
      decrementReply();
      dispatch(decrementReplyScore({ id, score: replyCount }));
    } else {
      decrementComment();
      dispatch(decrementScore({ id, score: commentCount }));
    }
    setToggleVote(true);
  };

  return (
    <div
      className={`score ${
        toggleVote || voteDisabled || currentUserDisabled ? "is-disabled" : ""
      }`}
    >
      <button onClick={handleUpvoteComment} disabled={voteDisabled}>
        <img src={UpVote} alt="reply to" />
      </button>
      <span>{score}</span>
      <button onClick={handleDownvoteComment} disabled={voteDisabled}>
        <img src={DownVote} alt="reply to" />
      </button>
    </div>
  );
};
