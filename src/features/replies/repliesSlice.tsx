import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const options = {
  name: "replies",
  initialState: {
    replies: [
      {
        id: 3,
        commentId: 2,
        content:
          "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
        createdAt: "1 week ago",
        score: 4,
        replyingTo: "maxblagun",
        user: {
          image: {
            png: "./images/avatars/image-ramsesmiron.png",
            webp: "./images/avatars/image-ramsesmiron.webp",
          },
          username: "ramsesmiron",
        },
      },
      {
        id: 4,
        commentId: 2,
        content:
          "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
        createdAt: "2 days ago",
        score: 2,
        replyingTo: "ramsesmiron",
        user: {
          image: {
            png: "./images/avatars/image-juliusomo.png",
            webp: "./images/avatars/image-juliusomo.webp",
          },
          username: "juliusomo",
        },
      },
    ],
  },
  reducers: {
    addReply: (state: any, action: any) => {
      const { commentId, user, content, replyingTo } = action.payload;

      const newReply = {
        id: uuidv4(),
        commentId,
        content,
        createdAt: "today",
        score: 0,
        replyingTo,
        user: {
          image: {
            png: `./images/avatars/image-${user.username}.png`,
            webp: `./images/avatars/image-${user.username}.webp`,
          },
          username: user.username,
        },
      };
      return {
        replies: [...state.replies, newReply],
      };
    },
    updateReply: (state: any, action: any) => {
      const { id, content } = action.payload;

      return {
        replies: state.replies.map((reply: any) =>
          reply.id === id ? { ...reply, content } : reply
        ),
      };
    },
    deleteReply: (state: any, action: any) => {
      const { id } = action.payload;

      return {
        replies: state.replies.filter((reply: any) => reply.id !== id),
      };
    },
    updateReplyScore: (state: any, action: any) => {
      const { id, score } = action.payload;

      return {
        replies: state.replies.map((reply: any) =>
          reply.id === id ? { ...reply, score: score, hasVoted: true } : reply
        ),
      };
    },
  },
};

export const selectReplies = (state: any) => state.replies.replies;

const repliesSlice = createSlice(options);

export const { addReply, deleteReply, updateReply, updateReplyScore } =
  repliesSlice.actions;
export default repliesSlice.reducer;
