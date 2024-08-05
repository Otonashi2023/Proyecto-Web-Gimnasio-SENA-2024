<template>
    <div class="container" id="form">
      <h1>Formulario tipo de Plan de entrenamiento</h1>
      <form id="simple-form" @submit.prevent="servicio()" >
        <div class="form-group">
          <label for="nombre">Nombre: </label>
          <input type="text" ref="myInput" name="nombre" id="nombre" required v-model="nombre" placeholder="ingrese el tipo de plan">
        </div>
        <div id="flex">
            <button id="guardar" type="submit" name="guardar" v-if="salvar">Guardar</button>
            <button id="guardar" type="button" name="actulizar" v-if="modificar" @click="actualizar">Actualizar</button>
            <font-awesome-icon icon="circle-xmark" id="cerrar" v-if="modificar" @click="cerrar"/>
        </div>
      </form>    
    </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return{
      nombre: "",
      salvar: true,
      modificar: false,
    };
  },
  computed:{...mapState(['dato4'])},
//metodos CRUD
  methods:{
    ...mapActions(['registrarNombre']),
    servicio(){
      if(this.salvar==true){
        this.guardar();
      }
      else{
        this.actualizar();
      }
    },

    guardar(){
      axios
      .post('http://localhost:8080/api/tipoplan',{
        nombre: this.nombre,
      })
      .then((response)=>{
        console.log("Tipo plan registrado con exito", response.data);
        alert("El Tipo plan es registrado con exito");
        if(this.retorno=='retorno'){
          this.actualizarDato4(response.data.codigo);
          this.antesderoutear();
          this.$router.push('plan');
        }     
        this.nombre = '';
        this.$emit('escucharForm');
      })
      .catch((error)=>{
        console.error("Error al registrar tipo de plan:", error);
      });
    },

    consultar(value){
      this.codigo=value;
      axios
        .get('http://localhost:8080/api/tipoplan/'+this.codigo)
        .then((response)=>{
          //actualiza los campos del formulario con los datos consultados
          if(this.habilitar==1){
            this.registrarNombre(response.data.nombre.nombre);
          }
          this.nombre = response.data.nombre;
          this.focusInput();
        })
        .catch((error) =>{
          console.error("Error al consultar tipo de plan: ", error);
        });
    },

    actualizar(){
      axios
        .put('http://localhost:8080/api/tipoplan/actualizar/'+this.codigo,{
          nombre: this.nombre,
      })
      .then((response)=>{
        console.log("Tipo de plan actualizado con exito", response.data);
        this.nombre = '';
        this.$emit('escucharForm');
        this.modificar= false;
        this.salvar= true;
      })
      .catch((error)=>{
        console.error("Error al actualizar el tipo de plan", error);
      });
    },

    read(value){
      this.consultar(value);
    },
    update(value){
      this.consultar(value);
      this.salvar=false;
      this.modificar=true;
    },
    cerrar(){
      this.modificar= false;
      this.salvar= true;
      this.nombre= "";
      this.focusInput();
      this.$emit('clearId');
    },
    focusInput(){
      this.$refs.myInput.focus();
    },
    antesderoutear(){
      this.habilitar=1;
      this.consultar(this.dato5);
    },
  },
  mounted() {
    this.focusInput();
  }
}
</script>