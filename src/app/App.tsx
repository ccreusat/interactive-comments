import { useState } from "react";
import { AddComment } from "../components/AddComment";
import CommentsList from "../features/Comments/CommentsList";
import { v4 as uuidv4 } from "uuid";

import "./App.css";
import { currentUser } from "../utils/isCurrentUser";

const App = () => {
  const initialComments = [
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

  const [comments, setComments] = useState(initialComments);

  function handleAddComment(content: string) {
    if (content) {
      setComments([
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
      ]);
    }
  }

  function handleDeleteComment(id: string) {
    const fileteredComments = comments.filter(comment => comment.id !== id);
    setComments(fileteredComments);
  }

  function handleEditComment(id: string, content: string) {
    const editedComments = comments.map(comment => {
      if (comment.id === id) {
        return {
          ...comment,
          content,
        };
      }
      return comment;
    });
    setComments(editedComments);
  }

  return (
    <>
      <CommentsList
        comments={comments}
        onEditComment={handleEditComment}
        onDeleteComment={handleDeleteComment}
      />

      {currentUser && (
        <AddComment currentUser={currentUser} onAddComment={handleAddComment} />
      )}
    </>
  );
};

export default App;
