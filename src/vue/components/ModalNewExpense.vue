<template>

    <ModalTemplate @close="showModal=$emit('close')">
        
        <template slot="title"> Add new expense </template>

        <template slot="body">
            
            <form @submit.prevent="onSubmit">
                
                <div class="field">
                    <div class="control is-expanded">
                        <label class="label">Who</label>
                        <div class="select is-fullwidth">
                            <select v-model="who">
                                <option v-for="(p,i) in people" :value="p">{{ p }}</option>
                            </select>
                        </div>
                    </div>
                </div>
    
                <div class="field">
                    <label class="label">Amount</label>
                    <div class="control">
                        <input :class="{'is-danger': error_amount, input:true}" type="number" step="0.01" placeholder="Amount" v-model="amount">
                        <p class="help is-danger">{{error_amount}}</p>
                    </div>
                </div>

    
                <div class="field">
                    <label class="label">Concept</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Concept" v-model="concept">
                    </div>
                </div>


                <div class="field">
                    <div class="control is-expanded">
                        <label class="label">Shared</label>
                        <div class="select is-fullwidth">
                            <select v-model="shared">
                                <option value="all">Shared among all</option>
                                <option value="group">Shared with a subgroup</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                
                <div class="field">
                    <ul>
                        <li v-for="p in list">
                            <label class="checkbox" :disabled="shared==='all'">
                                <input type="checkbox" v-model="p.is" :disabled="shared==='all'">        
                                {{ p.name }}
                            </label>
                        </li>
                    </ul>
                    <p class="help is-danger">{{error_list}}</p>
                </div>

                

        


                <div class="field">
                    <div class="control">
                        <button type="submit" class="button is-primary">Add</button>
                    </div>
                </div>

            </form>
            
            
        </template>
    </ModalTemplate>

</template>

<script>



export default {

    props: ['people'],

    data () {
                
        return {
            who: this.people[0],
            amount: 0,
            concept: '',
            shared: 'all',
            list: [],
            error_amount: null,
            error_list: null,
        }
    },
    
    mounted(){
    
        this.update_list();
        
        console.log(this.list);
        
    },
    
    watch: {
        
        who(){
            this.update_list();
        },
        
        amount(){
            this.error_amount = null;
        },
        
        shared(){
            this.update_list();
        },
        
        "list" : {handler: function(){
            this.error_list = null;
        }, deep:true},
        
        
    },
    
    methods: {

        update_list(){
            
            let list = [];
            this.people.map(p => {
                list.push({
                    name: p,
                    is: (this.shared==='all' || this.who === p),
                });
            });
            
            this.list = list;
            
        },

        
        onSubmit(){
            
            if(!this.amount || this.amount<=0){
                this.error_amount = 'Invalid amount';
                return;
            }
            
            let expense = {
                who: this.who,
                amount: +this.amount,
                concept: this.concept,
                to: null,
            }
            
            if(this.shared !== 'all'){
                expense.to = [];
                this.list.map(x => {
                    if(!x.is) return;
                    expense.to.push(x.name);
                });
                
                if(!expense.to.length){
                    this.error_list = "List is empty";
                    return;
                }
                
            }
            
            this.$emit('new_expense', expense);
            
        }
        
    }

}

</script>

<style lang="scss" scoped>


</style>
