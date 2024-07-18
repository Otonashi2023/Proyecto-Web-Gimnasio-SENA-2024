<template>
     <div class="logo">
       <img src="@/assets/LogoSena.png" alt="Logo SENA">
       <h2>Gimnasio SENA CATA</h2>
     </div>
 
     <div class="items">
       <ul>
         <li><span class="material-icons-sharp">dashboard</span><router-link to="/">Panel de Control</router-link></li>
         <li><span class="material-icons-sharp">assignment_ind</span><a @click="aprendices">Aprendices</a></li>
         <li><span class="material-icons-sharp">supervisor_account</span><a @click="instructores">Instructores</a></li>
         <li><span class="material-icons-sharp">sports_score</span><a @click="planes">Planes</a></li>
         <li><span class="material-icons-sharp">list_alt</span><router-link to="/rutinaEjercicio">Rutinas</router-link></li>
         <li><span class="material-icons-sharp">fitness_center</span><router-link to="/ejercicio">Ejercicios</router-link></li>
         <li><span class="material-icons-sharp">add_chart</span><a @click="report">Reportes</a></li>
       </ul>
     </div>

     <div class="espacio"></div>
     <div class="separador"></div>
     
     <div class="fondo">
       <ul>
         <li><span class="material-icons-sharp">settings</span><a @click="config">Configuración</a></li>
         <li><span class="material-icons-sharp">logout</span><a @click="logout">Cerrar sesión</a></li>
       </ul>
     </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'HomeView',
  computed: {
    ...mapState(['user']),
  },
  methods:{
    ...mapActions(['resetVisibleIn','resetVisibleOut']),
    logout(){
        this.$store.dispatch('logout');
        this.$router.push('/login');
        this.resetVisibleIn();
        this.resetVisibleOut();
      },
  }
}
</script>