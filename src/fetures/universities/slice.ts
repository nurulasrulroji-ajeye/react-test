import { createSlice } from '@reduxjs/toolkit'
import { fetchAllUniv } from './action'

export interface IUniv {
    "web_pages": string[],
    "name": string,
    "alpha_two_code": string,
    "country": string,
    "state-province": null | string,
    "domains": string[]
}

interface IUniversities {
    loading: boolean,
    data: IUniv[]
}
const initialState: IUniversities = {
    loading: false,
    data: []
}

export const universitiesSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchAllUniv.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data
        })
        builder.addCase(fetchAllUniv.pending, (state) => {
            state.loading = true;
        })
    },
})