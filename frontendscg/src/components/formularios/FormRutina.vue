<template>
    <div class="container" id="form">
      <h1>Formulario de Rutina</h1>
      <form @submit.prevent="servicio()" >
        <div class="comp-form-group">
          <div class="form-group">
            <label for="nombre">Nombre: </label>
            <input type="text" @click="callMetodoN"  name="nombre" id="input2" v-model="nombre" placeholder="haz click para ingresar el nombre" readonly>
          </div>
          <div class="form-group">
            <label for="version">Version: </label>
            <input type="number" name="version" id="input2" v-model="numero" placeholder="haz click para ingresar la version">
          </div>
          <div class="form-group">
            <div id="formbutton">
                <button id="guardar" type="submit" name="guardar" v-if="salvar">Guardar</button>
                <button id="guardar" type="submit" name="actulizar" v-if="modificar">Actualizar</button>
                <font-awesome-icon :icon="['fas', 'right-left']" id="cerrar3" v-if="modificar" @click="cerrar"/>
            </div>
          </div>
        </div>
      </form>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return{
      numero:"",
      salvar: true,
      modificar: false,
    };
  },

  computed:{
    ...mapState(['dato','nombre']),
  },
//metodos CRUD
  methods:{
    ...mapActions(["showPantalla",'actualizarRetorno','actualizarDato','registrarNombre','registrarEntidad','callMetodo']),
    
    servicio(){
      if(this.salvar==true){
        this.guardar();
      }
      else {
        this.actualizar();       
      }
    },

    guardar(){
      axios
      .post('http://localhost:8080/api/rutina',{
        tipoRutina: this.dato,
        numero: this.numero
      })
      .then((response)=>{
        console.log("Rutina registrado con exito", response.data);
        alert("La rutina es registrado con exito");
        this.$emit('leave');      
      })
      .catch((error)=>{
        console.error("Error al registrar rutina:", error);
      });
    },

    consultar(value){
      this.codigo=value;
      axios
        .get('http://localhost:8080/api/rutina/'+this.codigo)
        .then((response)=>{
          //actualiza los campos del formulario con los datos consultados
          this.actualizarDato(response.data.tipoRutina.codigo);
          this.registrarNombre(response.data.tipoRutina.nombre);
          this.numero = response.data.numero;
        })
        .catch((error) =>{
          console.error("Error al consultar rutina: ", error);
        });
    },

    actualizar(){
      
      axios
        .put('http://localhost:8080/api/rutina/actualizar/'+this.codigo,{
          tipoRutina: this.dato,
          numero: this.numero,      
      })
      .then((response)=>{
        console.log("Rutina actualizado con exito", response.data);
        this.$emit('leave');

      })
      .catch((error)=>{
        console.error("Error al actualizar la rutina", error);
      });
    },
    
    read(value){
      this.consultar(value);
      this.rotar();
    },
    update(value){
      this.consultar(value);
      this.salvar=false;
      this.modificar=true;
    },
    clear(){
      this.numero="";
      this.cerrar();
    },
    cerrar(){
      this.rotar();
      this.$emit('clearId'); 
    },
    rotar(){
      this.modificar= false;
      this.salvar= true;
    },

    callMetodoN(){
      this.actualizarRetorno('retorno');
      this.registrarEntidad('tipo rutina');
      this.callMetodo();
      this.showPantalla(false);
      this.$emit('display');
    },
  },
}
</script>