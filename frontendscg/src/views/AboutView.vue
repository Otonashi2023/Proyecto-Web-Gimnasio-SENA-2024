<template>
  <div>      
  <!--routers-->
    <div v-if="componentToShow === 'nombre ejercicio'"><NombreEjercicioView/></div>
    <div v-if="componentToShow === 'tipo ejercicio'"><TipoEjercicioView/></div>
    <div v-if="componentToShow === 'musculo'"><MusculoView/></div>
    <div v-if="componentToShow === 'tipo rutina'"><TipoRutinaView/></div>
    <div v-if="componentToShow === 'cargo'"><CargoView/></div>
    <div v-if="componentToShow === 'tipo documento'"><TipoDocumentoView/></div>
    <div v-if="componentToShow === 'genero'"><GeneroView/></div>
    <div v-if="componentToShow === 'formacion'"><FormacionView/></div>
    <div v-if="componentToShow === 'ejercicio'"><EjercicioView /></div>
    <div v-if="componentToShow === 'rutina'"><RutinaView /></div>
    <div v-if="componentToShow === 'rutiejercicio'"><RutinaEjercicioView /></div><!--p>se esta trabajando</p-->
  </div>  
</template>
<script>
import CargoView from './Personal/CargoView.vue'
import MusculoView from './PlanEntrenamiento/MusculoView.vue'
import NombreEjercicioView from './PlanEntrenamiento/NombreEjercicioView.vue'
import TipoEjercicioView from './PlanEntrenamiento/TipoEjercicioView.vue'
import TipoRutinaView from './PlanEntrenamiento/TipoRutinaView.vue'
import TipoDocumentoView from './Persona/TipoDocumentoView.vue'
import GeneroView from './FichaAntropometrica/GeneroView.vue'
import FormacionView from './Aprendiz/FormacionView.vue'
import EjercicioView from './PlanEntrenamiento/EjercicioView.vue'
import RutinaView from './PlanEntrenamiento/RutinaView.vue'
import RutinaEjercicioView from './PlanEntrenamiento/RutinaEjercicioView.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'HomeView',
    components: {
    NombreEjercicioView,
    TipoEjercicioView,
    MusculoView,
    TipoRutinaView,
    CargoView,
    TipoDocumentoView,
    GeneroView,
    FormacionView,
    EjercicioView,
    RutinaView,
    RutinaEjercicioView
    
    },
  computed: {
    ...mapGetters(['getEntidad']),
    user() {
      return this.$store.state.user;
    },
  },
  data(){
    return{
      componentToShow: "",
    }
  },
  methods:{
    ...mapActions(['registrarMetodo']),

      opcion(){
        
        if (this.getEntidad === 'nombre ejercicio') {
          this.componentToShow = 'nombre ejercicio';
        }
        else if (this.getEntidad === 'tipo ejercicio') {
          this.componentToShow = 'tipo ejercicio';
        }
        else if (this.getEntidad === 'musculo') {
          this.componentToShow = 'musculo';
        }
        else if (this.getEntidad === 'tipo rutina') {
          this.componentToShow = 'tipo rutina';
        }
        else if (this.getEntidad === 'cargo') {
          this.componentToShow = 'cargo';
        }
        else if (this.getEntidad === 'tipo documento') {
          this.componentToShow = 'tipo documento';
        }
        else if (this.getEntidad === 'genero') {
          this.componentToShow = 'genero';
        }
        else if (this.getEntidad === 'formacion') {
          this.componentToShow = 'formacion';
        }
        else if (this.getEntidad === 'ejercicio') {
          this.componentToShow = 'ejercicio';
        }
        else if (this.getEntidad === 'rutina') {
          this.componentToShow = 'rutina';
        }
        else if (this.getEntidad === 'rutiejercicio') {
          this.componentToShow = 'rutiejercicio';
        }
        else {
          this.componentToShow = "";
        }
      },    
  },
  mounted() {
    this.$store.dispatch('registrarMetodo', this.opcion);
  }  
}

</script>

