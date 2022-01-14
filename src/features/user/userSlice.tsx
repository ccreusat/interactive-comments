import { createSlice } from "@reduxjs/toolkit";

const options = {
    name: "user",
    initialState: {
        user: {
            "image": {
              "png": "./images/avatars/image-juliusomo.png",
              "webp": "./images/avatars/image-juliusomo.webp"
            },
            "username": "juliusomo"
        }
    },
    reducers: {}
}

export const selectUser = (state:any) => state.user.user;

const commentsSlice = createSlice(options);

// export const { addComment } = commentsSlice.actions;
export default commentsSlice.reducer;