import { IdecodedToken } from './../../../interfaces/decodedTokenInterface';
import { server } from "../../../config/server"
import axios from "axios"
import { setUserTickets } from '../../../redux/slices/userTicketsSlice';
import { store } from '../../../redux/store';
import { Iuser } from '../../../interfaces/userInterface';

type Tdispatch = typeof store.dispatch

const getUserData = async(userInfo:IdecodedToken,setUser:Function,dispatch:Tdispatch) => {
    try {
        const res = await axios.get(`${server}/api/users/${userInfo._id}`)
        setUser(res.data)
        dispatch(setUserTickets(res.data.tickets))
    } catch (error) {
        console.log(error)
    }
}


const addNewTicketHandler = async(body:object,token:string,setSupportUnit:Function,setSubject:Function,setMessage:Function,userInfo:IdecodedToken,setUser:Function,dispatch:Tdispatch) => {
    try {
        await axios.post(`${server}/api/tickets/add-new-ticket`,{...body},{
            headers:{
                'x-auth-token':token
            }
        })
        setSupportUnit("")
        setSubject("")
        setMessage("")
        getUserData(userInfo,setUser,dispatch)
    } catch (error) {
        console.log(error)
    }
}


const setUnseenedMessageNumber = (user:Iuser) => {
    let i = 0
    if(user){
        user?.tickets?.forEach((t)=>{
            if(!t.isSeened) i+=1
    })
     return i
}else {
    return i
}
}

const getOnlineAdmins = async(setOnlineAdmins:React.Dispatch<React.SetStateAction<number>>) => {
    const res = await axios.get(`${server}/api/get-online-admins`)
    setOnlineAdmins(res.data.length)
}

export {getUserData, addNewTicketHandler, setUnseenedMessageNumber, getOnlineAdmins}