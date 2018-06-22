<template>
  <div id="app">
      
      hola
      
      <PersonList v-model="people"></PersonList>
      <ExpenseList :people="people" v-model="expenses"></ExpenseList>
      <Results :debtflow="debtflow"></Results>


  </div>
</template>

<script>

const DebtFlow = require('../js/debtflow');


export default {

    data () {
        return {
            
            people: ["Alice", "Bob", "Charles"],
            expenses: [],
            debtflow: null,
    
        }
    },
  
    watch: {
        
        expenses(){
            

            const df = new DebtFlow();
            this.expenses.map(e => {
                df.addExpense(e.who, e.amount); //, "Food", ["Bob","Carl"]);
            });
            
            this.debtflow = df;
            
        }
        
        
    },
  

    mounted(){


    },


    beforeDestroy() {
    },
    
}


</script>

<style lang="scss" scoped>

#app {
    display: flex;
    flex-direction: column;
    height: 100%;
}

</style>
