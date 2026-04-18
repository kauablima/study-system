import type { Request, Response, NextFunction } from "express"
import { getUserIdByToken } from "../service/user.js";

const JWT_SECRET = process.env.TOKEN!;

export const authMiddleware = async (req: Request,res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
  
    if (!authHeader){
        res.status(401).json({message: 'Missing authorization hearder'});
    }

    const token = authHeader?.split(' ')[1];
    if(!token) {
        res.status(401).json({message: 'Invalid token format'});
        return;
    }

    const user = await getUserIdByToken(JWT_SECRET);
    if(!user) {
        res.status(401).json({message: 'Invalid token format'});
        return;
    }

    (req as any).userId = user.id;
    next();

}