<template>
    <!--Tabla que lista todos los registros de la entidad-->
    <div class="containerT" id="scroll">
      <h1>Tabla de nombres de genero</h1>
        <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th id="rigth">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="nombre in nombres" :key="nombre.codigo" @click="consultarbyId(nombre.codigo)">
            <td>{{ nombre.nombre }}</td>
            <td id="alibutton">
                <font-awesome-icon icon="edit" id="editar" @click="actualizar(nombre.codigo)"/>
                <font-awesome-icon icon="trash" id="eliminar" @click="eliminar(nombre.codigo)"/>
            </td>            
          </tr>      
        </tbody>
      </table>      
    </div>
</template>
<script>
import axios from "axios";
  //contructor de las variables 
  export default {
    data(){
      return{
        nombres:[],
        codigo: "",
      }
    },
    methods: {
      obtenerGeneros(){
        // Método para obtener los campos de la lista
        axios.get("http://localhost:8080/api/genero/listar")
        .then((response)=>{
          this.nombres= response.data;
        })
        .catch((error)=>{
          console.error("Error al obtener nombres de genero: ", error);
        })
      },
      eliminar(value){
        this.codigo= value;
      axios
        .delete('http://localhost:8080/api/genero/'+this.codigo)
        .then(()=>{
          console.log("Nombre de genero eliminado con exito");
          //Limpiar los campos del formulario despues de eliminar          
          this.codigo = "";
          this.$emit('escuchartable');          
          this.obtenerGeneros();
        })
        .catch((error)=>{
          console.log("Error al eliminar el nombre de genero", error);
        });
      },
      consultarbyId(value){
        this.codigo=value;
        this.$emit('ById',this.codigo);
      },
      actualizar(value){
        this.codigo=value;
        this.$emit('change',this.codigo);
      }
    },
    mounted(){
      this.obtenerGeneros();
    },
  }
</script>