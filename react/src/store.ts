import { configureStore } from "@reduxjs/toolkit";

import { portfolioReducer } from "./features/Portfolio/portfolio-slice";
import { bookModelReducer } from "./features/BookModel/book-slice";
import { searchReducer } from "./features/Search/search-slice";

export const store = configureStore({
    reducer: {
        portfolio: portfolioReducer,
        bookModel: bookModelReducer,
        search: searchReducer
    },
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;