<template>
    <div class="view">
        <div class="components">
            <FormMusculo @escucharForm="puente" ref="componenteForm" @clearId="jumper"/>
            <TablaMusculo ref="componente" @ById="idcodigo" @change="update" @escuchartable="tabla"/>
        </div>
    </div>

</template>

<script>
import FormMusculo from '@/components/formularios/FormMusculo.vue';
import TablaMusculo from '@/components/tablas/TablaMusculo.vue';

export default{
    name:'MusculoView',
    components:{
        FormMusculo,
        TablaMusculo
    },
    methods:{
        puente(){
            this.$refs.componente.obtenerMusculos();
        },
        idcodigo(value){
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