<template>
  <div class="container" id="form">
    <h1>Formulario de Rutina de Entrenamiento</h1>
    <form @submit.prevent="servicio()">
      <div class="comp-form-group">
        <div class="form-group">
          <label for="rutina">Rutina: version {{ dato8 }}</label>
          <input type="text" @click="callMetodoR"  name="rutina" id="input2" v-model="rutina" placeholder="haz click para ingresar la rutina" readonly>
        </div>
        <div class="form-group">
          <label for="ejercicio">Ejercicio: </label>
          <input type="text" @click="callMetodoE" name="ejercicio" id="input2" v-model="ejercicio" placeholder="haz click para ingresar el ejercicio" readonly>
        </div>
        <div class="form-group">
          <div id="formbutton">
            <button id="guardar" type="submit" name="guardar" v-if="salvar">Guardar</button>
            <button id="guardar" type="submit" name="actulizar" v-if="modificar">Actualizar</button>
            <font-awesome-icon :icon="['fas', 'right-left']" id="cerrar3" v-if="modificar" @click="cerrar"/>
          </div>
        </div>
      </div>
    </form>
    <div class="container2" style="height: 40%;" v-if="tabla">
      <h1>Tabla  de ejercicios</h1>
      <div id="scroll2">
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
          <tr id="fila2" v-for="ejercicio in ejercicios" :key="ejercicio.codigo">
            <td>Pendiente</td>
            <td>{{ ejercicio.nombre.nombre }}</td>
            <td>{{ ejercicio.tipoEjercicio.nombre }}</td>
            <td>{{ ejercicio.musculo.nombre }}</td>
            <td>{{ ejercicio.series }}</td>
            <td>{{ ejercicio.repeticiones }}</td>
            <td>{{ ejercicio.descanso }} min</td>
            <td id="alibutton">
                <font-awesome-icon icon="trash" id="eliminar" @click="verificar(ejercicio.codigo)"/>
            </td>            
          </tr>      
        </tbody>
      </table>
      </div>      
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return{
      salvar: true,
      modificar: false,
      tabla: false,
      exerciseCodes: []
    };
  },

  computed:{
    ...mapState('variables',['ejercicios','arrayE','valor','datos']),
    ...mapGetters('variables',['getEjercicios']),
    ...mapState(['dato6','dato7','dato8','rutina','ejercicio','datoact1']),
  },
  //metodos CRUD
  methods:{
    ...mapActions('variables',['actionEjercicios','nuevoEjercicio','limpiarEjercicio','limpiarAccionar','quitarEjercicio',
      'actionArrayE', 'nuevoValor','limpiarArrayE', 'limpiarValor','quitarArrayE']),
    ...mapActions(['actualizarRetorno','actualizarDato6','registrarRutina','actualizarDato7','registrarEjercicio','actualizarDato8',
    'actualizarDatoact1','limpiarDatoact1','limpiarDato7']),
    servicio(){
      if(this.salvar==true){
        if(this.dato6!=null && this.arrayE.length > 0){
          this.guardar();
        }
        else{
          alert("hay campos vacios");
        }  
      }
      else {
        this.actualizar();       
      }
    },

    guardar(){
      for(const ejercicio of this.arrayE){
        this.actualizarDato7(ejercicio);
        console.log('Codigo del ejercicio = ',this.dato7);
        axios
        .post('http://localhost:8080/api/rutinaejercicio',{
          rutina: this.dato6,
          ejercicio: this.dato7,
        })
        .then((response)=>{
          console.log("Rutina de entrenamiento registrado con exito", response.data);
          this.$emit('leave');      
        })
        .catch((error)=>{
          console.error("Error al registrar rutina de entrenamiento:", error);
        });
      }
      alert("La rutina de entrenamiento es registrado con exito");
      this.limpiarArrayE();
    },

    /*consultar(value){
      this.codigo=value;
      axios
        .get('http://localhost:8080/api/rutinaejercicio/'+this.codigo)
        .then((response)=>{
          //actualiza los campos del formulario con los datos consultados
          this.actualizarDato6(response.data.rutina.codigo);
          this.registrarRutina(response.data.rutina.tipoRutina.nombre);
          this.actualizarDato7(response.data.ejercicio.codigo);
          this.registrarEjercicio(response.data.ejercicio.nombre.nombre);
          this.actualizarDato8(response.data.rutina.numero);
        })
        .catch((error) =>{
          console.error("Error al consultar rutina de entrenamiento: ", error);
        });
    },*/
    consultar(value1, value2) {
      this.actualizarDato6(value1);
      console.log('value2:',value2);
      // Filtramos las rutinas con el código especificado en la variable
      const filteredData = value2.filter(item => item.rutina.codigo === value1);
      const primerElemento = filteredData[0];
      const tipoRutinaNombre = primerElemento.rutina.tipoRutina.nombre;
      const rutinaNumero = primerElemento.rutina.numero;
      this.registrarRutina(tipoRutinaNombre);
      this.actualizarDato8(rutinaNumero);
      console.log(tipoRutinaNombre);

      // Si hay datos filtrados, extraemos los códigos de los ejercicios
      if (filteredData.length > 0) {
        // Asumimos que solo hay una rutina con el código dado, si no es así deberías ajustar este código
        const ejercicios = filteredData[0].ejercicios;
        this.exerciseCodes = ejercicios.map(ejercicio => ejercicio.codigo);
        this.agregarEjercicio();
      } else {
        this.exerciseCodes = [];
        console.log("No se encontraron ejercicios.");
      }
    },

    verificar(value){

      console.log('codigo-ejercicio: ',typeof value);
      this.datos;
      const jsonString = JSON.stringify(this.datos,null,2);
      console.log('%c' + jsonString, 'color: orange; font-weight: bold;');
      const existe = this.datos
        .filter(item => item.rutina.codigo === this.dato6 && item.ejercicio.codigo === value).map(item2 => item2.codigo);
      if(existe.length > 0){
        this.eliminarFila(existe,value);
      }
      else{
        this.quitarArrayE(value);
        this.quitarEjercicio(value);
        this.agregarEjercicio();
      }
    },
    eliminarFila(value1,value2){
      this.codigo=value1;
      axios
        .delete('http://localhost:8080/api/rutinaejercicio/'+this.codigo)
        .then(()=>{
          console.log("rutina_ejercicio eliminado con exito");
          this.codigo=null;   
          this.quitarEjercicio(value2);
          this.agregarEjercicio();
        })
        .catch((error)=>{
          console.log("Error al eliminar rutina_ejercicio", error);
          console.log('codigo=',this.codigo);
        });
    },

    /*actualizar(){
      this.codigo=this.datoact1;      
      axios
        .put('http://localhost:8080/api/rutinaejercicio/actualizar/'+this.codigo,{
          rutina: this.dato6,
          ejercicio: this.dato7,      
      })
      .then((response)=>{
        console.log("Rutina de entrenamiento actualizado con exito", response.data);
        this.$emit('leave');
        this.limpiarDatoact1();
      })
      .catch((error)=>{
        console.error("Error al actualizar la rutina de entrenamiento", error);
      });
    },*/

    //para llamar en una tabla los ejercicios que se agregaran a la rutina
    async agregarEjercicio() {
      if(this.dato6!=null){
        this.tabla=true;
        if(this.exerciseCodes.length > 0){
          this.exerciseCodes;
        }
        else{
          if(this.dato7!=null){
            this.comparando(this.dato7);
            if(this.dato7!=null){
              this.exerciseCodes.push(this.dato7);
              this.nuevoValor(this.dato7);
              this.actionArrayE();
            }
          }
        }
        if(this.exerciseCodes.length>0){

          
          for(const ejercicio of this.exerciseCodes){
            this.codigo=ejercicio;
            if(this.codigo){
              try{
              // Llamada a la API para obtener los detalles del ejercicio por el codigo
              const response = await axios.get('http://localhost:8080/api/ejercicio/'+this.codigo)
              this.nuevoEjercicio(response.data);
              this.actionEjercicios();
              this.limpiarDato7();
              } catch(error) {
                console.error('Error al obtener los detalles del ejercicio:', error);
              }
            }
          }
        }
        this.exerciseCodes=[];
      }
      else{
          this.tabla=false;
        }
    },

    comparando(value){
      console.log('datos',this.datos);
      if(this.datos.length > 0){
        const existe = this.datos
        .some(item => item.rutina.codigo === this.dato6 && item.ejercicio.codigo === value);
        console.log('1.existe:', existe);
        if(existe){
          this.actualizarDato7(null);
          alert('este ejercicio ya existe en la rutina');
        }
        else{          
          const existe = this.arrayE
          .some(item => item === value)
          console.log('2.existe:', existe);
          if(existe){
            this.actualizarDato7(null);
            alert('este ejercicio ya existe en la rutina');
          }
          else{
            this.actualizarDato7(value);
          }
        }
      }
      else{         
        const existe = this.arrayE
        .some(item => item === value)
        console.log('2.existe:', existe);
        if(existe){
          this.actualizarDato7(null);
          alert('este ejercicio ya existe en la rutina');
        }
        else{
          this.actualizarDato7(value);
        }
      }
    },

    read(value1, value2){
      this.limpiarDatoact1();
      this.consultar(value1,value2);
      //this.rotar();
    },
    /*update(value1, value2){
      this.consultar(value1, value2);
      const jsonString = JSON.stringify(this.datos,null,2);
      console.log('%c' + jsonString, 'color: yellow; font-weight: bold;');
      this.actualizarDatoact1(value1);
      this.variar();
    },

    clear(){
      this.rutina="";
      this.ejercicio="";
    },/*
    cerrar(){
      this.clear();
      this.rotar();
      this.limpiarDatoact1();
    },
    rotar(){
      this.modificar= false;
      this.salvar= true;
    },
    variar(){
      if(this.datoact1!=null){
      this.modificar=true;
      this.salvar=false;
      }
    },*/
    
    callMetodoR(){
      this.actualizarRetorno('retorno');
      this.$router.push('rutina');
    },
    callMetodoE(){
      if(this.rutina==""){
        alert("seleccione una rutina primero");
      }
      else{
        this.actualizarRetorno('retorno');
        this.$router.push('ejercicio');
      }
    },
  },
    mounted(){
      this.agregarEjercicio();
    }
}
</script>