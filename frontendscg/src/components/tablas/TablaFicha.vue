<template>
    <!--Tabla que lista todos los registros de la entidad-->
    <div class="container2">
      <h1>Tabla  de fichas</h1>
      <div id="scroll">
        <table>
        <thead>
          <tr>
            <th>Ficha</th>
            <th>Formacion</th>
            <th id="rigth">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="ficha in fichas" :key="ficha.codigo" @click="() => {callMetodoN(); consultarbyId(ficha.codigo); consultarbyName(ficha.formacion.nombre,ficha.numero)}">
            <td>{{ ficha.numero }}</td>
            <td>{{ ficha.formacion.nombre }}</td>
            <td id="alibutton">
                <font-awesome-icon icon="edit" id="editar" @click="actualizar(ficha.codigo)"/>
                <font-awesome-icon icon="trash" id="eliminar" @click="eliminar(ficha.codigo)"/>
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
        fichas:[],
        codigo:null,
      }
    },
    computed:{...mapState(['retorno','retorno2'])},
    methods: {
      ...mapActions('ficha',['actionFicha','actionNumeroFi','actionNombreFo']),

      obtenerFichas(){
        // Método para obtener los campos de la lista
        axios.get("http://localhost:8080/api/ficha/listar")
        .then((response)=>{
          this.fichas= response.data;
          this.codigo=null;
        })
        .catch((error)=>{
          console.error("Error al obtener fichas: ", error);
        })
      },
      eliminar(value){
        this.codigo= value;
      axios
        .delete('http://localhost:8080/api/ficha/'+this.codigo)
        .then(()=>{
          console.log("ficha eliminado con exito");
          this.codigo=null;
          this.$emit('escuchartable');
          this.obtenerFichas();                   
        })
        .catch((error)=>{
          console.log("Error al eliminar ficha", error);
        });
      },
      consultarbyId(value){
        if(this.codigo==null){
          this.actionFicha(value);
          this.$emit('ById',value);
        }
      },
      actualizar(value){
        this.codigo=value;
        this.$emit('change',this.codigo);
      },
      consultarbyName(value,numero){
        this.actionNombreFo(value);
        this.actionNumeroFi(numero);
      },
      limpiarId(){
        this.codigo=null;
      },
      callMetodoN(){
        if(this.retorno=='retorno'){
          if(this.codigo==null){
            this.$router.push('aprendiz');
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
      this.obtenerFichas();
      this.formulario();
    },
  }
</script>