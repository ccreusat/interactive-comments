import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

// Slices
import comments from "../features/comments/commentsSlice";
import replies from "../features/replies/repliesSlice";
import user from "../features/user/userSlice";

const reducer = combineReducers({ comments, replies, user });
const store = configureStore({ reducer });

export default store;
