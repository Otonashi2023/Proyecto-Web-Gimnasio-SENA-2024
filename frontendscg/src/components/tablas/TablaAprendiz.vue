<template>
    <div class="d-flex justify-content-between align-items-center mb-4" style="margin:20px;" >
            <!--h1>Aprendices</h1>
            <button class="btn btn-primary new"><i class="fas fa-user-plus"></i> Agregar nuevo Aprendiz</button-->
        </div>
        <!--div class="filter-container p-3 mb-4 rounded d-flex align-items-center bordered" style="max-width:fit-content" id="grid">
            <div class="d-flex align-items-center">
                < <i class="fas fa-filter mr-2"></i> >
                <span class="material-symbols-outlined">
                    pendiente el filtro
                    </span>
                <span style="border-color:black"><b></b></span>
            </div>
            <div class="filter-item d-flex ">
                <select class="form-control mr-2 selectt">
                    <option class="font-weight-bold" value="fecha"><b>Fecha</b></option>
                </select>
                <select class="form-control mr-2 selectt">
                    <option value="tipo"><b>Tipo</b></option>
                </select>
                <select class="form-control mr-2 selectt">
                    <option value="estado"><b>Estado</b></option>
                </select>
            </div>
            <div>
                <button class="btn btn-link text-danger font-weight-bold"><i class="fas fa-undo"></i> Resetear Filtro</button>
            </div>
        </div-->
    <!--Tabla que lista todos los registros de la entidad-->
    <div class="container2">
      <h1>Aprendices</h1>
      <div id="scroll">
        <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Ficha</th>
            <th>Formación</th>
            <th id="rigth">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="(item,index) in aprendices" :key=index>
            <td>Pendiente</td>
            <td>{{ item.persona.nombres}}</td>
            <td>{{ item.persona.apellidos}}</td>
            <td>{{ item.ficha.numero}}</td>
            <td>{{ item.ficha.formacion.nombre }}</td>
            <td id="alibutton">
                <font-awesome-icon icon="edit" id="editar" v-if="false" @click="actualizar(item.codigo)"/>
                <font-awesome-icon icon="trash" id="eliminar" v-if="false" @click="eliminar(item.codigo)"/>
            </td>            
          </tr>      
        </tbody>
      </table>
      </div>      
    </div>
</template>

<script>
//import '@/assets/css/1.css'
//import axios from "axios";
import { mapActions, mapState } from "vuex";
  //contructor de las variables 
  export default {
    data(){
      return{
        //ejercicios:[],
        codigo:null,
      }
    },
    computed:{
        ...mapState('aprendiz',['aprendices']),
        //...mapState(['retorno','retorno2','dato7'])
        },
    
    methods: {
        ...mapActions('aprendiz',['consultarAllAprendices',]),
        /*...mapActions(['actualizarDato7','registrarEjercicio']),

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
      },*/
    },
    mounted(){
      //this.obtenerEjercicios();
      //this.formulario();
      this.consultarAllAprendices();
    },
  }
</script>