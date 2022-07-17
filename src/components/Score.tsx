import { useState } from "react";
import clsx from "clsx";

import UpVote from "../images/icon-plus.svg";
import DownVote from "../images/icon-minus.svg";
import useCounter from "../hooks/useCounter";
import { useDisabled } from "../hooks/useDisabled";

interface ScoreProps {
  score: number;
  isCurrentUser: boolean;
}

export const Score = ({ score, isCurrentUser }: ScoreProps) => {
  // initial value with score prop
  const [counter, dispatch] = useCounter(score);

  const [vote, setVote] = useState<boolean>(false);
  const { isDisabled: voteDisabled } = useDisabled(false);
  const { isDisabled: currentUserDisabled } = useDisabled(isCurrentUser);

  const classnames = clsx("score", {
    "is-disabled": currentUserDisabled || voteDisabled || vote,
  });

  function upVote() {
    dispatch("increment");
    setVote(true);
  }

  function downVote() {
    dispatch("decrement");
    setVote(true);
  }
  return (
    <div className={classnames}>
      <button onClick={upVote} disabled={voteDisabled}>
        <img src={UpVote} alt="reply to" />
      </button>
      <span>{counter}</span>
      <button onClick={downVote} disabled={voteDisabled}>
        <img src={DownVote} alt="reply to" />
      </button>
    </div>
  );
};
