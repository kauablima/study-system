import type { Request, Response, NextFunction } from "express"
import { getUserIdByToken } from "../service/user.js";

const TOKEN = process.env.TOKEN!;

export const authMiddleware = async (req: Request,res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
  
    if (!authHeader){
        res.status(401).json({message: 'Missing authorization hearder'});
    }

    const token = authHeader?.split('')[1];
    if(!token) {
        res.status(401).json({message: 'Invalid token format'});
    }

    const user = await getUserIdByToken(TOKEN);
    if(!user) {
        res.status(401).json({message: 'Invalid token format'});
    }

    next();

}