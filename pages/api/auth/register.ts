import type { NextApiRequest, NextApiResponse } from 'next'
import { signUp } from '../../../controllers/user'
import connectToDb from '../../../utils/connectToDb'



export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    await connectToDb()
    if(req.method === "POST") signUp(req,res)
    else res.status(400).send("bad request")
}
