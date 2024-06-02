import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface IShowBookModel {
    name: string
    surname: string
    pk: number | null
    avatar: string
    show: boolean
    gender: 'MALE' | 'FEMALE'
}

const initialState: IShowBookModel = {
    name: 'model',
    surname: 'undefined',
    gender: 'FEMALE',
    pk: null,
    avatar:'',
    show: false
}

const bookModelSlice = createSlice({
    name: '@@bookModel',
    initialState,
    reducers: {
        showBookModel : (_, action: PayloadAction<IShowBookModel>) => {
            return action.payload
        },
        hideBookModel : (state) => {
            state.show = false
        }
    }})

export const { showBookModel, hideBookModel } = bookModelSlice.actions
export const bookModelReducer = bookModelSlice.reducer