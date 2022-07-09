import { Iuser } from "./userInterface"

interface message{
    message:string,
    user:Iuser,
    date:number,
    _id:string
}

export interface Iticket {
    subject:string,
    supportUnit:string,
    isSolved:boolean,
    user:Iuser,
    _id:string,
    messages:message[]
}
