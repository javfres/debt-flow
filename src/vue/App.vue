<template>
  <div id="app">
      
    <section class="hero is-primary is-bold">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">Debt Flow</h1>
                <h2 class="subtitle">Calculate how much money should each person pay</h2>
            </div>
        </div>
    </section>
      
    <section class="section">
        <div class="container">
            
            
            <div class="columns is-desktop is-centered">
                <div class="column">
                    
                    <PersonList v-model="people"></PersonList>

                </div>
                <div class="column">
                    
                    <ExpenseList :people="people" v-model="expenses"></ExpenseList>
                    
                </div>
                
            </div>

            
        </div>
    </section>
      
      
      
    <section class="section">
        <div class="container">
            
            <Info :debtflow="debtflow"></Info>

        </div>
    </section>
    
    
    <section class="section">
        <div class="container">
            
            <Results :debtflow="debtflow"></Results>

        </div>
    </section>
    
    
    
    
    
    
    

  </div>
</template>

<script>

const DebtFlow = require('../js/debtflow');


export default {

    data () {
        return {
            
            people: ["Alice", "Bob", "Charles", "Dana"],
            expenses: [
                {who:"Alice",amount:2,concept:"Desert", to:['Alice','Bob']},
                {who:"Alice",amount:12,concept:"Food"},
                {who:"Charles",amount:10},
                {who:"Charles",amount:13, concept:"Tortilla"},
                {who:"Dana",amount:5, to:["Dana",'Bob'],concept:"Beer"}],
            debtflow: null,
    
        }
    },
  
    watch: {
        
        
        people(){
            
            
            this.expenses = _.filter(this.expenses, exp => {
                
                if(!_.includes(this.people, exp.who)) return false;
                
                if(exp.to){
                    for(let i=0; i<exp.to.length; i++){
                        if(!_.includes(this.people, exp.to[i])) return false;
                    }
                }
                
                return true;
            });
            
            
        },
        
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
