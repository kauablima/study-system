import z from "zod";

export const sessionSchema = z.object({
    topic: z.string().min(1),
    duration_minutes: z.number(),
    study_date: z.date(), 
    subject_id: z.string(),
})