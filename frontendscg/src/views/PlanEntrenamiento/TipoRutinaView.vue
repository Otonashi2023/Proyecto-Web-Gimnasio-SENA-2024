<template>
    <div class="view">
        <div class="components">
            <FormTipoRutina @escucharForm="puente" ref="componenteForm" @clearId="jumper"/>
            <TablaTipoRutina ref="componente" @ById="read" @change="update" @escuchartable="tabla"/>
        </div>
    </div>

</template>

<script>
import FormTipoRutina from '@/components/formularios/FormTipoRutina.vue'
import TablaTipoRutina from '@/components/tablas/TablaTipoRutina.vue'

export default{
    name:'TipoRutinaView',
    components:{
        FormTipoRutina,
        TablaTipoRutina
    },
    methods:{
        puente(){
            this.$refs.componente.obtenerTipoRutinas();
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