<template>
    <div class="part">

        <h1>Expenses list</h1>

        <ul>

            <li v-for="e,i in value">
                {{e.who}} paid  {{ e.amount }}
                
                <template v-if="e.concept">
                    for <i>{{e.concept}}</i>    
                </template>


                
                <template v-if="e.to">
                    {{ e.to.join() }}
                </template>
                <template v-else>
                    ALL
                </template>
                <a href="#" @click.prevent="rm_expense(i)" >X</a>
            </li>
          
            <li>
                Add: 
                <select v-model="new_expense.who">
                    <option v-for="p in people" :value="p">{{ p }}</option>
                </select>
                <input type="number" v-model="new_expense.amount" ></input>
                <input type="text" v-model="new_expense.concept" ></input>

                <select v-model="new_expense.to_select">
                    <option value="all">All</option>
                    <option value="list">List</option>
                </select>
                
                <button @click="add_expense">+</button>
                
                <ul v-if="new_expense.to_select=='list'">
                    <li v-for="to,i in new_expense.to_list">
                        {{ to.name }}  
                        <a v-if="to.enabled" href="#" @click="togle_list(i)"> Y </a>
                        <a v-else                        href="#" @click="togle_list(i)"> N </a>
                    </li>
                </ul>
                
                
              </li>
          
        </ul>


    </div>
</template>

<script>



export default {

    props: ['value', 'people'],

    data () {
        return {
            new_expense: {
                who: this.people[0],
                amount: 0,
                concept: '',
                to: [],
                to_select: 'all',
                to_list: [],
            }
        }
    },
    
    mounted(){
        this.reset_new_expense();
    },
    
    watch: {
        "new_expense.who": function(){
            this.reset_new_expense();
        }
    },
    
    methods: {
        
        
        rm_expense(i){            
            this.value.splice(i, 1);
            this.$emit('input', this.value);
        },
        
        
        add_expense(){
            
            
            let expense = {};
            expense.who = this.new_expense.who;
            expense.amount = this.new_expense.amount;
            expense.to = null;
            expense.concept = this.new_expense.concept;

            
            if(this.new_expense.to_select === 'list'){
                expense.to = [];
                this.new_expense.to_list.map(tl => {
                    if(!tl.enabled) return;
                    expense.to.push(tl.name);
                });
            }
            
            
            if(!expense.amount) return;
            
            
            this.value.push(expense);

            this.$emit('input', this.value);
            this.reset_new_expense();
        },


        reset_new_expense(){
            
            this.new_expense.to_select = 'all';
            this.new_expense.amount = 0;
            this.new_expense.concept = '';
            
            const list = [];
            this.people.map(p => {
                if(p === this.new_expense.who) return;
                list.push({name: p, enabled: false});
            });
            this.new_expense.to_list = list;
            
            console.log(this.new_expense);
            
        },

        togle_list(i){
                        
            const enabled = this.new_expense.to_list[i].enabled ? false : true;
            this.new_expense.to_list[i].enabled = enabled;
            
        },
        
    }
    
}

</script>

<style lang="scss" scoped>


</style>
