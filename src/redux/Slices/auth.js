import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { request } from "../../Data";

const initialState = {
    loading: false,
    userSignedIn: false,
    authedUser: Cookies.getJSON('authedUser') || null,
    password: Cookies.get('password') || null,
    errors: []
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        toggleLoading: (state) => {
            state.loading = !state.loading
          },
        userSignIn: (state, action) => {
            state.authedUser = action.payload
            Cookies.set('authedUser', JSON.stringify(state.authedUser), { expires: 7 });
            state.userSignedIn = true
            state.errorMessage = null
            toggleLoading()
        },
        userSignOut: (state) => {
            state.authedUser = null
            state.userSignedIn = false
            Cookies.remove('authedUser');
            Cookies.remove('password');
        },
        isError: (state, action) => {
            const { message } = action.payload
            state.errors.push(message)
            toggleLoading()
        }
    }
})

export default authSlice.reducer
export const { userSignIn, userSignOut, toggleLoading, isError } = authSlice.actions

export const signIn = (email, password) => {
    return async dispatch => {
    dispatch(toggleLoading())
    try {
        const user = await request(`/users`, 'GET', null, true, {
            email,
            password,
          });
        if (user !== null) {
           dispatch(userSignIn(user.data))
         Cookies.set('password', password);
       }
    } catch (err) {
        console.log(err)
        dispatch(isError(err))
    }
   
}
  };
  // signs out user and removes cookies
export const signOut = () => {
    return dispatch => {
        dispatch(userSignOut())
    console.log(`Logout Successful`)
    }
  };
