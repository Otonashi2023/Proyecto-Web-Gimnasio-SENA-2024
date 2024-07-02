<template>
    <div class="view">
        <div class="components">
            <FormTipoEjercicio @escucharForm="puente" ref="componenteForm"/>
            <TablaTipoEjercicio ref="componente" @ById="idcodigo" @change="update" @escuchartable="tabla"/>
        </div>
    </div>

</template>

<script>
import FormTipoEjercicio from '@/components/FormTipoEjercicio.vue'
import TablaTipoEjercicio from '@/components/TablaTipoEjercicio.vue'

export default{
    name:'TipoEjercicioView',
    components:{
        FormTipoEjercicio,
        TablaTipoEjercicio
    },
    methods:{
        puente(){
            this.$refs.componente.obtenerTipoEjercicios();
        },
        idcodigo(value){
            this.$refs.componenteForm.consultar(value);
        },
        update(value){
            this.$refs.componenteForm.consultarT(value);
        },
        tabla(){
            this.$refs.componenteForm.cerrar();
        }
    }
}
</script>