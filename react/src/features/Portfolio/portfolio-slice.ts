import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPhoto } from "../../helpers/Api.interface";


export interface IShowState {
    photographs: IPhoto[] | []
    name: string
    surname: string
    pk: number
    fromPhoto: number
    show: boolean
    thumbnails: boolean
    gender: 'MALE' | 'FEMALE'
}

const initialState: IShowState = {
    photographs: [],
    name: 'model',
    surname: 'undefined',
    pk: 0,
    fromPhoto: 0,
    show: false,
    thumbnails: false,
    gender: 'FEMALE'
}

const portfolioSlice = createSlice({
    name: '@@portfolio',
    initialState,
    reducers: {

       showPortfolio: (_, action: PayloadAction<IShowState>) => {
        return action.payload
    },
        hidePortfolio: (state) => {
                state.show = false
        },
        changePhoto: (state, action) => {
            state.fromPhoto = action.payload
        },
        showThumbnails: (state) => {
            state.thumbnails = !state.thumbnails
        },
        nextPhoto: (state) => {
            state.fromPhoto = (state.fromPhoto + 1) % state.photographs.length;
        },
        prevPhoto: (state) => {
            state.fromPhoto = (state.fromPhoto - 1 + state.photographs.length) % state.photographs.length;
        }  
    }
})

export const {showPortfolio, hidePortfolio, nextPhoto, prevPhoto, changePhoto, showThumbnails} = portfolioSlice.actions
export const portfolioReducer = portfolioSlice.reducer