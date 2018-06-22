<template>
  <div>
      
      <h1>Result flow</h1>
     
     <div v-for="person in flow">
         <h3>{{person.name}}</h3>
         
         <h5>Pays</h5>
         <ul>
             <li v-for="p in person.pays">
                 to {{p.name}} {{p.amount}}
             </li>
         </ul>
         
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
