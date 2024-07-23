<template>
  <div class="container" id="form">
    <h1>Formulario de Rutina de Entrenamiento</h1>
    <form @submit.prevent="servicio()" >
      <div class="comp-form-group">
        <div class="form-group">
          <label for="rutina">Rutina: version {{ dato8 }}</label>
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
    ...mapState(['dato6','dato7','dato8','rutina','ejercicio','datoact1']),
  },
  //metodos CRUD
  methods:{
    ...mapActions(['actualizarRetorno','actualizarDato6','registrarRutina','actualizarDato7','registrarEjercicio',
    'actualizarDato8','actualizarDatoact1','limpiarDatoact1']),
    servicio(){
      if(this.salvar==true){
        if(this.dato6!=null && this.dato7!=null){
          this.guardar();
        }
        else{
          alert("hay campos vacios");
        }  
      }
      else {
        this.actualizar();       
      }
    },

    guardar(){
      axios
      .post('http://localhost:8080/api/rutinaejercicio',{
        rutina: this.dato6,
        ejercicio: this.dato7,
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
          this.actualizarDato6(response.data.rutina.codigo);
          this.registrarRutina(response.data.rutina.tipoRutina.nombre);
          this.actualizarDato7(response.data.ejercicio.codigo);
          this.registrarEjercicio(response.data.ejercicio.nombre.nombre);
          this.actualizarDato8(response.data.rutina.numero);
        })
        .catch((error) =>{
          console.error("Error al consultar rutina de entrenamiento: ", error);
        });
    },

    actualizar(){
      this.codigo=this.datoact1;      
      axios
        .put('http://localhost:8080/api/rutinaejercicio/actualizar/'+this.codigo,{
          rutina: this.dato6,
          ejercicio: this.dato7,      
      })
      .then((response)=>{
        console.log("Rutina de entrenamiento actualizado con exito", response.data);
        this.$emit('leave');
        this.limpiarDatoact1();
      })
      .catch((error)=>{
        console.error("Error al actualizar la rutina de entrenamiento", error);
      });
    },
    
    read(value){
      this.limpiarDatoact1();
      this.consultar(value);
      this.rotar();
    },
    update(value){
      this.consultar(value);
      this.actualizarDatoact1(value);
      this.variar();
    },
    clear(){
      this.rutina="";
      this.ejercicio="";
    },
    cerrar(){
      this.clear();
      this.rotar();
      this.limpiarDatoact1();
    },
    rotar(){
      this.modificar= false;
      this.salvar= true;
    },
    variar(){
      if(this.datoact1!=null){
      this.modificar=true;
      this.salvar=false;
      }
    },
    
    callMetodoR(){
      this.actualizarRetorno('retorno');
      this.$router.push('rutina');
    },
    callMetodoE(){
      this.actualizarRetorno('retorno');
      this.$router.push('ejercicio');
    },
  },
}
</script>