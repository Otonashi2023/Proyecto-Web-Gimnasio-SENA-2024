<template>
    <div class="view">
        <div class="components">
            <div id="up">
                <h1 id="alitext">Perfil</h1>
            </div>
            <div><FormPerfil/></div>
        </div>
    </div>
</template>

<script>
import FormPerfil from '@/components/formularios/FormPerfil.vue';

export default{
    name:'PersonalView',
    components:{
        FormPerfil,
    },
    computed:{
        user() {
                return this.$store.state.user;
            },
    },
}
</script>