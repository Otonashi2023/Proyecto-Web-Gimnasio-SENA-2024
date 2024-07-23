<template>
    <div class="view">
        <div class="components">
            <div id="up">
                <h1 id="alitext">Planes de entrenamiento</h1>
                <div id="alibutton">
                    <font-awesome-icon :icon="['fas', 'address-book']" id="agregar" v-if="listar" @click="irAformulario()"/>
                    <font-awesome-icon icon="circle-xmark" id="cerrar2" v-if="formulario" @click="salir"/>
                </div>
            </div>
            <div v-show="formulario"><FormPlanRutina @leave="salir" ref="componenteForm"/></div>
            <div v-show="listar"><TablaPlanRutina ref="componente" @ById="read" @change="update" @escuchartable="tabla" @goForm="inData"/></div>
        </div>
    </div>
</template>

<script>
import FormPlanRutina from '@/components/formularios/FormPlanRutina.vue';
import TablaPlanRutina from '@/components/tablas/TablaPlanRutina.vue';
import { mapActions } from 'vuex';

export default{
    name:'PlanRutinaView',
    components:{
        FormPlanRutina,
        TablaPlanRutina
    },
    data(){
        return{
            formulario:false,
            listar:true,
            mostrar:true,
        }
    },
    computed:{
        user() {
            return this.$store.state.user;
        },
    },
    methods:{
        ...mapActions(['limpiarDato5','limpiarDato6','limpiarPlan','limpiarRutina','limpiarDato9','limpiarRetorno','limpiarNombre','limpiarRetorno2','limpiarDato4','limpiarRetorno3']),

        cambiar(){
            this.formulario=true;
            this.listar=false;
        },
        irAformulario(){
            this.cambiar();
            this.limpiarDatos();
            this.$refs.componenteForm.cerrar();
        },
        salir(){
            this.formulario=false;
            this.listar=true;
            this.limpiarDatos();
            this.$refs.componente.obtenerPlanRutinas();
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
        jumper(){
            this.$refs.componente.limpiarId();
        },
        inData(){
            this.cambiar();
            this.limpiarRetorno2();
            this.$refs.componenteForm.variar();
        },
        limpiarDatos(){
            this.limpiarDato5();
            this.limpiarDato6();
            this.limpiarDato9();
            this.limpiarDato4();
            this.limpiarPlan();
            this.limpiarRutina();
            this.limpiarNombre();
            this.limpiarRetorno2();
            this.limpiarRetorno3();
        },
    },
}
</script>