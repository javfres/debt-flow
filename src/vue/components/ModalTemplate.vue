<template>



    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">

        <header class="modal-card-head">
            <p class="modal-card-title">
                <slot name="title">default title</slot>
            </p>
            <button class="delete" aria-label="close" @click="$emit('close')"></button>
        </header>

        <section class="modal-card-body">
            <slot name="body">default body</slot>
        </section>


        </div>
        <!--
        <button class="modal-close is-large" aria-label="close" @click="$emit('close')"></button>
        -->
    </div>


</template>

<script>



export default {

    props: {
        closable: {
            default: true
        },
    },

    data () {
        return {
        }
    },
    
    methods: {
        
        
    }

}

</script>

<style lang="scss" scoped>


</style>
