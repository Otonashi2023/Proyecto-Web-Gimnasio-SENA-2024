<template>
    <div class="view">
        <div class="components">
            <FormMusculo @escucharForm="puente" ref="componenteForm"/>
            <TablaMusculo ref="componente" @ById="idcodigo" @change="update" @escuchartable="tabla"/>
        </div>
    </div>

</template>

<script>
import FormMusculo from '@/components/FormMusculo.vue';
import TablaMusculo from '@/components/TablaMusculo.vue';

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