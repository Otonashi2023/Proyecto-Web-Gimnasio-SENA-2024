<template>
    <div class="container" id="form">
      <h1>Formulario de Plan de Entrenamiento</h1>
      <form @submit.prevent="servicio()" >
        <div class="comp-form-group">
          <div class="form-group">
            <label for="plan">Plan: {{ dato9 }} meses</label>
            <input type="text" @click="callMetodoP"  name="plan" id="input2" v-model="plan" placeholder="haz click para ingresar el plan" readonly>
          </div>
          <div class="form-group">
            <label for="rutina">Rutina: version {{ dato8 }}</label>
            <input type="text" @click="callMetodoR" name="rutina" id="input2" v-model="rutina" placeholder="haz click para ingresar la rutina" readonly>
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
    </div>
  </template>
  
  <script>
  import { mapActions, mapState } from "vuex";
  import axios from "axios";
  export default {
    data() {
      return{
        salvar: true,
        modificar: false,
      };
    },
  
    computed:{
      ...mapState(['dato5','dato6','dato9','plan','rutina','datoact1', 'retorno3','dato8']),
    },
    //metodos CRUD
    methods:{
      ...mapActions(['actualizarRetorno3','actualizarDato5','registrarPlan','actualizarDato6','registrarRutina',
      'actualizarDato9','actualizarDatoact1','limpiarDatoact1','limpiarRetorno3','actualizarDato8']),
      servicio(){
        if(this.salvar==true){
          if(this.dato5!=null && this.dato6!=null){
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
        axios
        .post('http://localhost:8080/api/planrutina',{
            plan: this.dato5,
            rutina: this.dato6,
        })
        .then((response)=>{
          console.log("plan de entrenamiento registrado con exito", response.data);
          alert("El plan de entrenamiento es registrado con exito");
          this.$emit('leave');      
        })
        .catch((error)=>{
          console.error("Error al registrar plan de entrenamiento:", error);
        });
      },
  
      consultar(value){
        this.codigo=value;
        axios
          .get('http://localhost:8080/api/planrutina/'+this.codigo)
          .then((response)=>{
            //actualiza los campos del formulario con los datos consultados
            this.actualizarDato5(response.data.plan.codigo);
            this.registrarPlan(response.data.plan.tipoPlan.nombre);
            this.actualizarDato6(response.data.rutina.codigo);
            this.registrarRutina(response.data.rutina.tipoRutina.nombre);
            this.actualizarDato9(response.data.plan.meses );
            this.actualizarDato8(response.data.rutina.numero);
          })
          .catch((error) =>{
            console.error("Error al consultar plan de entrenamiento: ", error);
          });
      },
  
      actualizar(){
        this.codigo=this.datoact1;      
        axios
          .put('http://localhost:8080/api/planrutina/actualizar/'+this.codigo,{
            plan: this.dato5,
            rutina: this.dato6,      
        })
        .then((response)=>{
          console.log("Plan de entrenamiento actualizado con exito", response.data);
          this.$emit('leave');
          this.limpiarDatoact1();
        })
        .catch((error)=>{
          console.error("Error al actualizar la plan de entrenamiento", error);
        });
      },
      
      read(value){
        this.limpiarDatoact1();
        this.consultar(value);
        this.rotar();
      },
      update(value){
        this.consultar(value);
        this.actualizarDatoact1(value);
        this.variar();
      },
      clear(){
        this.plan="";
        this.rutina="";
      },
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

      },
      
      callMetodoP(){
        this.actualizarRetorno3('retorno');
        this.$router.push('plan');
        
      },
      callMetodoR(){
        this.actualizarRetorno3('retorno');
        this.$router.push('rutinaEjercicio');
      },
    },
  }
</script>