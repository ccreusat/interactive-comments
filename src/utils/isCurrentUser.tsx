type CurrentUserProps = {
  currentUser: any;
  username: string;
};
export const isCurrentUser = (currentUser: any, username: any): boolean =>
  currentUser.username === username;
