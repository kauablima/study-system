import { prisma } from "../src/libs/db.js";
import bcrypt from "bcryptjs";

const main = async () =>  {

    const hashPassword  = await bcrypt.hash('12', 10)
    const createUser = await prisma.user.create({
        data: { 
            email: 'teste@email.com', name: 'pessoateste', password: hashPassword
        }
    })

}   

main()
.catch( (error) => {
    console.error(error)
    process.exit(1)
})
.finally(async () => {
    await prisma.$disconnect()
})






