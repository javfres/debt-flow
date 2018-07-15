<template>
    <div>

        <h1 class="title">Expenses list</h1>
        <p class="subtitle">List of the expenses done by each person</p>

        <div class="level is-mobile">
            <div class="level-left"></div>
            <div class="level-right">
                <p class="level-item"> Add new expense </p>        
                <button class="level-item button is-primary" @click="open_modal()">Add</button>
            </div>
        </div>

        <table class="table is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>Who</th>
                    <th>Amount</th>
                    <th>Concept</th>
                    <th>To</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="e,i in value">
                    <td>{{e.who}}</td>
                    <td>{{ e.amount }}</td>
                    <td><i>{{e.concept}}</i></td>
                    <td>
                        <template v-if="e.to">
                            {{ e.to.join() }}
                        </template>
                        <template v-else>
                            ALL
                        </template>
                    </td>
                    <td class="has-text-right"><a class="delete"  @click.prevent="rm_expense(i)"></a></td>
                </tr>
            </tbody>
        </table>

    
                

                
                
        <ModalNewExpense v-if="showModal"
            :people="people"
            @close="showModal=false" @new_expense="add_expense">
        </ModalNewExpense>

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
            },
            showModal: false,
        }
    },
    
    mounted(){
        
    },

    methods: {
        
        
        rm_expense(i){            
            this.value.splice(i, 1);
            this.$emit('input', this.value);
        },
        
        
        add_expense(expense){
            
            this.showModal = false;
            
            this.value.push(expense);
            this.$emit('input', this.value);
        
        },


        open_modal(){
            if(!this.people.length) return;
            this.showModal=true;    
        },
    
    } // methods
    
}

</script>

<style lang="scss" scoped>


</style>
