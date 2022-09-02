import { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { IComment } from "./Comments/Comment";

type Actions =
  | {
      type: "add";
      payload: any;
    }
  | {
      type: "edit";
      payload: any;
    }
  | {
      type: "delete";
      payload: any;
    };

export const initialComments = [
  {
    id: uuidv4(),
    content:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    createdAt: new Date(),
    score: 0,
    user: {
      image: {
        png: "./images/avatars/image-amyrobson.png",
        webp: "./images/avatars/image-amyrobson.webp",
      },
      username: "amyrobson",
    },
  },
];

function commentsReducer(comments: string[], action: Actions) {
  switch (action.type) {
    case "add": {
      const { content } = action.payload;
      if (content) {
        return [
          ...comments,
          {
            id: uuidv4(),
            content,
            createdAt: new Date(),
            score: 0,
            user: {
              image: {
                png: "./images/avatars/image-juliusomo.png",
                webp: "./images/avatars/image-juliusomo.webp",
              },
              username: "juliusomo",
            },
          },
        ];
      }
    }
    case "edit": {
      const { content, id } = action.payload;
      return comments.map((comment: any) => {
        if (comment.id === id) {
          return {
            ...comment,
            content,
          };
        }
        return comment;
      });
    }
    case "delete": {
      const { id } = action.payload;
      return comments.filter((comment: any) => comment.id !== id);
    }
    default: {
      throw Error("Unknown action");
    }
  }
}

export default function useComments() {
  return useReducer(commentsReducer, initialComments);
}
