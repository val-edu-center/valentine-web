import Schedule from "../model/Schedule"

export function mapScheduleParse(parseSchedule) {
    const schedule = new Schedule
    schedule.id = parseSchedule.id
    schedule.scheduleDate = parseSchedule.get("scheduleDate")
    schedule.file = parseSchedule.get("file")
    schedule.parseObject = parseSchedule
    return schedule
}