<template>
    <div class="view" v-show="mostrar">
        <div class="components">
            <div id="up">
                <h1 id="alitext">Rutina</h1>
                <div id="alibutton">
                    <font-awesome-icon :icon="['fas', 'address-book']" id="agregar" v-if="listar" @click="irAformulario()"/>
                    <font-awesome-icon icon="circle-xmark" id="cerrar2" v-if="formulario" @click="salir"/>
                </div>
            </div>
            <div v-show="formulario"><FormRutina @leave="salir" ref="componenteForm" @display="pantalla" @clearId="jumper"/></div>
            <div v-show="listar"><TablaRutina ref="componente" @ById="read" @change="update" @escuchartable="tabla"/></div>
        </div>
    </div>
</template>

<script>
import FormRutina from '@/components/formularios/FormRutina.vue';
import TablaRutina from '@/components/tablas/TablaRutina.vue'
import { mapActions, mapGetters } from 'vuex';

export default{
    name:'NombreEjercicioView',
    components:{
        FormRutina,
        TablaRutina
    },
    data(){
        return{
            formulario:false,
            listar:true,
            mostrar:true,
        }
    },
    computed:{...mapGetters(['getPantalla','getEntidad2'])},
    methods:{
        ...mapActions(['limpiarDato','limpiarNombre','registrarEntidad2','registrarMetodo3']),

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
            this.$refs.componente.obtenerRutinas();
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
        limpiarDatos(){
            this.limpiarDato();
            this.limpiarNombre();
        },
        pantalla(){
            this.cambiar();
            this.mostrar = this.getPantalla;
        },
        activarForm(){
            if(this.getEntidad2==true){
                this.cambiar();
                this.registrarEntidad2(false);
            }
        }
    },
    mounted(){
        this.$store.dispatch('registrarMetodo3',this.pantalla);
        this.activarForm();
    }
}
</script>