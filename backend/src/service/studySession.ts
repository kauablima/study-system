import { prisma } from "../libs/db.js"

type studySessionDTO = {
    topic: string,
    durantion_minutes: number,
    study_date: Date,
    user_id: string,
    subject_id: string,
}

export const createStudySession = (data: studySessionDTO) => {
    const existignSubejct = prisma.subject.findFirt({
        where: {
            id: data.subject_id,
            user_id: data.user_id,
         }
    }) 

    if(!existignSubejct) return null;

    const studySession = prisma.study_session.create({
        topic: data.topic,
        durantion_minutes: data.durantion_minutes,
        study_date: data.study_date,
        user: { connect: {id: data.user_id} },
        subject: { connect: {id: data.subject_id}}

    })

    return studySession
}

