import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IAuthState {
    auth: {
        username: string,
        password: string,
        authorization: boolean,
    }
}

const initialState: IAuthState = {
    auth: {
        username: "",
        password: "",
        authorization: false
    }
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        onLogin: (state, action: PayloadAction<{ username: string; password: string }>) => {
            state.auth.username = action.payload.username;
            state.auth.password = action.payload.password;
            state.auth.authorization = true;
        },
        onLogout: (state) => {
            state.auth.username = '';
            state.auth.password = '';
            state.auth.authorization = false;
        },
    },
})

export const { onLogin, onLogout } = authSlice.actions