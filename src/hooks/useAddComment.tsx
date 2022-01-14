import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import { addComment } from "../features/comments/commentsSlice";

export const useAddComment = () => {
    const dispatch = useDispatch();
    // GET Current User
    const currentUser = useSelector(selectUser);

    // GET value from textarea and handle it
    const [commentText, setCommentText] = useState<string>("");

    // ADD a new comment
    const addNewComment = () => {
        const comment = { content: commentText, user: currentUser };
        dispatch(addComment(comment));
    };

    return [commentText, currentUser, setCommentText, addNewComment];
    
    /* const getFullDate = () => {
        let year = new Date(createdAt).getFullYear();
        let month = new Date(createdAt).getMonth() < 10 ? "0" + (new Date(createdAt).getMonth() +1) : new Date(createdAt).getMonth() + 1;
        let date = new Date(createdAt).getDate() < 10 ? "0" + (new Date(createdAt).getDate()) : new Date(createdAt).getDate() ;
        return `${year}-${month}-${date}`;
    }

    const [dateTime, setDateTime] = useState(getFullDate());

    return [dateTime]; */
}