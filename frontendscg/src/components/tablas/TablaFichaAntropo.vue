<template>
    <!--Tabla que lista todos los registros de la entidad-->
    <div class="containerT" id="scroll">
      <h1>Fichas Antropometricas</h1>
      <table>
        <thead>
          <tr>
            <th>Numero de control</th>
            <th>Fecha de toma</th>
            <th>Altura</th>
            <th>Peso</th>
            <th>IMC</th>
            <th id="rigth">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="(item,index) in fichaAntropoAll" :key="index" @click="() => {callMetodoN(); consultarbyId(item.codigo); registrarNombre(item.nombre)}">
            <td>{{ item.numControl }}</td>
            <td>{{ item.fecha }}</td>
            <td>{{ item.altura }} m</td>
            <td>{{ item.peso }} kg</td>
            <td>{{ item.imc }}</td>
            <td id="alibutton">
                <font-awesome-icon icon="edit" id="editar" @click="actualizar(item.codigo)"/>
                <font-awesome-icon icon="trash" id="eliminar" @click="eliminar(item.codigo)"/>
            </td>            
          </tr>      
        </tbody>
      </table>
    </div>
</template>
<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";
  //constructor de las variables 
  export default {
    data(){
      return{
        nombres:[],
        codigo: "",
      }
    },
    computed:{
      ...mapState('fichaAntropometrica',['fichaAntropoAll']),
      ...mapState(['retorno2'])},
    methods: {
      ...mapActions('fichaAntropometrica',['consultarFichaAntropoAll']),
      ...mapActions(['actualizarDato','registrarNombre']),

      obtenerCargos(){
        // Método para obtener los campos de la lista
        axios.get("http://localhost:8080/api/fichaantropo/listar")
        .then((response)=>{
          this.nombres= response.data;
          this.codigo=null;
        })
        .catch((error)=>{
          console.error("Error al obtener los cargos: ", error);
        })
      },

      eliminar(value){
        this.codigo= value;
      axios
        .delete('http://localhost:8080/api/fichaantropo/'+this.codigo)
        .then(()=>{
          console.log("Cargo eliminado con exito");
          //Limpiar los campos del formulario despues de eliminar          
          this.codigo = null;
          this.$emit('escuchartable');          
          this.obtenerCargos();
        })
        .catch((error)=>{
          console.log("Error al eliminar el cargo", error);
          alert("No se puede borrar, este dato esta siendo usado.");
          this.codigo=null;
        });
      },
      
      consultarbyId(value){
        if(this.codigo==null){
          this.actualizarDato(value);
          this.$emit('ById',value);
        }
      },
      actualizar(value){
        this.codigo=value;
        this.$emit('change',this.codigo);
      },
      callMetodoN(){
        if(this.retorno2=='retorno'){
          if(this.codigo==null){
            this.$router.push('persona');
          }
        }     
      },
      limpiarId(){
        this.codigo=null;
      }
    },
    mounted(){
      this.consultarFichaAntropoAll();
    },
  }
</script>