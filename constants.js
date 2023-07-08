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
    Inventory: "Inventory",
    CostOfGoodsSold: "Cost of Goods Sold",
    AccountsReceivable: "Accounts Receivable",
    SalesRevenue: "Sales Revenue",
    SalesTaxExpense: "Sales Tax Expense",
    SalesTaxPayable: "Sales Tax Payable",
    Product: "Product",
    GoodsAndServicesTax: "Goods and Services Tax"
}

const NumericalConstants = {
    SalesTaxRate: 0.05, // 5% Sales Tax Rate,
    GoodsAndServicesTaxRate: 0.1 // 10% Goods and Servies Tax
}

module.exports = {
    FinancialElemTypes,
    TransactionTypes,
    AccountTitles,
    NumericalConstants
}