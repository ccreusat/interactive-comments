import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { selectUser } from "../user/userSlice";
import { useSelector } from "react-redux";

const options = {
  name: "comments",
  initialState: {
    comments: [
      {
        id: 1,
        content:
          "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        createdAt: "1 month ago",
        score: 12,
        hasVoted: false,
        user: {
          image: {
            png: "./images/avatars/image-amyrobson.png",
            webp: "./images/avatars/image-amyrobson.webp",
          },
          username: "amyrobson",
        },
      },
      {
        id: 2,
        content:
          "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        createdAt: "1 month ago",
        score: 5,
        hasVoted: false,
        user: {
          image: {
            png: "./images/avatars/image-maxblagun.png",
            webp: "./images/avatars/image-maxblagun.webp",
          },
          username: "maxblagun",
        },
      },
    ],
  },
  reducers: {
    addComment: (state: any, action: any) => {
      const { content, user } = action.payload;
      const newComment = {
        id: uuidv4(),
        content: content,
        createdAt: "today",
        score: 0,
        user: {
          image: {
            png: `./images/avatars/image-${user.username}.png`,
            webp: `./images/avatars/image-${user.username}.webp`,
          },
          username: user.username,
        },
      };
      return {
        comments: [...state.comments, newComment],
      };
    },
    updateComment: (state: any, action: any) => {
      const { id, content } = action.payload;

      return {
        comments: state.comments.map((comment: any) =>
          comment.id === id ? { ...comment, content } : comment
        ),
      };
    },
    deleteComment: (state: any, action: any) => {
      const { id } = action.payload;

      return {
        comments: state.comments.filter((comment: any) => comment.id !== id),
      };
    },
    updateScore: (state: any, action: any) => {
      const { id, score } = action.payload;
      console.log(id, score);

      // UPDATE object, 1
      /* const index = state.comments.findIndex((comment:any) => comment.id === id);
            if (index !== -1) {
                state.comments[index].score = score;
            } */

      // UPDATE object, 1.5
      /* let index = state.comments.findIndex((comment:any) => comment.id === id);
            let comments = [...state.comments];
            if (index !== -1) {
                comments[index] = {...comments[index], score: score};
                return {
                    ...state, comments
                }
            } */

      // UPDATE object, 2
      /* const comment = state.comments.find((comment:any) => comment.id === id);
            comment.score = score; */

      // UPDATE object, 3
      return {
        comments: state.comments.map((comment: any) =>
          comment.id === id
            ? { ...comment, score: score, hasVoted: true }
            : comment
        ),
      };
    },
    incrementScore: (state: any, action: any) => {
      const { id, score } = action.payload;
      console.log(id, score);
      return {
        comments: state.comments.map((comment: any) =>
          comment.id === id
            ? { ...comment, score: score + 1, hasVoted: true }
            : comment
        ),
      };
    },
    decrementScore: (state: any, action: any) => {
      const { id, score } = action.payload;
      console.log(id, score);
      return {
        comments: state.comments.map((comment: any) =>
          comment.id === id
            ? { ...comment, score: score + 1, hasVoted: true }
            : comment
        ),
      };
    },
  },
};

export const selectComments = (state: any) => state.comments.comments;

const commentsSlice = createSlice(options);

export const {
  addComment,
  deleteComment,
  updateComment,
  incrementScore,
  decrementScore,
} = commentsSlice.actions;
export default commentsSlice.reducer;
