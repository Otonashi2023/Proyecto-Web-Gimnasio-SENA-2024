<template>
    <div class="view">
        <div class="components">
            <FormCargo @escucharForm="puente" ref="componenteForm"/>
            <TablaCargo ref="componente" @ById="idcodigo" @change="update" @escuchartable="tabla"/>
        </div>
    </div>

</template>

<script>
import FormCargo from '@/components/formularios/FormCargo.vue'
import TablaCargo from '@/components/tablas/TablaCargo.vue'

export default{
    name:'CargoView',
    components:{
        FormCargo,
        TablaCargo
    },
    methods:{
        puente(){
            this.$refs.componente.obtenerCargos();
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