import Print from "../model/Print"

export function mapPrintParse(parsePrint) {
    const print = new Print
    print.id = parsePrint.id
    print.createdAt = parsePrint.createdAt
    print.color = parsePrint.get("color")
    print.description = parsePrint.get("description")
    print.status = parsePrint.get("status")
    print.clientUsername = parsePrint.get("clientUsername")
    print.approvedAt = parsePrint.get("approvedAt")
    print.approved = !!print.approvedAt
    print.declined = print.status === "DECLINED"
    print.parseObject = parsePrint
    return print
}