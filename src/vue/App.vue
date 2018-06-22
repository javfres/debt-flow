<template>
  <div id="app">
      
      hola
      
      <PersonList v-model="people"></PersonList>
      <ExpenseList :people="people" v-model="expenses"></ExpenseList>
      <Info :debtflow="debtflow"></Info>
      <Results :debtflow="debtflow"></Results>


  </div>
</template>

<script>

const DebtFlow = require('../js/debtflow');


export default {

    data () {
        return {
            
            people: ["Alice", "Bob", "Charles"],
            expenses: [{who:"Alice",amount:12},{who:"Charles",amount:10}],
            debtflow: null,
    
        }
    },
  
    watch: {
        
        expenses(){
            this.call_debtflow();
        },
        
    },
    
    methods:{
        
        call_debtflow(){
            const df = new DebtFlow();
            
            this.people.map(p => {
                df.addPeople(p);
            });
            
            this.expenses.map(e => {
                df.addExpense(e.who, e.amount); //, "Food", ["Bob","Carl"]);
            });
            
            this.debtflow = df;
        }
        
    },
  

    mounted(){
        this.call_debtflow();
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
