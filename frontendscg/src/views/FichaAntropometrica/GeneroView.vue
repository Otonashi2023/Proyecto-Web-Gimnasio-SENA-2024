<template>
    <div class="view">
        <div class="components">
            <FormGenero @escucharForm="puente" ref="componenteForm"/>
            <TablaGenero ref="componente" @ById="idcodigo" @change="update" @escuchartable="tabla"/>
        </div>
    </div>

</template>

<script>
import FormGenero from '@/components/FormGenero.vue'
import TablaGenero from '@/components/TablaGenero.vue'

export default{
    name:'GeneroView',
    components:{
        FormGenero,
        TablaGenero
    },
    methods:{
        puente(){
            this.$refs.componente.obtenerGeneros();
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