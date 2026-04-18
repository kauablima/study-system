import bcrypt from "bcryptjs";
import { prisma } from "../libs/db.js"
import jwt  from "jsonwebtoken";

const SALT_ROUNDS = 10;
const TOKEN = process.env.TOKEN!;


export const createUser = async (name: string, email: string, password: string )  => {
    const existingUser =  await prisma.user.findUnique({
        where: { email }
    })

    if (existingUser) return null;

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
        data: { 
            name, 
            email: email.toLowerCase(), 
            password: hashedPassword,
        }
    });

    if (!user) return null;

    return {
        id: user.id,
        name: user.name,
        email: user.email
    };
} 

export const loginUser = async (email: string, password: string) => {
    const existingUser =  await prisma.user.findUnique({
        where: { email }
    })

    if (!existingUser) return null;

    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) return null;

    const token = jwt.sign(
        {id: existingUser.id},
        TOKEN,
        {expiresIn: '1d'},
    )

    return {
        token,
        user: {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
        }
    };
}


export const getUserIdByToken = async (token: string) => {
    const verifyTokenUser = jwt.verify(token, TOKEN) as {id: string};

    if(!verifyTokenUser) return null;

    return { id: verifyTokenUser.id }
}