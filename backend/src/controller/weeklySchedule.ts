import type { RequestHandler } from "express"
import { registerSchemaSchedule } from "../schemas/create-schedule.js"
import { createSchedule } from "../service/schedule.js";

export const registerSchedule: RequestHandler = async(req, res) => {
    const user_id = (req as any).userId;
    const result = registerSchemaSchedule.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({ error: 'Invalid field'})
        return;
    }

    const { day_of_week, subject_id } = result.data;
    const schedule = await createSchedule({ day_of_week, subject_id, user_id });

    if(!schedule){
        res.status(401).json({ error: 'Faild to create scheduling'})
        return;
    }

    return res.status(200).json({message: 'weekly schedule recorded', schedule});
}