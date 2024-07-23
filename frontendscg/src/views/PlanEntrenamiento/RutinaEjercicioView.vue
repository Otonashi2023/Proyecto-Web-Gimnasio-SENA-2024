<template>
    <div class="view">
        <div class="components">
            <div id="up">
                <h1 id="alitext">Rutinas de entrenamiento</h1>
                <div id="alibutton">
                    <font-awesome-icon :icon="['fas', 'address-book']" id="agregar" v-if="listar" @click="irAformulario()"/>
                    <font-awesome-icon icon="circle-xmark" id="cerrar2" v-if="formulario" @click="salir"/>
                </div>
            </div>
            <div v-show="formulario"><FormRutinaEjercicio @leave="salir" ref="componenteForm"/></div>
            <div v-show="listar"><TablaRutinaEjercicio ref="componente" @ById="read" @change="update" @escuchartable="tabla" @goForm="inData"/></div>
        </div>
    </div>
</template>

<script>
import FormRutinaEjercicio from '@/components/formularios/FormRutinaEjercicio.vue';
import TablaRutinaEjercicio from '@/components/tablas/TablaRutinaEjercicio.vue';
import { mapActions } from 'vuex';

export default{
    name:'RutinaEjercicioView',
    components:{
        FormRutinaEjercicio,
        TablaRutinaEjercicio
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
        ...mapActions(['limpiarDato6','limpiarDato7','limpiarRutina','limpiarEjercicio','limpiarDato8','limpiarRetorno','limpiarNombre','limpiarRetorno2','limpiarDato4']),

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
            this.$refs.componente.obtenerRutinaEjercicios();
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
            this.limpiarDato6();
            this.limpiarDato7();
            this.limpiarDato8();
            this.limpiarDato4();
            this.limpiarRutina();
            this.limpiarNombre();
            this.limpiarEjercicio();
            this.limpiarRetorno();
            this.limpiarRetorno2();
        },
    },
}
</script>