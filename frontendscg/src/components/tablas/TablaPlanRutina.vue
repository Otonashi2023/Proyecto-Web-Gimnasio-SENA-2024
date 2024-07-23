<template>
    <!--Tabla que lista todos los registros de la entidad-->
    <div class="container2">
      <h1>Tabla  de planes de entrenamiento</h1>
      <div id="scroll">
        <table>
        <thead>
          <tr>
            <th>Planes</th>
            <th>Meses</th>
            <th>Rutinas</th>
            <th id="rigth">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="plan_rutina in plan_rutinas" :key="plan_rutina.codigo" @click="consultarbyId(plan_rutina.codigo)">
            <td>{{ plan_rutina.plan.tipoPlan.nombre}}</td>
            <td>{{ plan_rutina.plan.meses }}</td>
            <td>{{ plan_rutina.rutina.tipoRutina.nombre }} {{ plan_rutina.rutina.numero }}</td>
            <td id="alibutton">
                <font-awesome-icon icon="edit" id="editar" @click="actualizar(plan_rutina.codigo)"/>
                <font-awesome-icon icon="trash" id="eliminar" @click="eliminar(plan_rutina.codigo)"/>
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
        plan_rutinas:[],
        codigo:null,
      }
    },
    computed:{...mapState(['retorno3'])},
  
    methods: {
      ...mapActions(['limpiarDatoact1']),
      obtenerPlanRutinas(){
        // Método para obtener los campos de la lista
        axios.get("http://localhost:8080/api/planrutina/listar")
        .then((response)=>{
          this.plan_rutinas= response.data;
          this.codigo=null;
        })
        .catch((error)=>{
          console.error("Error al obtener plan_rutina: ", error);
        })
      },
      eliminar(value){
        this.codigo= value;
      axios
        .delete('http://localhost:8080/api/planrutina/'+this.codigo)
        .then(()=>{
          console.log("plan_rutina eliminado con exito");
          this.codigo=null;
          this.$emit('escuchartable');
          this.obtenerPlanRutinas();                   
        })
        .catch((error)=>{
          console.log("Error al eliminar plan_rutina", error);
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
      },
      formulario(){
        if(this.retorno3=='retorno'){
          this.$emit('goForm');
        }
      },
    },
    mounted(){
      this.obtenerPlanRutinas();
      this.formulario();
    },
  }
  </script>