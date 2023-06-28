import BankAccount from "../model/BankAccount"

export function mapBankAccountParse(parseBankAccount) {
    const bankAccount = new BankAccount
    bankAccount.id = parseBankAccount.id
    bankAccount.username = parseBankAccount.get("username")
    bankAccount.balance = parseBankAccount.get("balance")
    bankAccount.parseObject = parseBankAccount
    return bankAccount
}