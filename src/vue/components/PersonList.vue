<template>
    
    <div>
    
        <h1 class="title">Person list</h1>
        <p class="subtitle">List of people</p>
    
        <table class="table is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <!--
                    <th>Avatar</th>
                    -->
                    <th>Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="p,i in value">
                    <!--
                    <td>
                        <p class="image is-32x32">
                          <img src="https://bulma.io/images/placeholders/128x128.png">
                        </p>
                    </td>
                    -->
                    <td>{{ p }}</td>
                    <td class="has-text-right"><a class="delete" @click.prevent="rm_person(i)"></a></td>
                </tr>
            </tbody>
        </table>
    

        <div class="level is-mobile">
            <div class="level-left"></div>
            <div class="level-right">
                <p class="level-item"> Add a new person </p>        
                <button class="level-item button is-primary" @click="open_modal()">Add</button>
            </div>
        </div>


        <ModalNewPerson v-if="showModal" @close="showModal=false" @new_person="add_person"></ModalNewPerson>


        <!--
        
        <div class="field is-grouped">
            <div class="control">
                <p class="image is-48x48">
                  <img src="https://bulma.io/images/placeholders/128x128.png">
                </p>
            </div>
            <div class="control">
                <input class="input" type="text" placeholder="Names">
            </div>
            <div class="control">
                <a class="button is-primary">Add</a>
            </div>
        </div>
    
        -->

  
</div>

  
  
</template>

<script>



export default {

    props: ['value'],

    data () {
        return {
            new_person: '',
            showModal: false,
        }
    },
    
    methods: {
        
        rm_person(i){            
            this.value.splice(i, 1);
            this.$emit('input', this.value);
        },
        
        open_modal(){
            this.showModal = true;
        },
        
        add_person(person){
            this.showModal = false;
            this.value.push(person.name);
            this.$emit('input', this.value);
        }
        
        
    }
    
}

</script>

<style lang="scss" scoped>


</style>
