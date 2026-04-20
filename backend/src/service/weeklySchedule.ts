import { prisma } from "../libs/db.js"

type WS = {
    dayOfWeek: string,
    user_id: string,
}

export const createWeeklySchedule = ({dayOfWeek, user_id}: WS) => {
    const existingUser = prisma.user.findFirt({
        where: user_id
    })

    if(!existingUser) return null;

    const weeklySchedule = prisma.weekly_schedule.create({
        data: {
            dayOfWeek,
            user_id,
        }
    })

    if(weeklySchedule) return null;

    return weeklySchedule;
}
