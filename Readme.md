
# Debt flow

Tool to calculate shared expenses
[Debt flow](https://javfres.github.io/debt-flow/).

I've started this project because I wanted to do something
similar to *Splitwise* or *Settle up*.

It uses a simple algorithm that first builds a graph
of debts and then it does several iterations to try to
simplify it traversing paths longer each time.

The algorithm can be limited to people that *known* each other,
meaning people that have debts between them
or all with all.