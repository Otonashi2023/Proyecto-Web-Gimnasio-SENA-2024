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
            <th style="text-align: center;">Rutinas</th>
            <th id="rigth">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="(item, index) in finalData" :key="index" @click="consultarbyId(item.plan.codigo)">
            <td>{{ item.plan.tipoPlan.nombre}}</td>
            <td>{{ item.plan.meses }}</td>
            <td style="width: 70%;">
              <tr class="head2">
                <td style="width:500px">Rutina</td>
                <td style="width:500px">Version</td>
              </tr>
              <tr v-for="(rutina, i) in item.rutinas" :key="i">
                <td id="space">{{ rutina.tipoRutina.nombre }}</td>
                <td id="space">{{ rutina.numero }}</td>
              </tr>
            </td>
            <td id="alibutton">
                <font-awesome-icon icon="edit" id="editar" @click="actualizar(item.plan.codigo)"/>
                <font-awesome-icon icon="trash" id="eliminar" @click="eliminar(item.plan.codigo)"/>
            </td>            
          </tr>      
        </tbody>
      </table>
      </div>      
    </div>
    <p>{{ capsula }}</p>
  </template>
  
  <script>
  import axios from "axios";
  import { mapActions, mapState } from "vuex";
  //contructor de las variables 
  export default {
    data(){
      return{
        finalData:[],
        codigo:null,
      }
    },
    computed:{...mapState(['retorno3', 'capsula'])},
  
    methods: {
      ...mapActions(['limpiarDatoact1']),

      obtenerPlanRutinas(){
        // Método para obtener los campos de la lista
        axios.get("http://localhost:8080/api/planrutina/listar")
        .then((response)=>{
          const data= response.data;
          if (Array.isArray(data)) {
            const jsonString=JSON.stringify(data,null,2);
            console.log('%c'+ jsonString, 'color:yellow; font-weigth:bold;');
            this.originalData = data; // Guardar los datos originales
            this.finalData = this.groupDataByName(data);
            console.log('Datos agrupados:', this.finalData);
          } else {
            console.error('La respuesta de la API no es un array:', data);
          }
          this.codigo=null;
        })
        .catch((error)=>{
          console.error("Error al obtener plan_rutina: ", error);
        })
      },
      groupDataByName(data) {
      const groupedData = data.reduce((acc, item) => {
        const key = `${item.plan.tipoPlan.nombre}_${item.plan.numero}`;
        if (!acc[key]) {
          acc[key] = { plan: item.plan, rutinas: [] };
        }
        acc[key].rutinas.push(item.rutina);
        return acc;
      }, {});
      return Object.values(groupedData);
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