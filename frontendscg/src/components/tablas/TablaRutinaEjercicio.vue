<template>
  <!--Tabla que lista todos los registros de la entidad-->
  <div class="container2">
    <h1>Tabla  de rutinas de entrenamiento</h1>
    <div id="scroll">
      <table>
      <thead>
        <tr>
          <th>Rutina</th>
          <th>Ejercicios</th>
          <th id="rigth">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr id="fila2" v-for="rutina_ejercicio in rutina_ejercicios" :key="rutina_ejercicio.codigo" @click="consultarbyId(rutina_ejercicio.codigo)">
          <td>{{ rutina_ejercicio.rutina.tipoRutina.nombre }} {{ rutina_ejercicio.rutina.numero }}</td>
          <td>{{ rutina_ejercicio.ejercicio.nombre.nombre }}</td>
          <td id="alibutton">
              <font-awesome-icon icon="edit" id="editar" @click="actualizar(rutina_ejercicio.codigo)"/>
              <font-awesome-icon icon="trash" id="eliminar" @click="eliminar(rutina_ejercicio.codigo)"/>
          </td>            
        </tr>      
      </tbody>
    </table>
    </div>      
  </div>
</template>

<script>
import axios from "axios";
//contructor de las variables 
export default {
  data(){
    return{
      rutina_ejercicios:[],
      codigo:null,
    }
  },
  methods: {
    obtenerRutinaEjercicios(){
      // Método para obtener los campos de la lista
      axios.get("http://localhost:8080/api/rutinaejercicio/listar")
      .then((response)=>{
        this.rutina_ejercicios= response.data;
        this.codigo=null;
      })
      .catch((error)=>{
        console.error("Error al obtener rutina_ejercicio: ", error);
      })
    },
    eliminar(value){
      this.codigo= value;
    axios
      .delete('http://localhost:8080/api/rutinaejercicio/'+this.codigo)
      .then(()=>{
        console.log("rutina_ejercicio eliminado con exito");
        this.codigo=null;
        this.$emit('escuchartable');
        this.obtenerRutinaEjercicios();                   
      })
      .catch((error)=>{
        console.log("Error al eliminar rutina_ejercicio", error);
      });
    },
    consultarbyId(value){
      if(this.codigo==null){
        this.$emit('ById',value);
      }
    },
    actualizar(value){
      this.codigo=value;
      this.$emit('change',this.codigo);
    },
    limpiarId(){
      this.codigo=null;
    }
  },
  mounted(){
    this.obtenerRutinaEjercicios();
  },
}
</script>