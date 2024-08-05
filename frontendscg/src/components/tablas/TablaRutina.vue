<template>
    <!--Tabla que lista todos los registros de la entidad-->
    <div class="container2">
      <h1>Tabla  de rutinas</h1>
      <div id="scroll">
        <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Version</th>
            <th id="rigth">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="rutina in rutinas" :key="rutina.codigo" @click="() => {callMetodoN(); consultarbyId(rutina.codigo); consultarbyName(rutina.tipoRutina.nombre,rutina.numero)}">
            <td>{{ rutina.tipoRutina.nombre }}</td>
            <td>{{ rutina.numero }}</td>
            <td id="alibutton">
                <font-awesome-icon icon="edit" id="editar" @click="actualizar(rutina.codigo)"/>
                <font-awesome-icon icon="trash" id="eliminar" @click="eliminar(rutina.codigo)"/>
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
        rutinas:[],
        codigo:null,
      }
    },
    computed:{...mapState(['retorno','retorno2','retorno3'])},
    methods: {
      ...mapActions('variables',['limpiarEjercicios','limpiarArrayE']),
      ...mapActions(['actualizarDato6','actualizarDato8','registrarRutina','limpiarEjercicio']),

      obtenerRutinas(){
        // Método para obtener los campos de la lista
        axios.get("http://localhost:8080/api/rutina/listar")
        .then((response)=>{
          this.rutinas= response.data;
          this.codigo=null;
        })
        .catch((error)=>{
          console.error("Error al obtener rutinas: ", error);
        })
      },
      eliminar(value){
        this.codigo= value;
      axios
        .delete('http://localhost:8080/api/rutina/'+this.codigo)
        .then(()=>{
          console.log("rutina eliminado con exito");
          this.codigo=null;
          this.$emit('escuchartable');
          this.obtenerRutinas();                   
        })
        .catch((error)=>{
          console.log("Error al eliminar rutina", error);
        });
      },
      consultarbyId(value){
        if(this.codigo==null){
          this.actualizarDato6(value);
          this.$emit('ById',value);
        }
      },
      actualizar(value){
        this.codigo=value;
        this.$emit('change',this.codigo);
      },
      consultarbyName(value,numero){
        this.registrarRutina(value);
        this.actualizarDato8(numero);
      },
      limpiarId(){
        this.codigo=null;
      },
      callMetodoN(){
        if(this.retorno3=='retorno'){
          if(this.codigo==null){
            this.$router.push('planRutina');
          }
        }
        else if(this.retorno=='retorno'){
          if(this.codigo==null){
            this.limpiarEjercicio();
            this.limpiarArrayE();
            this.limpiarEjercicios();
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
      this.obtenerRutinas();
      this.formulario();
    },
  }
</script>