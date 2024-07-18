<template>
    <div class="container2" id="form">
      <h1>Formulario de ejercicio</h1>
      <form @submit.prevent="servicio()" >
        <div class="comp-form-group">
          <div class="form-group">
            <label for="nombre">Nombre: </label>
            <input type="text" @click="callMetodoN"  name="nombre" id="input2" v-model="nombre" placeholder="haz click para ingresar el nombre" readonly>
          </div>
          <div class="form-group">
            <label for="categotia">Categoria: </label>
            <input type="text" @click="callMetodoT" name="categoria" id="input2" v-model="tipoEjercicio" placeholder="haz click para ingresar la categoria" readonly>
          </div>
          <div class="form-group">
            <label for="musculo">Musculo: </label>
            <input type="text" @click="callMetodoM" name="musculo" id="input2" v-model="musculo" placeholder="haz click para ingresar el musculo a trabajar" readonly>
          </div>
        </div>
        <div class="comp-form-group">
          <div class="form-group">
            <label for="series">Series: </label>
            <input type="number" name="series" id="input2" required v-model="series" placeholder="ingrese el numero de series">
          </div>
          <div class="form-group">
            <label for="repeticiones">Repeticiones:</label>
            <input type="number" name="repeticiones" id="input2" required v-model="repeticiones" placeholder="ingrese el numero de repeticiones ">
          </div>
          <div class="form-group">
            <label for="descanso">Descanso (min):</label>
            <input type="number" name="descanso" id="input2" required v-model="descanso" placeholder="ingrese el tiempo de descanso ">
          </div>
        </div>
        <div id="dist">
          <div></div>
          <div id="formbutton">
              <button id="guardar" type="submit" name="guardar" v-if="salvar">Guardar</button>
              <button id="guardar" type="submit" name="actulizar" v-if="modificar">Actualizar</button>
              <font-awesome-icon :icon="['fas', 'right-left']" id="cerrar3" v-if="modificar" @click="cerrar"/>
          </div>
          <div></div>
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
      series:"",
      repeticiones:"",
      descanso:"",
      salvar: true,
      modificar: false,
    };
  },

  computed:{
    ...mapState(['dato','dato2','dato3','nombre','tipoEjercicio','musculo']),
  },
//metodos CRUD
  methods:{
    ...mapActions(["showPantalla",'actualizarRetorno','actualizarDato','actualizarDato2','actualizarDato3','registrarNombre','registrarTipoEjercicio','registrarMusculo','registrarEntidad', 'callMetodo']),
    
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
      .post('http://localhost:8080/api/ejercicio',{
        nombre: this.dato,
        tipoEjercicio: this.dato2,
        musculo: this.dato3,
        series: this.series,
        repeticiones: this.repeticiones,
        descanso: this.descanso,
      })
      .then((response)=>{
        console.log("Ejercicio registrado con exito", response.data);
        alert("El ejercicio es registrado con exito");
        this.$emit('leave');      
      })
      .catch((error)=>{
        console.error("Error al registrar ejercicio:", error);
      });
    },

    consultar(value){
      this.codigo=value;
      axios
        .get('http://localhost:8080/api/ejercicio/'+this.codigo)
        .then((response)=>{
          //actualiza los campos del formulario con los datos consultados
          this.actualizarDato(response.data.nombre.codigo);
          this.registrarNombre(response.data.nombre.nombre);
          this.actualizarDato2(response.data.tipoEjercicio.codigo);
          this.registrarTipoEjercicio(response.data.tipoEjercicio.nombre);
          this.actualizarDato3(response.data.musculo.codigo);
          this.registrarMusculo(response.data.musculo.nombre);
          this.series = response.data.series;
          this.repeticiones = response.data.repeticiones;
          this.descanso = response.data.descanso;
        })
        .catch((error) =>{
          console.error("Error al consultar ejercicio: ", error);
        });
    },

    actualizar(){
      
      axios
        .put('http://localhost:8080/api/ejercicio/actualizar/'+this.codigo,{
          nombre: this.dato,
          tipoEjercicio: this.dato2,
          musculo: this.dato3,
          series: this.series,
          repeticiones: this.repeticiones,
          descanso: this.descanso,        
      })
      .then((response)=>{
        console.log("Ejercicio actualizado con exito", response.data);
        this.$emit('leave');

      })
      .catch((error)=>{
        console.error("Error al actualizar el ejercicio", error);
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
      this.series="";
      this.repeticiones="";
      this.descanso="";
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
      this.registrarEntidad('nombre ejercicio');
      this.callMetodo();
      this.showPantalla(false);
      this.$emit('display');
    },
    callMetodoT(){
      this.actualizarRetorno('retorno');
      this.registrarEntidad('tipo ejercicio');
      this.callMetodo();
      this.showPantalla(false);
      this.$emit('display');
    },
    callMetodoM(){
      this.actualizarRetorno('retorno');
      this.registrarEntidad('musculo');
      this.callMetodo();
      this.showPantalla(false);
      this.$emit('display');
    },
  },
}
</script>