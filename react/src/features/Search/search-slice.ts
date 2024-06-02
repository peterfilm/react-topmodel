import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HairTypes } from "../../helpers/Api.interface";
import { PREFIX } from "../../helpers/API";
import { GenderTypes } from "../../helpers/Api.interface";
import { IModelCard } from "../../components/ModelCard/ModelCard.interface";
import { RootState } from "../../store";
import { useLocation } from "react-router-dom";

export const searchModels = createAsyncThunk<ISearchResponse, string>(
    '@@search/show-models',
    async (param:string, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            const { gender, height, hair, price_hour, price_day, count } = state.search;

            let res: Response
            if (!param || count === 0) {
                res = await fetch(`${PREFIX}/search/`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({gender, height, hair, price_hour, price_day})
                  });
            } else {
                res = await fetch(`${PREFIX}/search/${param}`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                });
            }
            if (!res.ok) {
                throw new Error('Failed to fetch search results');
            }
            
            const data = await res.json();
            return data

        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
        }
    }
);

export type ISearchResponse = {
    results: IModelCard[],
    count: number
    next: string | null
    previous: string | null
}

export type ISearch = {
    entities: IModelCard[]
    gender: GenderTypes | ''
    height: '150-160' | '160-170' | '170-180' | '180-190' | ''
    hair: HairTypes | ''
    price_hour: '300-399' | '400-499' | '500-599' | '600-699' | '700-799' | '800-899' | '900-999' |  ''
    price_day: '3000-3999' | '4000-4999' | '5000-5999' | '6000-6999' | '7000-7999' | ''
    loading: 'loading' | 'idle' | 'fulfilled' | 'rejected'
    error: string | null
    count: number
    next: string | null
    previous: string | null
}

const initialState: ISearch = {
    entities: [],
    gender: '',
    height: '',
    hair: '',
    price_hour: '',
    price_day: '',
    loading: 'idle',
    error: null,
    count: 0,
    next: null,
    previous: null
}

const searchSlice = createSlice({
    name: '@@search',
    initialState,
    reducers: {

       showModels: () => {
        return initialState
    },
        changeGender: (state, action) => {
            state.gender = action.payload || '';
        },
        changeHeight: (state, action) => {
            state.height = action.payload || '';
        },
        changeHair: (state, action) => {
            state.hair = action.payload || '';
        },
        changePricePerHour: (state, action) => {
            state.price_hour = action.payload || '';
        },
        changePricePerDay: (state, action) => {
            state.price_day = action.payload || '';
        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(searchModels.pending, (state) => {
          state.loading = 'loading'
          state.error = null
        })
        .addCase(searchModels.rejected, (state) => {
          state.loading = 'idle'
          state.error = 'Something went wrong'
        })
        .addCase(searchModels.fulfilled, (state, action) => {
            state.loading = "fulfilled"
            state.entities = action.payload.results
            state.count = action.payload.count
            state.next = action.payload.next
            state.previous = action.payload.previous 
        })
    }
})

export const {showModels, changeGender, changeHair, changeHeight, changePricePerDay, changePricePerHour} = searchSlice.actions
export const searchReducer = searchSlice.reducer

export const useQueryStringParams = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    return params;
}