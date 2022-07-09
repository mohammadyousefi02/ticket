import mongoose from "mongoose";

import jwt from "jsonwebtoken"
import _ from "lodash";



const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    role:String,
    isAdmin:Boolean,
    tickets:[new mongoose.Schema({
        ticket:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Tickets'
        },
        isSeened:Boolean,
        subject:String,
        supportUnit:String,
    })],
    isOnline:Boolean
})

userSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign(_.pick(this,['_id','isAdmin','isOnline']), process.env.jwtPrivateKey!);
    return token;
}

userSchema.methods.addNewTicket = function(id:mongoose.Schema.Types.ObjectId,subject:string, supportUnit:string){
    this.tickets = [...this.tickets, {ticket:id, isSeened:true,subject,supportUnit}]
    return this.save()
}

userSchema.methods.makeMessageUnseened = function(id:mongoose.Schema.Types.ObjectId){
    const ticketIndex = this.tickets.findIndex((t:any)=>t.ticket.toString() === id.toString())
    this.tickets[ticketIndex].isSeened = false
    return this.save()
}

userSchema.methods.makeMessageSeened = function(id:mongoose.Schema.Types.ObjectId){
    const ticketIndex = this.tickets.findIndex((t:any)=>t.ticket.toString() === id.toString())
    this.tickets[ticketIndex].isSeened = true
    return this.save()
}

userSchema.methods.changeStatus = function(){
    this.isOnline ? this.isOnline = false : this.isOnline = true
    return this.save()
}

const Users = mongoose.models.Users || mongoose.model("Users",userSchema)

export default Users;


