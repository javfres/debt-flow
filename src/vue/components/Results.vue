<template>
  <div>
      
      
      <h1 class="title">Debt-flow result</h1>
      <p class="subtitle">They debt network</p>
          
      
      
      <div class="columns is-multiline is-tablet">
          
          <div class="column is-one-quarter" v-for="person in flow">
              
             
              <h5 class="title is-3">{{person.name}}</h5>

             
              <table class="table is-hoverable is-fullwidth">
                  <thead>
                      <tr>
                          <th>To</th>
                          <th class="has-text-right">Amount</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="p in person.pays">
                          <td>{{p.name}}</td>
                          <td class="has-text-right">{{p.amount.toFixed(2)}}</td>
                      </tr>
                  </tbody>
              </table>
              
              
              
          </div>
      </div>
      
      
      

  </div>
</template>

<script>



export default {

    props: ['debtflow'],

    data () {
        return {
            flow: [],
            stats: {},
        }
    },
    
    watch: {
        debtflow(){
            
            this.flow = [];
            this.stats = {}
            
            if(this.debtflow){
                let res = this.debtflow.flow();
                this.flow = res.flow;
                this.stats = res.stats;
            }
            
            console.log(this.flow );
        }
    },
    
    
}

</script>

<style lang="scss" scoped>


</style>
