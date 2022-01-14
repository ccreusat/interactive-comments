import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const now = new Date();

const storedReplies: string[] = JSON.parse(
  localStorage.getItem("replies") || "[]"
);

const options = {
  name: "replies",
  initialState: {
    replies: (storedReplies.length > 0 && storedReplies) || [
      {
        id: 3,
        commentId: 2,
        content:
          "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
        createdAt: now.getTime() - 5184e5,
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
        createdAt: now.getTime() - 5184e5,
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
      const { replies } = state;

      const newReply = {
        id: uuidv4(),
        commentId,
        content: content.replace("@" + replyingTo, ""),
        createdAt: now.getTime(),
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

      localStorage.setItem("replies", JSON.stringify([...replies, newReply]));

      return {
        replies: [...replies, newReply],
      };
    },
    updateReply: (state: any, action: any) => {
      const { id, content } = action.payload;
      const { replies } = state;

      localStorage.setItem(
        "replies",
        JSON.stringify(
          replies.map((reply: any) =>
            reply.id === id ? { ...reply, content } : reply
          )
        )
      );

      return {
        replies: replies.map((reply: any) =>
          reply.id === id ? { ...reply, content } : reply
        ),
      };
    },
    deleteReply: (state: any, action: any) => {
      const { id } = action.payload;
      const { replies } = state;

      localStorage.setItem(
        "replies",
        JSON.stringify(replies.filter((reply: any) => reply.id !== id))
      );

      return {
        replies: replies.filter((reply: any) => reply.id !== id),
      };
    },
    incrementReplyScore: (state: any, action: any) => {
      const { id, score } = action.payload;
      const { replies } = state;

      localStorage.setItem(
        "replies",
        JSON.stringify(
          replies.map((reply: any) =>
            reply.id === id
              ? { ...reply, score: score + 1, hasVoted: true }
              : reply
          )
        )
      );

      return {
        replies: replies.map((reply: any) =>
          reply.id === id
            ? { ...reply, score: score + 1, hasVoted: true }
            : reply
        ),
      };
    },
    decrementReplyScore: (state: any, action: any) => {
      const { id, score } = action.payload;
      const { replies } = state;

      localStorage.setItem(
        "replies",
        JSON.stringify(
          replies.map((reply: any) =>
            reply.id === id
              ? { ...reply, score: score - 1, hasVoted: true }
              : reply
          )
        )
      );

      return {
        replies: replies.map((reply: any) =>
          reply.id === id
            ? { ...reply, score: score - 1, hasVoted: true }
            : reply
        ),
      };
    },
  },
};

export const selectReplies = (state: any) => state.replies.replies;

const repliesSlice = createSlice(options);

export const {
  addReply,
  deleteReply,
  updateReply,
  incrementReplyScore,
  decrementReplyScore,
} = repliesSlice.actions;
export default repliesSlice.reducer;
