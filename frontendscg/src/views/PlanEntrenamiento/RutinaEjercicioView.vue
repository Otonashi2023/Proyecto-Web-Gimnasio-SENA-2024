<template>
    <div class="view" v-show="mostrar">
        <div class="components">
            <div id="up">
                <h1 id="alitext">Rutinas de entrenamiento</h1>
                <div id="alibutton">
                    <font-awesome-icon :icon="['fas', 'address-book']" id="agregar" v-if="listar" @click="irAformulario()"/>
                    <font-awesome-icon icon="circle-xmark" id="cerrar2" v-if="formulario" @click="salir"/>
                </div>
            </div>
            <div v-show="formulario"><FormRutinaEjercicio @leave="salir" ref="componenteForm" @display="pantalla" @clearId="jumper"/></div>
            <div v-show="listar"><TablaRutinaEjercicio ref="componente" @ById="read" @change="update" @escuchartable="tabla"/></div>
        </div>
    </div>
</template>

<script>
import FormRutinaEjercicio from '@/components/formularios/FormRutinaEjercicio.vue';
import TablaRutinaEjercicio from '@/components/tablas/TablaRutinaEjercicio.vue';
import { mapActions, mapGetters } from 'vuex';

export default{
    name:'NombreEjercicioView',
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
    computed:{...mapGetters(['getPantalla'])},
    methods:{
        ...mapActions(['limpiarDato','limpiarDato2','limpiarDato3','limpiarRutina','limpiarEjercicio','registrarMetodo4']),

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
        limpiarDatos(){
            this.limpiarDato();
            this.limpiarDato2();
            this.limpiarDato3();
            this.limpiarRutina();
            this.limpiarEjercicio();
        },
        pantalla(){
            this.mostrar = this.getPantalla;
        }
    },
    mounted(){
        this.$store.dispatch('registrarMetodo4',this.pantalla)
    }
}
</script>