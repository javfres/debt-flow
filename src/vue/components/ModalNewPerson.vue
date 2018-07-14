<template>

    <ModalTemplate @close="showModal=$emit('close')">
        
        <template slot="title"> Add new person </template>

        <template slot="body">
            
            <form @submit.prevent="onSubmit">
    
                <div class="field">
                    <label class="label">Name</label>
                    <div class="control">
                        <input :class="{'is-danger': error,input:true}" type="text" placeholder="Name" v-model="name">
                        <p class="help is-danger">{{error}}</p>
                    </div>
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

    props:['people'],

    data () {
        return {
            name: '',
            error: "",
        }
    },
    
    watch: {
        name(){
            this.error = null;
        }
    },
    
    methods: {
        
        onSubmit(){
            
            let name = this.name.trim();
            
            if(!name){
                this.error = "Name is required";
                return;
            };
            
            for(let i=0; i<this.people.length; i++){
                if(this.people[i].toLowerCase() === name.toLowerCase()){
                    this.error = "Name '" + name + "' is already used";
                    return;
                }
            }
            
            
            this.$emit('new_person', {
                name:this.name
            });
            
        }
        
    }

}

</script>

<style lang="scss" scoped>


</style>
