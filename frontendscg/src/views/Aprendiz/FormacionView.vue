<template>
    <div class="view">
        <div class="components">
            <FormFormacion @escucharForm="puente" ref="componenteForm"/>
            <TablaFormacion ref="componente" @ById="idcodigo" @change="update" @escuchartable="tabla"/>
        </div>
    </div>

</template>

<script>
import FormFormacion from '@/components/FormFormacion.vue'
import TablaFormacion from '@/components/TablaFormacion.vue'

export default{
    name:'NombreEjercicioView',
    components:{
        FormFormacion,
        TablaFormacion
    },
    methods:{
        puente(){
            this.$refs.componente.obtenerFormaciones();
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