<template>
    <div class="view1">
        <div class="components">
            <FormNombreEjercicio @escucharForm="puente" ref="componenteForm" @clearId="jumper"/>
            <TablaNombreEjercicio ref="componente" @ById="read" @change="update" @escuchartable="tabla"/>
        </div>
    </div>

</template>

<script>
import FormNombreEjercicio from '@/components/formularios/FormNombreEjercicio.vue'
import TablaNombreEjercicio from '@/components/tablas/TablaNombreEjercicio.vue'

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