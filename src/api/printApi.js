import Parse from 'parse/dist/parse.min.js'
import * as printMapper from '../utility/PrintMapper'

export const getAllPrints = async () => {
    const query = new Parse.Query('Print')
    const results = await query.find()
    return results.map(print => printMapper.mapPrintParse(print))
}
export const savePrint = async (print) => {
    await print.parseObject.save()
    return printMapper.mapPrintParse(print.parseObject)
}

export const deletePrint = async (print) => {
    await print.parseObject.destroy()
}