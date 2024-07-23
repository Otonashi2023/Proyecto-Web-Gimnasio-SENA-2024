<template>
    <div class="view">
        <div class="components">
            <FormTipoPlan @escucharForm="puente" ref="componenteForm" @clearId="jumper"/>
            <TablaTipoPlan ref="componente" @ById="read" @change="update" @escuchartable="tabla"/>
        </div>
    </div>

</template>

<script>
import FormTipoPlan from '@/components/formularios/FormTipoPlan.vue'
import TablaTipoPlan from '@/components/tablas/TablaTipoPlan.vue'

export default{
    name:'TipoPlanView',
    components:{
        FormTipoPlan,
        TablaTipoPlan
    },
    computed:{
        user() {
            return this.$store.state.user;
        },
    },
    methods:{
        puente(){
            this.$refs.componente.obtenerTipoPlanes();
        },
        read(value){
            this.$refs.componenteForm.read(value);
        },
        update(value){
            this.$refs.componenteForm.update(value);
        },
        tabla(){
            this.$refs.componenteForm.cerrar();
        },
        jumper(){
            this.$refs.componente.limpiarId();
        }
    }
}
</script>