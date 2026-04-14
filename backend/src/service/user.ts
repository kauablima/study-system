import bcrypt from "bcryptjs";
import { prisma } from "../libs/db.js"

const SALT_ROUNDS = 10;

export const createUser = async (name: string, email: string, password: string ) => {
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