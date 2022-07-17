import { useDateTime } from "../hooks/useDateTime";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { currentUser, isCurrentUser } from "../utils/isCurrentUser";
dayjs.extend(relativeTime);

type UserToolbarProps = {
  username: string;
  createdAt: number;
};

export const UserToolbar = ({ username, createdAt }: UserToolbarProps) => {
  const [time] = useDateTime(createdAt);

  const isUser = isCurrentUser(currentUser, username);

  return (
    <div className="toolbar">
      <div className="user">
        <figure className="avatar">
          <img src={`./avatars/image-${username}.webp`} alt={username} />
        </figure>
        <span>{username}</span>
        {isUser && <span className="current-user">you</span>}
      </div>
      <time className="date" dateTime={String(time)}>
        {dayjs(createdAt).fromNow()}
      </time>
    </div>
  );
};
