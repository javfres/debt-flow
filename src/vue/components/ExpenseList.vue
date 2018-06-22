<template>
    <div>

        <h1>Expenses list</h1>

        <ul>

            <li v-for="e,i in value">
                {{e.who}} paid  {{ e.amount }}
                <a href="#" @click.prevent="rm_expense(i)" >X</a>
            </li>
          
            <li>
                Add: 
                <select v-model="new_expense.who">
                <option v-for="p in people" :value="p">{{ p }}</option>
                </select>
                <input type="number" v-model="new_expense.amount" ></input>
                <button @click="add_expense">+</button>
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
                to: [],
            }
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
            expense.to = null; // TODO
            
            if(!expense.amount) return;
            
            
            this.value.push(expense);

            this.$emit('input', this.value);
        },

        
    }
    
}

</script>

<style lang="scss" scoped>


</style>
