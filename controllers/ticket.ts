import  jwt  from 'jsonwebtoken';
import { IdecodedToken } from './../interfaces/decodedTokenInterface';
import { NextApiRequest, NextApiResponse } from "next"
import Tickets from "../models/Ticket"
import Users from '../models/User';


const addNewTicket = async(req:NextApiRequest, res:NextApiResponse) => {
    try {
        const token:string = <string>req.headers["x-auth-token"]
        const decoded = <IdecodedToken>jwt.verify(token, process.env.jwtPrivateKey!)
        const user = await Users.findById(decoded._id)
        const {subject,supportUnit,message} = req.body
        const newT = {
            subject,
            supportUnit,
            user:decoded._id,
            isSolved:false,
            messages:[{message,user:decoded._id,date:new Date()}]
        }
        const newTicket = new Tickets(newT)
        await newTicket.save()
        await user.addNewTicket(newTicket._id,subject,supportUnit)
        res.status(201).send(newTicket)
    } catch (error) {
        res.status(400).send({error})
    }
}

const getAllTickets = async(req:NextApiRequest, res:NextApiResponse) => {
    try {
        const tickets = await Tickets.find().populate('messages.user').populate('user')
        res.status(200).send(tickets)
    } catch (error) {
        res.status(400).send({error})
    }
}


const getTicket = async(req:NextApiRequest, res:NextApiResponse) => {
    try {
        const {id} = req.query
        const token:string = <string>req.headers["x-auth-token"]
        const decoded = <IdecodedToken>jwt.verify(token, process.env.jwtPrivateKey!)
        const ticket = await Tickets.findById(id).populate('messages.user').populate('user')
        res.status(200).send({ticket})
        if(!decoded.isAdmin){
            const user = await Users.findById(decoded._id)
            await user.makeMessageSeened(id)
        }
    } catch (error) {
        res.status(400).send({error})
    }
}

const addNewMessage = async(req:NextApiRequest,res:NextApiResponse) => {
        try {
            const token:string = <string>req.headers["x-auth-token"]
            const decoded = <IdecodedToken>jwt.verify(token, process.env.jwtPrivateKey!)
            const {id} = req.query
            const {message} = req.body
            const ticket = await Tickets.findById(id)
            await ticket.addMessage(decoded._id,message)
            if(decoded.isAdmin){
                const user = await Users.findById(ticket.user)
                await user.makeMessageUnseened(id)
            }
            res.status(201).send(message)
        } catch (error) {
            res.status(400).send({error})
        }
}

export { addNewTicket, getTicket, getAllTickets, addNewMessage }