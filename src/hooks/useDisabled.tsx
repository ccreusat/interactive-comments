import { useState, useEffect } from "react";

export const useDisabled = (item: boolean) => {
  // Upvote / Downvote score

  // Logged User can't upvote - downvote his owns comments / replies
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  // If user has voted, disable possibility to upvote/downvote
  useEffect(() => {
    if (item) {
      setIsDisabled(true);
    }
  }, []);

  return { isDisabled };
};
