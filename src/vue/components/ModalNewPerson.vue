<template>

    <ModalTemplate @close="showModal=$emit('close')">
        
        <template slot="title"> Add new person </template>

        <template slot="body">
            
            <form @submit.prevent="onSubmit">
    
                <div class="field">
                    <div class="control">
                        <input class="input" type="text" placeholder="Name" v-model="name">
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

    props: {
    
    },

    data () {
        return {
            name: '',
        }
    },
    
    methods: {
        
        onSubmit(){
            console.log("onSubmit: " + this.name);
            
            if(!this.name) return;
            
            this.$emit('new_person', {
                name:this.name
            });
            
        }
        
    }

}

</script>

<style lang="scss" scoped>


</style>
