<template>

    <transition name="modal">
        <div class="modal-mask" @click="clickOutside">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-body">
                        <slot name="body">
                            default body
                        </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            default footer
                            <button class="modal-default-button" @click="$emit('close')">
                                OK
                            </button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>

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
        
        clickOutside(e){
            const $target = $(e.target);
            if(!$target.hasClass('modal-wrapper')) return;
            console.log("CLOSEEE");
        }
        
    }

}

</script>

<style lang="scss" scoped>


</style>
