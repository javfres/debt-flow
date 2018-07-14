<template>

    <div>
        
        <h1 class="title">Info</h1>
        <p class="subtitle">Information about how much has expend
            or own each person</p>
            
            
        <div>
            <div class="columns is-multiline is-tablet">
                
                <div class="column is-one-quarter" v-for="person in info">
                    
                    
                    <div class="card">
                        <div class="card-content">
                            <div class="content">

                                <p class="title">
                                    {{person.name}}
                                </p>

                            </div> 
                            

                        </div> <!-- card content -->
                        
                        <footer class="card-footer">
                            <div class="card-footer-item  is-flex">
                                <div class="has-text-grey small-title">Expenses</div>
                                <div class="is-size-4">{{ person.total_expenses.toFixed(2) }}</div>
                            </div>
                            <div class="card-footer-item  is-flex">
                                <div class="has-text-grey small-title">Debts</div>
                                <div class="is-size-4">{{ person.total_debts.toFixed(2) }}</div>
                            </div>

                        </footer> <!-- card footer -->

                        <div class="card-footer">
                            <div class="card-footer-item">

                                <div class="has-text-grey small-title">
                                    <template v-if="person.bote<0">
                                        Should receive
                                    </template>
                                    <template v-else>
                                        Should pay
                                    </template>
                                </div>
                                
                                <span :class="{'has-text-danger':person.bote>0,'has-text-success':person.bote<0}">
                                    <span class="is-size-4">{{ Math.abs((person.bote)).toFixed(2) }} </span>
                                </span>
                                

                            </div> 
                            
                        </div> <!-- card content -->
                        
                    </div> <!-- card -->

                
                    <div class="after-card">

                        <template v-if="person.debts.length">
                            
                            <h5 class="title is-5">Debts</h5>

                            <ul>
                                <li v-for="d in person.debts">
                                    to {{d.to}} {{d.amount.toFixed(2)}}
                                    
                                    
                                    <template v-if="d.concept">
                                        for 
                                        <span class="tag">{{d.concept}}</span>
                                    
                                    </template>
                                    
                                </li>
                            </ul>
                        </template>
                    
                
                    </div>
                
                </div> <!-- column -->
                
                <div class="column"></div>
                
            </div> <!-- columns -->
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

    .card-footer-item {
        justify-content: left;
        flex-direction: column;
    }
    
    .small-title {
        width: 100%;
        font-size: 0.8rem;
    }
    
    .after-card {
        margin-top: 15px;
        padding: 5px;
        font-size: 0.9rem;
        
        .title {
             margin-bottom: 1rem;
        }
    }

</style>
