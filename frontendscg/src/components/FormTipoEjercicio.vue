<template>
    <div class="container" id="form">
      <h1>Formulario tipo de ejercicio</h1>
      <form id="simple-form" @submit.prevent="servicio()" >
        <div class="form-group">
          <label for="nombre">Nombre: </label>
          <input type="text" ref="myInput" name="nombre" id="nombre" required v-model="nombre" placeholder="ingrese el tipo de ejercicio">
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
export default {
  data() {
    return{
      nombre: "",
      salvar: true,
      modificar: false,
    };
  },
//metodos CRUD
  methods:{
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
      .post('http://localhost:8080/api/tipoejercicio',{
        nombre: this.nombre,
      })
      .then((response)=>{
        console.log("Tipo de ejercicio registrado con exito", response.data);
        alert("El tipo de ejercicio es registrado con exito");
        this.nombre = '';
        this.$emit('escucharForm');
      })
      .catch((error)=>{
        console.error("Error al registrar tipo de ejercicio:", error);
      });
    },

    consultar(value){
      this.codigo=value;
      axios
        .get('http://localhost:8080/api/tipoejercicio/'+this.codigo)
        .then((response)=>{
          //actualiza los campos del formulario con los datos del cargo consultado
          this.nombre = response.data.nombre;
          this.focusInput();
        })
        .catch((error) =>{
          console.error("Error al consultar tipo de ejercicio: ", error);
        });
    },

    consultarT(value){
      this.codigo=value;
      axios
        .get('http://localhost:8080/api/tipoejercicio/'+this.codigo)
        .then((response)=>{
          //actualiza los campos del formulario con los datos consultados
          this.nombre= response.data.nombre;
          this.salvar=false;
          this.modificar=true;
        })
        .catch((error) =>{
          console.error("Error al consultar tipo de ejercicio: ", error);
        });
    },

    actualizar(){
      axios
        .put('http://localhost:8080/api/tipoejercicio/actualizar/'+this.codigo,{
          nombre: this.nombre,
      })
      .then((response)=>{
        console.log("Tipo de ejercicio actualizado con exito", response.data);
        this.nombre = '';
        this.$emit('escucharForm');
        this.modificar= false;
        this.salvar= true;
      })
      .catch((error)=>{
        console.error("Error al actualizar el tipo de ejercicio", error);
      });
    },
    cerrar(){
      this.modificar= false;
      this.salvar= true;
      this.nombre= "";
      this.focusInput();
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