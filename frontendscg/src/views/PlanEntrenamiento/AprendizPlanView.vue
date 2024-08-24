<template>
    <div class="view">
        <div class="components">
            <div id="up">
                <h1 id="alitext">Aprendiz</h1>
                <div id="alibutton">
                    <font-awesome-icon :icon="['fas', 'address-book']" id="agregar" v-if="listar" @click="irAformulario()"/>
                    <font-awesome-icon icon="circle-xmark" id="cerrar2" v-if="formulario" @click="salir"/>
                </div>
            </div>
            <div v-show="formulario"><FormAprendizPlan @leave="salir" ref="componenteForm"/></div>
            <div v-show="listar"><TablaAprendizPlan ref="componente" @ById="read" @change="update" @escuchartable="tabla" @goForm="inData"/></div>
        </div>
    </div>
</template>

<script>
import FormAprendizPlan from '@/components/formularios/FormAprendizPlan.vue';
import TablaAprendizPlan from '@/components/tablas/TablaAprendizPlan.vue';
import { mapActions } from 'vuex';

export default{
    name:'EjercicioView',
    components:{
        FormAprendizPlan,
        TablaAprendizPlan,
    },
    data(){
        return{
            formulario:true,
            listar:true,
        }
    },
    computed:{
        user() {
                return this.$store.state.user;
            },
    },
    methods:{
        ...mapActions(['limpiarDato','limpiarDato2','limpiarDato3','limpiarNombre','limpiarTipoEjercicio',
        'limpiarMusculo','limpiarEjercicio','limpiarDatoact2','limpiarRetorno2','limpiarDato7','actualizarDatoact2']),

        cambiar(){
            this.formulario=true;
            this.listar=false;
        },
        irAformulario(){
            this.cambiar();
            this.limpiarDatos();
            this.$refs.componenteForm.clear();
        },
        salir(){
            this.formulario=false;
            this.listar=true;
            this.limpiarDatos();
            this.$refs.componente.consultarAprendizPlanAll();
        },
        read(value){
            this.cambiar();
            this.$refs.componenteForm.read(value);
        },
        update(value){
            this.cambiar();
            this.$refs.componenteForm.update(value);
        },
        tabla(){
            this.$refs.componenteForm.cerrar();
        },
        inData(){
            this.cambiar();
            this.limpiarRetorno2();
            this.$refs.componenteForm.variar();
        },
        limpiarDatos(){
            this.limpiarDato();
            this.limpiarDato2();
            this.limpiarDato3();
            this.limpiarNombre();
            this.limpiarTipoEjercicio();
            this.limpiarMusculo();
            this.limpiarDato7();
            this.limpiarEjercicio();
            this.limpiarDatoact2();
            this.$refs.componenteForm.cerrar()
        },
    }
}
</script>