<template>
  <div id="app">
      
      <div id="title">
          <h1>Debt Flow</h1>
          <p>Calculate how much money should each person pay</p>
      </div>
      
      <div class="part">
          Part 1
          
          <div class="card-container">
              <div class="card">
                  A card 
              </div>
              <div class="card">
                  A card 
              </div> 
              <div class="card">
                  A card  2 3 
              </div> 
              <div class="card">
                  A card 
              </div> 
              <div class="card">
                  A card 
              </div> 
          </div>
          
      </div>
      
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
            
            people: ["Alice", "Bob", "Charles", "Dought"],
            expenses: [
                {who:"Alice",amount:2,concept:"Desert", to:['Bob']},
                {who:"Alice",amount:12,concept:"Food"},
                {who:"Charles",amount:10},
                {who:"Charles",amount:13, concept:"Tortilla"},
                {who:"Dought",amount:5, to:['Bob'],concept:"Beer"}],
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
                console.log(e);
                df.addExpense(e.who, e.amount, e.concept, e.to);
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



</style>
