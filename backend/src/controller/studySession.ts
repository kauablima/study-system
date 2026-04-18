import type { RequestHandler } from "express";
import { createStudySession } from "../service/studySession.js";
import { sessionSchema } from "../schemas/create-session.js";

export const registeStudySession: RequestHandler = async (req, res) => {
    const result = sessionSchema.safeParse(req.body);

    if(!result.success){
        res.status(401).json({ error: 'Fill in the field.' })
        return;
    }
    
    //modify this after
    const data = { 
        topic: result.data.topic, 
        duration_minutes: result.data.duration_minutes, 
        study_date: result.data.study_date , 
        user_id: result.data.user_id, 
        subject_id: result.data.subject_id,
    };

    const session = await createStudySession(data);

    if(!session){
        res.status(401).json({error: 'Faild to create session'}) 
        return;   
    }


    return res.status(201).json({message: 'create study session: ', session });
}