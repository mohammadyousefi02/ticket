import type { NextApiRequest, NextApiResponse } from 'next'
import { addNewTicket } from '../../../controllers/ticket'
import connectToDb from '../../../utils/connectToDb'



export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    await connectToDb()
    if(req.method === "POST") addNewTicket(req,res)
    else res.status(400).send("bad request")
}
