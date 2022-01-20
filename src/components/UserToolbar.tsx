type UserToolbarProps = {
  username: string;
  isCurrentUser: boolean;
};

export const UserToolbar = ({ username, isCurrentUser }: UserToolbarProps) => {
  return (
    <div className="user">
      <figure className="avatar">
        <img src={`./avatars/image-${username}.webp`} alt={username} />
      </figure>
      <span>{username}</span>
      {isCurrentUser && <span className="current-user">you</span>}
    </div>
  );
};
