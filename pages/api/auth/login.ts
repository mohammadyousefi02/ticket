import type { NextApiRequest, NextApiResponse } from 'next'

import { logIn } from '../../../controllers/user'
import connectToDb from '../../../utils/connectToDb'


export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    await connectToDb()
    if(req.method === "POST") logIn(req,res)
    else res.status(400).send("bad request")
}
