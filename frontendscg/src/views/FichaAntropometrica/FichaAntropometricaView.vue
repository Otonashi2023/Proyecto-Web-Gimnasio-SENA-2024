<template>
    <div class="view">
        <div class="components">
            <div id="up">
                <h1 id="alitext">Aprendiz</h1>
                <div id="alibutton">
                    <router-link to="aprendizPlan" style="color:orangered;margin-right: 40px; font-weight: 700;">Ir a planes</router-link>
                    <font-awesome-icon :icon="['fas', 'address-book']" id="agregar" v-if="listar" @click="irAformulario()"/>
                    <font-awesome-icon icon="circle-xmark" id="cerrar2" v-if="formulario" @click="salir"/>
                </div>
            </div>
            <div v-show="formulario"><FormFichaAntropo @leave="salir" ref="componenteForm"/></div>
            <div v-show="listar"><TablaFichaAntropo ref="componente" @ById="read" @change="update" @goForm="inData" @irAform="irAform"/></div>
        </div>
    </div>
</template>

<script>
import FormFichaAntropo from '@/components/formularios/FormFichaAntropo.vue'
import TablaFichaAntropo from '@/components/tablas/TablaFichaAntropo.vue'
import { mapActions } from 'vuex';

export default{
    name:'FichaAntropometricaView',
    components:{
        FormFichaAntropo,
        TablaFichaAntropo,
    },
    data(){
        return{
            formulario:false,
            listar:true,
        }
    },
    computed:{
        user() {
                return this.$store.state.user;
            },
    },
    methods:{
        ...mapActions('genero',['limpiarGenero']),
        ...mapActions('personal',['limpiarPersonal']),
        ...mapActions('fichaAntropometrica',['limpiarFichaAntropo']),
        ...mapActions('perimetros',['limpiarPerimetros']),
        ...mapActions(['limpiarDatoact1','limpiarRetorno3']),

        irAformulario(){
            this.limpiarDatos();
            this.cambiar();
            this.$refs.componenteForm.cerrar();
            this.$refs.componenteForm.cargarDatos();
        },
        salir(){
            this.formulario=false;
            this.listar=true;
            this.$refs.componenteForm.cerrar();
            this.$refs.componente.filtrarAprendiz();
        },
        read(value){
            this.cambiar();
            this.$refs.componenteForm.read(value);
        },
        update(value){
            this.$refs.componenteForm.update(value);
        },
        inData(){
            this.cambiar();
            this.limpiarRetorno3();
            this.$refs.componenteForm.variar();
        },
        irAform(){
            this.limpiarDatos();
            this.cambiar();
        },
        limpiarDatos(){
            this.limpiarGenero(); 
            this.limpiarPersonal();
            this.limpiarFichaAntropo();
            this.limpiarPerimetros();
            this.limpiarDatoact1();
        },
        cambiar(){
            this.formulario=true;
            this.listar=false;
        },
    }
}
</script>