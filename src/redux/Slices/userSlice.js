import { createSlice } from "@reduxjs/toolkit";
import { request, getUser } from '../../Data'


const initialState = {
    loading: false,
    userData: [],
    error: false,
    errorMessage: null
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        isLoading: (state) => {
            state.loading = true
        },
        isError: (state, action) => {
            state.loading = false
            state.error = true
            state.errorMessage = action.payload
        },
        gotUserData: (state, action) => {
            state.loading = false
            state.userData = action.payload
        },
        createdUser: (state, action) => {

        },
        updatedUser: (state, action) => {

        },
        deletedUser: (state, action) => {

        }

    }
})

export default userSlice.reducer
export const { isError, isLoading, gotUserData, createdUser, updatedUser, deletedUser} = userSlice.actions


export async function createUser(user) {
    const res = await request('/users', 'POST', user);
    if (res.status === 201) {
      return res.data;
    } else if (res.status === 400) {
      return res
    } else {
      throw new Error();
    }
  }