<template>
    <div class="view">
        <div class="components">
            <FormTipoDocumento @escucharForm="puente" ref="componenteForm"/>
            <TablaTipoDocumento ref="componente" @ById="idcodigo" @change="update" @escuchartable="tabla"/>
        </div>
    </div>

</template>

<script>
import FormTipoDocumento from '@/components/FormTipoDocumento.vue'
import TablaTipoDocumento from '@/components/TablaTipoDocumento.vue'

export default{
    name:'TipoDocumentoView',
    components:{
        FormTipoDocumento,
        TablaTipoDocumento
    },
    methods:{
        puente(){
            this.$refs.componente.obtenerTipoDocumentos();
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