
const DebtFlow = require('./debtflow');




const df = new DebtFlow();

df.addExpense("Alice", 10, "Food");
df.addExpense("Bob",   20, "Beer", ["Alice"]);
df.addExpense("Carl",   9, "Desert");

df.addExpense("Dani",   30, "XXX", ["Elsa"]);
df.addExpense("Elsa",   10, "XXX", ["Dani"]);
df.addExpense("Faith",   10, "XXX", ["Elsa"]);
df.addExpense("Gate",   30, "XXX", ["Alice"]);
df.addExpense("ZZZ",   2, "XXX");


df.addDebt("Moroso", 100, "Alice");
df.addDebt("Moroso2", 100, "Moroso");
df.addDebt("Moroso3", 100, "Moroso2");


df.addDebt("B", 100, "C");
df.addDebt("A", 100, "B");


//df.addExpense("Carl",   9, "Desert 2");
df.flow();






