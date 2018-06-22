
const DebtFlow = require('./debtflow');




const df = new DebtFlow();

df.addExpense("Alice", 10, "Food", ["Bob","Carl"]);
df.addExpense("Bob",   20, "Beer", ["Alice"]);
df.addExpense("Carl",   9, "Desert", ["Alice","Bob"]);
df.addExpense("Carl",   12, "Desert - B", ["Alice","Bob"]);

df.addExpense("Dani",   30, "Music", ["Elsa"]);
df.addExpense("Elsa",   10, "Music", ["Dani"]);
df.addExpense("Faith",   10, "Music", ["Elsa"]);
df.addExpense("Gate",   30, "Music", ["Alice"]);
df.addExpense("Allo",   10, "Money", ["Alice"], false);

df.addExpense("Misteriso",   10, "Money", ["Allo"], false);


df.addExpense("Javi",   10, "Tortilla");
df.addExpense("Otro",   10, "Tortilla 2", ["Javi"]);


console.log("**************** INFO ****************");
df.info();
console.log("**************** all 2 all ****************");
df.flow(false);
console.log("**************** only known ****************");
df.flow(true);







