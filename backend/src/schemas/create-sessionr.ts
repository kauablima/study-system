import z from "zod";

export const learningSession = z.object({
    topic: z.string().min(1),
    duration_minutes: z.number(),
    study_date: z.date(), 
    user_id: z.string(),
    subject_id: z.string(),
})