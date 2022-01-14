import { useEffect, useRef, useState } from "react";
import UpVote from "../images/icon-plus.svg";
import DownVote from "../images/icon-minus.svg";
import { useDispatch } from "react-redux";
import {
  incrementScore,
  decrementScore,
} from "../features/comments/commentsSlice";
// import { updateReplyScore } from "../features/replies/repliesSlice";

export const Score = ({ id, score, hasVoted, isCurrentUser }: any) => {
  const dispatch = useDispatch();

  // Upvote / Downvote score
  const [count, setcount] = useState(score || 0);
  const increment = () => {
    setcount(count + 1);
    dispatch(incrementScore({ id, score: count }));
  };
  const decrement = () => {
    setcount(count - 1);
    dispatch(decrementScore({ id, score: count }));
  };

  // Logged User can't upvote - downvote his owns comments / replies
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (hasVoted) setIsDisabled(true);
  }, [hasVoted]);

  useEffect(() => {
    setIsDisabled(isCurrentUser);
  }, [isCurrentUser]);

  return (
    <div className={`score ${isDisabled ? "is-disabled" : ""}`}>
      <button onClick={() => increment()} disabled={isDisabled}>
        <img src={UpVote} alt="reply to" />
      </button>
      <span>{score}</span>
      <button onClick={() => decrement()} disabled={isDisabled}>
        <img src={DownVote} alt="reply to" />
      </button>
    </div>
  );
};