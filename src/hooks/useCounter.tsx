import { useState, useEffect, useCallback } from "react";

export const useCounter = (score: number) => {
  // Upvote / Downvote score
  const [count, setcount] = useState(score || 0);
  const increment = useCallback(() => setcount(count + 1), [count]);
  const decrement = useCallback(() => setcount(count - 1), [count]);
  return { count, increment, decrement };
};
