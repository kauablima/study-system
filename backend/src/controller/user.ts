import type { RequestHandler} from "express";
import { registerSchema } from "../schemas/create-user.js"
import { loginSchema } from "../schemas/login-user.js";
import { createUser, loginUser } from "../service/user.js";

export const register: RequestHandler = async (req, res) => {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({error: 'Invalide Field'});
    }

    const { name, email, password } = result.data;
    const user = await createUser(name, email, password);

    if(!user) {
        return res.status(409).json({error: 'Email already in use'});
    }

    return res.status(201).json({ user });
} 

export const login: RequestHandler = async (req, res) => {
    const result  = loginSchema.safeParse(req.body);

    if (!result.success){
        return res.status(401).json({error: 'Error at login'})
    }

    const { email, password } = result.data;
    const createTokenUser = await loginUser(email, password);
    
    if (!createTokenUser){
        return res.status(409).json({ error: 'the token not was found' })
    }

    return res.status(200).json({ createTokenUser})


}