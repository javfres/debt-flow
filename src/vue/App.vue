<template>
  <div id="app">
      
    <section class="hero is-primary is-bold">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">Debt Flow</h1>
                <h2 class="subtitle">Tool to calculate shared expenses</h2>
                
                <div class="buttons">
                    <a class="button is-outlined is-small is-primary is-inverted"
                    @click="reset" title="Reset the data">Reset</a>
                    <a class="button is-outlined is-small is-primary is-inverted"
                    @click="test1" title="Load test data set 1">Test1</a>
                    <a class="button is-outlined is-small is-primary is-inverted"
                    @click="test2" title="Load test data set 2">Test2</a>
                </div>
            
                
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
            

        <div class="buttons has-addons is-centered">
            <span class="button is-large is-primary" @click="calculate">Calculate</span>
            
            
            <div class="field" style="margin-left:10px">
                <input type="checkbox" id="onlyknown" class="switch" v-model="only_known">
                <label for="onlyknown" title="Limits the money exchanges between people that already have debts">Only know people</label>
            </div>
                
            
        </div>
              
        </div>
    </section>



    <div ref="inforesults" v-if="debtflow">
      
        <section class="section">
            
            <div class="container">
                <Results :debtflow="debtflow" :only_known="only_known"></Results>
            </div>
        </section>
        
        <section class="section">

            <div class="container">
                <Info :debtflow="debtflow"></Info>
            </div>

        </section>
    </div>
        
        
        
    
    
    

  </div>
</template>

<script>

const DebtFlow = require('../js/debtflow');


export default {

    data () {
        return {
            
            people: ["Alice", "Bob", "Charles", "Dana"],
            expenses: [
                
                /*
                {who:"Alice",amount:20,concept:"Food", to:['Alice','Bob']},
                {who:"Alice",amount:12,concept:"Desert"},
                {who:"Charles",amount:10},
                {who:"Charles",amount:13, concept:"Tortilla"},
                {who:"Dana",amount:15, to:["Dana",'Bob','Charles'],concept:"Beer"},
                {who:"Bob", amount:5, to:["Dana"] },
                */
                
                {who:"Alice",amount:20, to:['Bob']},
                {who:"Bob",amount:20, to:['Charles']},
                {who:"Charles",amount:20, to:['Dana']},
        
                
            ],
            only_known: true,
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
            this.debtflow = null;
        },
        
        only_known(){
            this.debtflow = null;
        },
        
    },
    
    methods:{
        
        reset(){
            this.people = [];
        },
        
        test1(){
            
            this.people = ["Alice", "Bob", "Charles", "Dana"],
            this.expenses = [
                {who:"Alice",amount:20,concept:"Food", to:['Alice','Bob']},
                {who:"Alice",amount:12,concept:"Desert"},
                {who:"Charles",amount:10},
                {who:"Charles",amount:13, concept:"Tortilla"},
                {who:"Dana",amount:15, to:["Dana",'Bob','Charles'],concept:"Beer"},
                {who:"Bob", amount:5, to:["Dana"] },
            ];
            
        },
        
        test2(){
            
            this.people = ["Alice", "Bob", "Charles", "Dana"],
            this.expenses = [
                {who:"Alice",amount:20, to:['Bob']},
                {who:"Bob",amount:20, to:['Charles']},
                {who:"Charles",amount:20, to:['Dana']},    
            ];
            
        },

        
        calculate(){
            
            //
            // Debtflow
            //
            const df = new DebtFlow();
            
            this.people.map(p => {
                df.addPeople(p);
            });
            
            this.expenses.map(e => {
                df.addExpense(e.who, e.amount, e.concept, e.to);
            });
                        
            this.debtflow = df;
            
            //
            // Show
            //
            
            this.$nextTick(() => {
                
                let $div = $(this.$refs.inforesults);
                
                $div.hide();
                $div.slideDown("slow");
                
                $('html, body').animate({
                    scrollTop: $div.offset().top
                }, 1000);
                
            });
            
            
        } , // calculate
        
    },
  
    
}


</script>

<style lang="scss" scoped>



</style>
