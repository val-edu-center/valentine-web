import * as bankAccountMapper from "../utility/BankAccountMapper";
import Parse from "parse/dist/parse.min.js";

export const getAllAccountsParse = async () => {
  const query = new Parse.Query("Accounts");
  query.limit(200);
  const results = await query.find();
  return results.map((bankAccount) =>
    bankAccountMapper.mapBankAccountParse(bankAccount)
  );
};

export const createBankAccountParse = async (username) => {
  const bankAccount = new Parse.Object("Accounts");

  bankAccount.set("username", username);
  bankAccount.set("balance", 0);

  await bankAccount.save();
  return bankAccountMapper.mapBankAccountParse(bankAccount);
};
