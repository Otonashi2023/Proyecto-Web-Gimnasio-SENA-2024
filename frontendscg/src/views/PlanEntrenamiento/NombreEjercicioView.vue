<template>
    <div class="view1">
        <div class="components">
            <FormNombreEjercicio @escucharForm="puente" ref="componenteForm"/>
            <TablaNombreEjercicio ref="componente" @ById="idcodigo" @change="update" @escuchartable="tabla"/>
        </div>
    </div>

</template>

<script>
import FormNombreEjercicio from '@/components/FormNombreEjercicio.vue'
import TablaNombreEjercicio from '@/components/TablaNombreEjercicio.vue'

export default{
    name:'NombreEjercicioView',
    components:{
        FormNombreEjercicio,
        TablaNombreEjercicio
    },
    methods:{
        puente(){
            this.$refs.componente.obtenerNombreEjercicios();
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