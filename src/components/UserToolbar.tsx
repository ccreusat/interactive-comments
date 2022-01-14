import { useDateTime } from "../hooks/useDateTime";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type UserToolbarProps = {
  username: string;
  createdAt: number;
  isCurrentUser: boolean;
};

export const UserToolbar = ({
  username,
  isCurrentUser,
  createdAt,
}: UserToolbarProps) => {
  const [time] = useDateTime(createdAt);

  return (
    <div className="toolbar">
      <div className="user">
        <figure className="avatar">
          <img src={`./avatars/image-${username}.webp`} alt={username} />
        </figure>
        <span>{username}</span>
        {isCurrentUser && <span className="current-user">you</span>}
      </div>
      <time className="date" dateTime={String(time)}>
        {dayjs(createdAt).fromNow()}
      </time>
    </div>
  );
};
