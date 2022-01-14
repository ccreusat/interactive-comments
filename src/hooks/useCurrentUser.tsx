import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";

export const useCurrentUser = (username: string) => {
  const currentUser = useSelector(selectUser);
  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser !== username) setIsCurrentUser(!isCurrentUser);
  }, []);

  return { isCurrentUser };
};
