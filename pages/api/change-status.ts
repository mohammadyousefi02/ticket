import type { NextApiRequest, NextApiResponse } from 'next'
import { changeStatus } from '../../controllers/admin'
import connectToDb from '../../utils/connectToDb'



export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    await connectToDb()
    if(req.method === "POST") changeStatus(req,res)
    else res.status(400).send("bad request")
}
