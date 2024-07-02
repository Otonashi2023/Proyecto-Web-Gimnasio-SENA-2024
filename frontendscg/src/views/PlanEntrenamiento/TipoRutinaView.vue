<template>
    <div class="view">
        <div class="components">
            <FormTipoRutina @escucharForm="puente" ref="componenteForm"/>
            <TablaTipoRutina ref="componente" @ById="idcodigo" @change="update" @escuchartable="tabla"/>
        </div>
    </div>

</template>

<script>
import FormTipoRutina from '@/components/FormTipoRutina.vue'
import TablaTipoRutina from '@/components/TablaTipoRutina.vue'

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