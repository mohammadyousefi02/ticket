import type { NextApiRequest, NextApiResponse } from 'next'
import { getTicketsBySupportUnit } from '../../controllers/admin'
import connectToDb from '../../utils/connectToDb'



export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    await connectToDb()
    if(req.method === "GET") getTicketsBySupportUnit(req,res)
    else res.status(400).send("bad request")
}
