
var expenses = [25.50, 17.25, 80, 33.99, 51.75]; 
var totalExpenses = 0;
var highestExpense = expenses[0];
var lowestExpense = expenses[0];
 
// Calculate total expenses
for (let i = 0; i < expenses.length; i++) {
    totalExpenses += expenses[i];
}
 
// Find highest and lowest expenses
for (let i = 0; i < expenses.length; i++) {
    if (expenses[i] > highestExpense) {
        highestExpense = expenses[i];
    }
    if (expenses[i] < lowestExpense) {
        lowestExpense = expenses[i];
    }
}
 
console.log("Total Expenses:", totalExpenses);
console.log("Highest Expense:", highestExpense);
console.log("Lowest Expense:", lowestExpense);