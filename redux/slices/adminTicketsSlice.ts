import {createSlice} from "@reduxjs/toolkit"
import { Iticket } from "../../interfaces/ticketInterface"

interface State {
    tickets:Iticket[]
}

const initialState:State = {
    tickets: []
}

const adminTicketsSlice = createSlice({
    name:"adminTickets",
    initialState,
    reducers:{
        setAdminTickets:(state,action)=>{
            state.tickets = action.payload
        }
    }
})

export const {setAdminTickets} = adminTicketsSlice.actions

export default adminTicketsSlice.reducer