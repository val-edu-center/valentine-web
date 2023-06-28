import Parse from 'parse/dist/parse.min.js'
import * as gameNightMapper from '../utility/GameNightMapper'

export const getAllNights = async () => {
    const query = new Parse.Query('GameNight')
    const results = await query.find()
    return results.map(gameNight => gameNightMapper.mapGameNightParse(gameNight))
}

export const getAllVotes = async () => {
    const query = new Parse.Query('GameNightVotes')
    const results = await query.find()
    return results.map(gameNight => gameNightMapper.mapGameNightVoteParse(gameNight)) 
}

export const saveGameNight = async (gameNight) => {
    await gameNight.parseObject.save()
    return gameNightMapper.mapGameNightParse(gameNight.parseObject)
}