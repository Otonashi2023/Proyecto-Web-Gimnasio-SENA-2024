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
          <tr id="fila2" v-for="ejercicio in ejercicios" :key="ejercicio.codigo" @click="() => {callMetodoE(ejercicio.codigo); consultarbyId(ejercicio.codigo)}">
            <td>Pendiente</td>
            <td>{{ ejercicio.nombre.nombre }}</td>
            <td>{{ ejercicio.tipoEjercicio.nombre }}</td>
            <td>{{ ejercicio.musculo.nombre }}</td>
            <td>{{ ejercicio.series }}</td>
            <td>{{ ejercicio.repeticiones }}</td>
            <td>{{ ejercicio.descanso }} min</td>
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
import axios from "axios";
import { mapActions, mapState } from "vuex";
  //contructor de las variables 
  export default {
    data(){
      return{
        ejercicios:[],
        codigo:null,
      }
    },
    computed:{
      ...mapState(['retorno','retorno2','dato7'])},
    
    methods: {
      ...mapActions(['actualizarDato7','registrarEjercicio']),

      obtenerEjercicios(){
        // Método para obtener los campos de la lista
        axios.get("http://localhost:8080/api/ejercicio/listar")
        .then((response)=>{
          this.ejercicios= response.data;
          this.codigo=null;
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
          this.codigo=null;
          this.$emit('escuchartable');
          this.obtenerEjercicios();                 
        })
        .catch((error)=>{
          console.log("Error al eliminar ejercicio", error);
        });
      },
      consultarbyId(value){
        if(this.codigo==null){
          this.actualizarDato7(value);
          this.$emit('ById',value);
        }
      },
      actualizar(value){
        this.codigo=value;
        this.$emit('change',this.codigo);
      },
      limpiarId(){
        this.codigo=null;
      },
      callMetodoE(){
        if(this.retorno=='retorno'){
          if(this.codigo==null){
            this.$router.push('rutinaEjercicio');
          }
        }
      },
      formulario(){
        if(this.retorno2=='retorno'){
          this.$emit('goForm');
        }
      },
    },
    mounted(){
      this.obtenerEjercicios();
      this.formulario();
    },
  }
</script>