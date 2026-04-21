import { prisma } from "../libs/db.js"

type WS = {
    day_of_week: number,
    user_id: string,
    subject_id: string,
}

export const createSchedule = async ({ day_of_week, subject_id, user_id}: WS) => {
    const existingUser = await prisma.user.findFirst({
        where: { id: user_id }
    })

    if(!existingUser) return null;

    const weeklySchedule = await prisma.weekly_schedule.create({
        data: {
            day_of_week,
            user: { connect: {id: user_id}},
            subject_id,
        }
    })

    if(!weeklySchedule) return null;

    return weeklySchedule;
}
