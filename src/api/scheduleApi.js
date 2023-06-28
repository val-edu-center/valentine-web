import Parse from 'parse/dist/parse.min.js'
import * as scheduleMapper from '../utility/ScheduleMapper'

export const getAllSchedules = async () => {
    const query = new Parse.Query('Schedule')
    const results = await query.find()
    return results.map(schedule => scheduleMapper.mapScheduleParse(schedule))
}
export const saveSchedule = async (schedule) => {
    const parseFile = new Parse.File(schedule.file.name, schedule.file);
    await parseFile.save()
    schedule.parseObject.set("file", parseFile)
    await schedule.parseObject.save()
    return scheduleMapper.mapScheduleParse(schedule.parseObject)
}

export const deleteSchedule = async (schedule) => {
    await schedule.parseObject.destroy()
}