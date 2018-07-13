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
                        <input class="input" type="number" placeholder="Amount" v-model="amount">
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
                                <input type="checkbox" v-model="p.is" :disabled="shared==='all' || p.name === who">        
                                {{ p.name }}
                            </label>
                        </li>
                    </ul>
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
        }
    },
    
    mounted(){
    
        this.update_list();
        
    },
    
    watch: {
        
        who(){
            this.update_list();
        },
        
        shared(){
            this.update_list();
        },
        
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
            
            let expense = {
                who: this.who,
                amount: this.amount,
                concept: this.concept,
                to: null,
            }
            
            if(this.shared !== 'all'){
                expense.to = [];
                this.list.map(x => {
                    if(!x.is) return;
                    expense.to.push(x.name);
                });
            }
            
            this.$emit('new_expense', expense);
            
        }
        
    }

}

</script>

<style lang="scss" scoped>


</style>
