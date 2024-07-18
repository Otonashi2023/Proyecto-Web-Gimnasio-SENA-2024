<template>
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
</template>
<script>

export default{
    data(){
        return{
            query:""
        }
    },
    methods:{
        handleSearch() {
        if (this.query === 'nombre ejercicio') {
            this.$router.push(this.$route.query.redirect || '/nombreEjercicio');
            this.query="";
        }
        else if (this.query === 'tipo ejercicio') { 
            this.$router.push(this.$route.query.redirect || '/tipoEjercicio');
            this.query="";         
        }
        else if (this.query === 'musculo') {
            this.$router.push(this.$route.query.redirect || '/musculo');
            this.query="";
        }
        else if (this.query === 'tipo rutina') {
            this.$router.push(this.$route.query.redirect || '/tipoRutina');
            this.query="";      
        }
        else if (this.query === 'cargo') {
            this.$router.push(this.$route.query.redirect || '/cargo');
            this.query="";
        }
        else if (this.query === 'tipo documento') {
            this.$router.push(this.$route.query.redirect || '/tipoDocumento');
            this.query="";
        }
        else if (this.query === 'genero') {
            this.$router.push(this.$route.query.redirect || '/genero');
            this.query="";
        }
        else if (this.query === 'formacion') {
            this.$router.push(this.$route.query.redirect || '/formacion');
            this.query="";
        }
        else if (this.query === 'ejercicio') {
            this.$router.push(this.$route.query.redirect || '/ejercicio');
            this.query="";
        }
        else if (this.query === 'rutina') {
            this.$router.push(this.$route.query.redirect || '/rutina');
            this.query="";
        }
        else if (this.query === 'rutiejercicio') {
            this.$router.push(this.$route.query.redirect || '/rutinaEjercicio');
            this.query="";
        }
        else {
            this.$router.push(this.$route.query.redirect || '/');
        }   
      },
      focusInput(){
        this.$refs.myInput.focus();
      }
    },
    mounted(){
        this.focusInput();
    }
}
</script>