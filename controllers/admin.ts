import  jwt  from 'jsonwebtoken';
import { IdecodedToken } from './../interfaces/decodedTokenInterface';
import { NextApiRequest, NextApiResponse } from 'next';

import Users from '../models/User';
import Tickets from '../models/Ticket';

const getOnlineAdmins = async(req:NextApiRequest, res:NextApiResponse) => {
    try {
        const onlineAdmins = await Users.find({isOnline:true})
        res.status(200).send(onlineAdmins)
    } catch (error) {
        res.status(400).send({error})
    }
}


const changeStatus = async(req:NextApiRequest, res:NextApiResponse) => {
    try {
        const token:string = <string>req.headers["x-auth-token"]
        const decoded = <IdecodedToken>jwt.verify(token, process.env.jwtPrivateKey!)
        const admin = await Users.findById(decoded._id)
        await admin.changeStatus()
        res.status(200).send("changed")
    } catch (error) {
        res.status(400).send({error})
    }
}


const getTicketsBySupportUnit = async(req:NextApiRequest, res:NextApiResponse) => {
    try {
        const token:string = <string>req.headers["x-auth-token"]
        const decoded = <IdecodedToken>jwt.verify(token, process.env.jwtPrivateKey!)
        const admin = await Users.findById(decoded._id)
        const tickets = await Tickets.find({supportUnit:admin.role})
        res.status(200).send({tickets})
    } catch (error) {
        res.status(400).send({error})
    }
}

export {getOnlineAdmins, changeStatus, getTicketsBySupportUnit}