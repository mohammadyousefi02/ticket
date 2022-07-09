import { IuserTicket } from './../../interfaces/userInterface';
import {createSlice} from "@reduxjs/toolkit"

interface State {
    tickets:IuserTicket[]
}

const initialState:State = {
    tickets: []
}

const userTickets = createSlice({
    name:"userTickets",
    initialState,
    reducers:{
        setUserTickets:(state,action)=>{
            state.tickets = action.payload
        }
    }
})

export const {setUserTickets} = userTickets.actions

export default userTickets.reducer