<template>
  <div class="container" id="form">
    <h1>Formulario de Rutina de Entrenamiento</h1>
    <form @submit.prevent="servicio()" >
      <div class="comp-form-group">
        <div class="form-group">
          <label for="rutina">Rutina: version {{ dato3 }}</label>
          <input type="text" @click="callMetodoR"  name="rutina" id="input2" v-model="rutina" placeholder="haz click para ingresar la rutina" readonly>
        </div>
        <div class="form-group">
          <label for="ejercicio">Ejercicio: </label>
          <input type="text" @click="callMetodoE" name="ejercicio" id="input2" v-model="ejercicio" placeholder="haz click para ingresar el ejercicio" readonly>
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
      salvar: true,
      modificar: false,
    };
  },

  computed:{
    ...mapState(['dato','dato2','dato3','rutina','ejercicio']),
  },
  //metodos CRUD
  methods:{
    ...mapActions(["showPantalla",'actualizarRetorno','actualizarDato','actualizarDato3','registrarRutina','actualizarDato2','registrarEjercicio','registrarEntidad','callMetodo']),
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
      .post('http://localhost:8080/api/rutinaejercicio',{
        rutina: this.dato,
        ejercicio: this.dato2
      })
      .then((response)=>{
        console.log("Rutina de entrenamiento registrado con exito", response.data);
        alert("La rutina de entrenamiento es registrado con exito");
        this.$emit('leave');      
      })
      .catch((error)=>{
        console.error("Error al registrar rutina de entrenamiento:", error);
      });
    },

    consultar(value){
      this.codigo=value;
      axios
        .get('http://localhost:8080/api/rutinaejercicio/'+this.codigo)
        .then((response)=>{
          //actualiza los campos del formulario con los datos consultados
          this.actualizarDato(response.data.rutina.codigo);
          this.actualizarDato2(response.data.ejercicio.codigo);
          this.registrarRutina(response.data.rutina.tipoRutina.nombre);
          this.registrarEjercicio(response.data.ejercicio.nombre.nombre);
          this.actualizarDato3(response.data.rutina.numero);
        })
        .catch((error) =>{
          console.error("Error al consultar rutina de entrenamiento: ", error);
        });
    },

    actualizar(){
      
      axios
        .put('http://localhost:8080/api/rutinaejercicio/actualizar/'+this.codigo,{
          rutina: this.dato,
          ejercicio: this.dato2,      
      })
      .then((response)=>{
        console.log("Rutina de entrenamiento actualizado con exito", response.data);
        this.$emit('leave');

      })
      .catch((error)=>{
        console.error("Error al actualizar la rutina de entrenamiento", error);
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
      this.rutina="";
      this.ejercicio="";
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

    callMetodoR(){
      this.actualizarRetorno('retorno');
      this.registrarEntidad('rutina');
      this.callMetodo();
      this.showPantalla(false);
      this.$emit('display');
    },
    callMetodoE(){
      this.actualizarRetorno('retorno');
      this.registrarEntidad('ejercicio');
      this.callMetodo();
      this.showPantalla(false);
      this.$emit('display');
    },
  },
}
</script>