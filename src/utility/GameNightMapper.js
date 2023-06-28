import GameNight from '../model/GameNight'
import GameNightVote from "../model/GameNightVote"

export function mapGameNightParse(parseGameNight) {
    const gameNight = new GameNight
    gameNight.id = parseGameNight.id
    gameNight.date = parseGameNight.get("date")
    gameNight.options = parseGameNight.get("options")
    gameNight.parseObject = parseGameNight
    return gameNight
}

export function mapGameNightVoteParse(parseGameNightVote) {
    const gameNightVote = new GameNightVote
    gameNightVote.id = parseGameNightVote.id
    gameNightVote.username = parseGameNightVote.get("username")
    gameNightVote.option = parseGameNightVote.get("option")
    gameNightVote.gameNightDate = parseGameNightVote.get("gameNightDate")
    gameNightVote.parseObject = parseGameNightVote
    return gameNightVote
}