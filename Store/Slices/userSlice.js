import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   user : null
  };

  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        userHandler :( state, action) => {
            state.user = action.payload
            // console.log("aaaaaction",action.payload)
        }
    }
  })

  const { actions } = userSlice;
export const { userHandler } = actions;

export default userSlice.reducer;