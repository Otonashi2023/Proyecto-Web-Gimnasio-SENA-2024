<template>
    <!--Tabla que lista todos los registros de la entidad-->
    <div class="container2">
      <h1>Tabla  de ejercicios</h1>
      <div id="scroll">
        <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Musculo</th>
            <th>Series</th>
            <th>Repeticiones</th>
            <th>Descanso</th>
            <th id="rigth">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="ejercicio in ejercicios" :key="ejercicio.codigo" click="consultarbyId(ejercicio.codigo)">
            <td>Pendiente</td>
            <td>{{ ejercicio.nombre.nombre }}</td>
            <td>{{ ejercicio.tipoEjercicio.nombre }}</td>
            <td>{{ ejercicio.musculo.nombre }}</td>
            <td>{{ ejercicio.series }}</td>
            <td>{{ ejercicio.repeticiones }}</td>
            <td>{{ ejercicio.descanso }}</td>
            <td id="alibutton">
                <font-awesome-icon icon="edit" id="editar" @click="actualizar(ejercicio.codigo)"/>
                <font-awesome-icon icon="trash" id="eliminar" @click="eliminar(ejercicio.codigo)"/>
            </td>            
          </tr>      
        </tbody>
      </table>
      </div>      
    </div>
</template>
<script>
import {mapGetters, mapActions } from 'vuex';
import axios from "axios";
  //contructor de las variables 
  export default {
    data(){
      return{
        ejercicios:[],
        codigo: "",
      }
    },
    computed:{
      ...mapGetters(['obtenerVariableGlobal'])
    },
    methods: {
      ...mapActions(['actualizarVariableGlobal']),

      obtenerEjercicios(){
        // Método para obtener los campos de la lista
        axios.get("http://localhost:8080/api/ejercicio/listar")
        .then((response)=>{
          this.ejercicios= response.data;
        })
        .catch((error)=>{
          console.error("Error al obtener ejercicios: ", error);
        })
      },
      eliminar(value){
        this.codigo= value;
      axios
        .delete('http://localhost:8080/api/ejercicio/'+this.codigo)
        .then(()=>{
          console.log("Ejercicio eliminado con exito");
          //Limpiar los campos del formulario despues de eliminar          
          this.codigo = "";
          this.obtenerEjercicios();          
          
        })
        .catch((error)=>{
          console.log("Error al eliminar ejercicio", error);
        });
      },
      consultarbyId(value){
        this.codigo=value;
        alert("consultar")
        this.$emit('ById',this.codigo);
      },
      actualizar(value){
        this.$emit('change');
        this.actualizarVariableGlobal(value);
      },
    },
    mounted(){
      this.obtenerEjercicios();
    },
  }
</script>