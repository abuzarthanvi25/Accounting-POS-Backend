const FinancialElemTypes = {
    Asset: 1,
    Expense: 2,
    Liability: 3,
    Revenue: 4,
    Capital: 5,
    Drawing: 6
}

const TransactionTypes = {
    Debit: 1,
    Credit: 2
}

const AccountTitles = {
    Cash: "Cash",
    Inventory: "Inventory"
}

module.exports = {
    FinancialElemTypes,
    TransactionTypes,
    AccountTitles
}