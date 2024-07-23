<template>
    <div class="view" v-show="mostrar">
        <div class="components">
            <div id="up">
                <h1 id="alitext">Ejercicios</h1>
                <div id="alibutton">
                    <font-awesome-icon :icon="['fas', 'address-book']" id="agregar" v-if="listar" @click="irAformulario()"/>
                    <font-awesome-icon icon="circle-xmark" id="cerrar2" v-if="formulario" @click="salir"/>
                </div>
            </div>
            <div v-show="formulario"><FormEjercicio @leave="salir" ref="componenteForm" @display="pantalla" @clearId="jumper"/></div>
            <div v-show="listar"><TablaEjercicio ref="componente" @ById="read" @change="update" @escuchartable="tabla"/></div>
        </div>
    </div>
</template>

<script>
import FormEjercicio from '@/components/formularios/FormEjercicio.vue'
import TablaEjercicio from '@/components/tablas/TablaEjercicio.vue'
import { mapActions, mapGetters } from 'vuex';

export default{
    name:'EjercicioView',
    components:{
        FormEjercicio,
        TablaEjercicio
    },
    data(){
        return{
            formulario:false,
            listar:true,
            mostrar:true,
        }
    },
    computed:{...mapGetters(['getPantalla']),
        user() {
                return this.$store.state.user;
            },
    },
    methods:{
        ...mapActions(['limpiarDato','limpiarDato2','limpiarDato3','limpiarNombre','limpiarTipoEjercicio',
        'limpiarMusculo', 'registrarMetodo2']),

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
            this.$refs.componente.obtenerEjercicios();
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
            this.limpiarNombre();
            this.limpiarTipoEjercicio();
            this.limpiarMusculo();
        },
        pantalla(){
            this.mostrar = this.getPantalla;
        }
    },
    mounted(){
        this.$store.dispatch('registrarMetodo2',this.pantalla);
    }
}
</script>