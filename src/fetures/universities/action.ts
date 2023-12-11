import { createAsyncThunk } from "@reduxjs/toolkit";
import { UniversitiesServices } from "../../services/universities";

const univServices = new UniversitiesServices()

export const fetchAllUniv = createAsyncThunk(
    "story-brand/admin/post-partner",
    async (_, thunkAPI) => {
        try {
            const response = await univServices.getAllUniv();

            return {
                data: response
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);