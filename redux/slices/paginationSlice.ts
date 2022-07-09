import {createSlice} from '@reduxjs/toolkit';

const paginationSlice = createSlice({
    name:"pagination",
    initialState:{
        row:2,
        page:1,
        totalPage:1,
    },
    reducers:{
        nextPage:(state)=>{
            if(state.page + 1 > state.totalPage) return state
            state.page = state.page + 1
        },
        dblNextPage:(state)=>{
            if(state.page + 2 > state.totalPage) return state
            state.page = state.page + 2
        },
        prevPage:(state)=>{
            if(state.page - 1 === 0)return state
            state.page = state.page - 1
        },
        dblPrevPage:(state)=>{
            if(state.page - 2 === 0)return state
            state.page = state.page - 2
        },
        setTotalPage:(state,action)=>{
            state.totalPage = action.payload
        }
    }
})

export const {nextPage,prevPage,setTotalPage, dblNextPage, dblPrevPage } = paginationSlice.actions;

export default paginationSlice.reducer;