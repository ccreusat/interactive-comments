type CurrentUserProps = {
  currentUser: any;
  username: string;
};
export const isCurrentUser = (currentUser: any, username: any): boolean =>
  currentUser.username === username;

export const currentUser = {
  image: {
    png: "./images/avatars/image-juliusomo.png",
    webp: "./images/avatars/image-juliusomo.webp",
  },
  username: "juliusomo",
};
