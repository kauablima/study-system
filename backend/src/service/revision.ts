import { prisma } from "../libs/db.js"

type revision = {
    status: string,
    dueDate: Date,
    user_id: string,
    study_id: string,
}

export const createRevision = async ({status, dueDate, user_id, study_id}: revision) => {
    const existingUser = await prisma.user.findFirst({
        where: { id: user_id }
    })

    if (!existingUser) return null;

    const existingStudy = await prisma.study_session.findFirt({
        where: { id: study_id }
    })

    if(!existingStudy) return null;
    
    const revision = await prisma.revision.create({
        data: {
            status,
            dueDate,
            user: { connect: {id: user_id}},
            study: { connect: {id: study_id}},
        }
    })

    if(!revision) return null;

    return revision;
}