import mongoose from "mongoose";

import _ from "lodash";



const ticketSchema = new mongoose.Schema({
    subject:String,
    supportUnit:String,
    messages:[{
        message:String,
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Users"
        },
        date:Number
    }],
    isSolved:Boolean,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
})


ticketSchema.methods.addMessage = function(user:string,message:string){
    this.messages = [...this.messages,{user, message, date:new Date()}]
    return this.save()
}

ticketSchema.methods.changeStatus = function(){
    this.isSolved = true
    return this.save()
}



const Tickets = mongoose.models.Tickets || mongoose.model("Tickets",ticketSchema)

export default Tickets;


