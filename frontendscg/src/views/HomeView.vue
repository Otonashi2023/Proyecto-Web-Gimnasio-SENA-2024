<template>
  <!--div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div-->

   <div class="posicion">
    <div class="caja">
   <!-- SIDEBAR -->
   <nav id="menu">
     <div class="logo">
       <img src="@/assets/LogoSena.png" alt="Logo SENA">
       <h2>Gimnasio SENA CATA</h2>
     </div>
 
     <div class="items">
       <ul>
         <li><span class="material-icons-sharp">dashboard</span><a href="#">Panel de Control</a></li>
         <li><span class="material-icons-sharp">assignment_ind</span><a href="#">Aprendices</a></li>
         <li><span class="material-icons-sharp">supervisor_account</span><a href="#">Instructores</a></li>
         <li><span class="material-icons-sharp">sports_score</span><a href="#">Planes</a></li>
         <li><span class="material-icons-sharp">list_alt</span><a href="#">Rutinas</a></li>
         <li><span class="material-icons-sharp">fitness_center</span><a href="#">Ejercicios</a></li>
         <li><span class="material-icons-sharp">add_chart</span><a href="#">Reportes</a></li>
       </ul>
     </div>

     <div class="espacio"></div>
     <div class="separador"></div>
     
     <div class="fondo">
       <ul>
         <li><span class="material-icons-sharp">settings</span><a href="#">Configuración</a></li>
         <li><span class="material-icons-sharp">logout</span><a href="#" @click="logout">Cerrar sesión</a></li>
       </ul>
     </div>
    </nav>
    <section id="contenido">
      <div class="navegacion">
        <div class="busqueda">
          <span class="material-icons-sharp">search</span>
          <input type="text" placeholder="Buscar..." v-model="query" @input="handleSearch" ref="myInput">
        </div>
        <div class="perfil">
          <span class="material-icons-sharp">notifications</span>
          <img src="@/assets/Foto1.jpeg" alt="Imagen perfil">
          <span id="usuario"></span>
          <span id="rol"></span>
        </div>
      </div>
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
        <div v-if=false><EjercicioView /></div><!--p>se esta trabajando</p-->
        <div id ="lista" v-if="lista=true">Lista de comandos de los componentes para ingresar en el buscador
          <ul id="listando">
            <li>cargo</li>
            <li>genero</li>
            <li>formacion</li>
            <li>musculo</li>
            <li>nombre ejercicio</li>
            <li>tipo documento</li>
            <li>tipo rutina</li>            
            <li>tipo documento</li>            
          </ul>
        </div>
      </div>  
    </section>
  </div>
  </div>
    <div class="modal-overlay" v-if="isVisible=false">
      <div class="modal">
        <button @click="closeModal">Cerrar</button>
        <p>ensayando modal</p>
      </div>
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
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
    components: {
    //HelloWorld,
    NombreEjercicioView,
    TipoEjercicioView,
    MusculoView,
    TipoRutinaView,
    CargoView,
    TipoDocumentoView,
    GeneroView,
    FormacionView,
    EjercicioView,
    
    },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  data(){
    return{
      query:"",
      componentToShow: " ",
      ejercicio: true,
    }
  },
  methods:{
    logout() {
        this.$store.dispatch('logout');
        this.$router.push('/login');
      },   
      handleSearch() {       
        if (this.query === 'nombre ejercicio') {
        this.componentToShow = 'nombre ejercicio';
        }
        else if (this.query === 'tipo ejercicio') {
        this.componentToShow = 'tipo ejercicio';
        }
        else if (this.query === 'musculo') {
        this.componentToShow = 'musculo';
        }
        else if (this.query === 'tipo rutina') {
        this.componentToShow = 'tipo rutina';
        }
        else if (this.query === 'cargo') {
        this.componentToShow = 'cargo';
        }
        else if (this.query === 'tipo documento') {
        this.componentToShow = 'tipo documento';
        }
        else if (this.query === 'genero') {
        this.componentToShow = 'genero';
        }
        else if (this.query === 'formacion') {
        this.componentToShow = 'formacion';
        }
        else {
        this.componentToShow = "";
        }   
      },
      focusInput(){
        this.$refs.myInput.focus();
      }
  },
  mounted() {
    this.focusInput();
  }  
}

</script>

