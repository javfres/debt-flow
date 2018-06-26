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
                
                    <h1 class="title">Person list</h1>
                    <p class="subtitle">List of people</p>
                
                    <table class="table is-hoverable is-fullwidth">
                        <thead>
                            <tr>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <p class="image is-32x32">
                                      <img src="https://bulma.io/images/placeholders/128x128.png">
                                    </p>
                                </td>
                                <td>John dasfd</td>
                                <td><a class="delete"></a></td>
                            </tr>
                        </tbody>
                    </table>
                
                
                    <p>Add a new one</p>

                    <div class="field is-grouped">
                        <div class="control">
                            <p class="image is-48x48">
                              <img src="https://bulma.io/images/placeholders/128x128.png">
                            </p>
                        </div>
                        <div class="control">
                            <input class="input" type="text" placeholder="Names">
                        </div>
                        <div class="control">
                            <a class="button is-primary">Add</a>
                        </div>
                    </div>
                </div>
                <div class="column">
                    
                    <h1 class="title">Expense list</h1>
                    <p class="subtitle">List of people</p>
                
                    
                </div>
                
            </div>
    
            

            
            
    
            
            
        
            





            
        </div>
    </section>
      
      
      
      
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
