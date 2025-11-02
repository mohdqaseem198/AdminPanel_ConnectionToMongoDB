
import { createSlice } from "@reduxjs/toolkit";

const WishListSlicer = createSlice({
    name : 'wishSlicer',

    initialState : {
        BlogsId : []
    },

    reducers : {
        Add : ((state , action) => {
            return console.log('from slicer  ,add clicked !');
        })
    }
});

export default WishListSlicer.reducer;
export const {Add} = WishListSlicer.actions;