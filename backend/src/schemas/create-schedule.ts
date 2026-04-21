import z from "zod";

export const registerSchemaSchedule = z.object({
    day_of_week: z.number(),
    subject_id: z.string(),
})