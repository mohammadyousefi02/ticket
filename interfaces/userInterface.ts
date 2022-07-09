export interface IuserTicket {
    ticket:string,
    isSeened:boolean,
    subject:string,
    supportUnit:string,
    _id:string,
}

export interface Iuser {
    _id:string,
    username:string,
    email:string,
    role:string,
    tickets:IuserTicket[]
    isAdmin?:boolean,
    isOnline?:boolean
}

