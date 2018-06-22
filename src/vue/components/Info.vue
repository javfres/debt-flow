<template>
  <div>
      
      <h1>Info</h1>
     
     <div v-for="person in info">
         <h3>{{person.name}}</h3>
         
         E: {{ person.total_expenses }}
         D: {{ person.total_debts }}
         ( bote: {{ person.bote }} ) 
         
         <template v-if="person.expenses.length">
             <h5>Expenses</h5>
             <ul>
                 <li v-for="e in person.expenses">
                     to {{e.to ? e.to : 'ALL'}} {{e.amount}}
                 </li>
             </ul>
         
         </template>
         
         <template v-if="person.debts.length">
             <h5>Debts</h5>
             <ul>
                 <li v-for="d in person.debts">
                     to {{d.to}} {{d.amount}}
                 </li>
             </ul>
         </template>
         
         
     </div>
     

  </div>
</template>

<script>



export default {

    props: ['debtflow'],

    data () {
        return {
            info: [],
        }
    },
    
    watch: {
        debtflow(){
            this.info = this.debtflow ? this.debtflow.info() : [];
        }
    },
    
    
}

</script>

<style lang="scss" scoped>


</style>
