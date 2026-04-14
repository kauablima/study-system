import z from "zod";

const registerSchema = z.object ({
    name: z.string().min(1),
    email: z.string(),
    password: z.string(),
})