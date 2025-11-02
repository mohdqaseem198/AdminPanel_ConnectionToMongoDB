
import { configureStore } from '@reduxjs/toolkit';
import wishList from './WishListSlicer';

export const ReduxStore = configureStore({
    reducer : {
        WishList : wishList,
    }
});