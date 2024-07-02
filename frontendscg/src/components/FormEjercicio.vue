<template>
    <div class="container2" id="form">
      <h1>Formulario de ejercicio</h1>
      <form @submit.prevent="servicio()" >
        <div class="comp-form-group">
          <div class="form-group">
            <label for="nombre">Nombre: </label>
            <input type="text" ref="myInput" name="nombre" id="input2" required v-model="nombre" placeholder="ingrese el ejercicio">
          </div>
          <div class="form-group">
            <label for="categotia">Categoria: </label>
            <input type="text" name="categoria" id="input2" required v-model="tipoEjercicio" placeholder="ingrese la categoria">
          </div>
          <div class="form-group">
            <label for="musculo">Musculo: </label>
            <input type="text" name="musculo" id="input2" required v-model="musculo" placeholder="ingrese el musculo a trabajar">
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
            <label for="descanso">Descanso:</label>
            <input type="number" name="descanso" id="input2" required v-model="descanso" placeholder="ingrese el tiempo de descanso ">
          </div>
        </div>
        <div id="dist">
          <div></div>
          <div id="formbutton">
              <button id="guardar" type="submit" name="guardar" v-if="salvar">Guardar</button>
              <button id="guardar" type="button" name="actulizar" v-if="modificar" @click="actualizar">Actualizar</button>
              <font-awesome-icon icon="circle-xmark" id="cerrar3" v-if="modificar" @click="cerrar"/>
          </div>
          <div></div>
        </div>
        
      </form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return{
      codigo:"",
      nombre: "",
      tipoEjercicio:"",
      musculo:"",
      series:"",
      repeticiones:"",
      descanso:"",
      salvar: true,
      modificar: false,
    };
  },
  computed:{
    ...mapGetters(['obtenerVariableGlobal'])
  },
//metodos CRUD
  methods:{
    ...mapActions(['limpiarVariableGlobal']),

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
      .post('http://localhost:8080/api/ejercicio',{
        nombre: this.nombre,
        tipoEjercicio: this.tipoEjercicio,
        musculo: this.musculo,
        series: this.series,
        repeticiones: this.repeticiones,
        descanso: this.descanso,
      })
      .then((response)=>{
        console.log("Ejercicio registrado con exito", response.data);
        alert("El ejercicio es registrado con exito");
        this.nombre = '';
        this.tipoEjercicio = '';
        this.musculo = '';
        this.series = '';
        this.repeticiones = '';
        this.descanso = '';
        this.focusInput();
      })
      .catch((error)=>{
        console.error("Error al registrar ejercicio:", error);
      });
    },

    consultar(){
      axios
        .get('http://localhost:8080/api/ejercicio/'+this.codigo)
        .then((response)=>{
          //actualiza los campos del formulario con los datos consultados
          this.nombre = response.data.nombre.nombre;
          this.tipoEjercicio = response.data.tipoEjercicio.nombre;
          this.musculo = response.data.musculo.nombre;
          this.series = response.data.series;
          this.repeticiones = response.data.repeticiones;
          this.descanso = response.data.descanso;
          this.focusInput();
        })
        .catch((error) =>{
          console.error("Error al consultar ejercicio: ", error);
        });
    },

    consultarT(){
      this.codigo=this.obtenerVariableGlobal;
      axios
        .get('http://localhost:8080/api/ejercicio/'+this.codigo)
        .then((response)=>{
          //actualiza los campos del formulario con los datos consultados
          this.nombre = response.data.nombre.nombre;
          this.tipoEjercicio = response.data.tipoEjercicio.nombre;
          this.musculo = response.data.musculo.nombre;
          this.series = response.data.series;
          this.repeticiones = response.data.repeticiones;
          this.descanso = response.data.descanso;
          this.salvar=false;
          this.modificar=true;
          this.limpiarVariableGlobal();
        })
        .catch((error) =>{
          console.error("Error al consultar ejercicio: ", error);
        });
    },

    actualizar(){
      alert(this.codigo)
      axios
        .put('http://localhost:8080/api/ejercicio/actualizar/'+this.codigo,{
          nombre: this.nombre,
          tipoEjercicio: this.tipoEjercicio,
          musculo: this.musculo,
          series: this.series,
          repeticiones: this.repeticiones,
          descanso: this.descanso,
      })
      .then((response)=>{
        console.log("Ejercicio actualizado con exito", response.data);
        this.nombre = '';
        this.modificar= false;
        this.salvar= true;
        alert("hola")
      })
      .catch((error)=>{
        console.error("Error al actualizar el ejercicio", error);
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
    this.consultarT();
  },
}
</script>