<template>
  <div class="part">
      
      <h1>Person list</h1>
      <ul>
          <li v-for="p,i in value">
              {{p}}
              <a href="#" @click.prevent="rm_person(i)" >X</a>
          </li>
          <li><input type="text" placeholder="New person" v-model="new_person" @keydown.enter.prevent="add_person()" ></input></li>
      </ul>

      <button @click="showModal = true" >+</button>
      <!--
      <ModalTemplate v-if="showModal" @close="showModal = false"></ModalTemplate>
    -->
        
  </div>
</template>

<script>



export default {

    props: ['value'],

    data () {
        return {
            new_person: '',
            showModal: true,
        }
    },
    
    methods: {
        
        rm_person(i){            
            this.value.splice(i, 1);
            this.$emit('input', this.value);
        },
        
        add_person(){
            this.value.push(this.new_person.trim());
            this.$emit('input', this.value);
            this.new_person = '';
        },
        
        
        
    }
    
}

</script>

<style lang="scss" scoped>


</style>
