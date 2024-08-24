<template>
    <div class="container2" id="form">
      <h1>Asignación del plan de entrenamiento</h1>
      <form @submit.prevent="registrarAprendizPlan">
        <div class="comp-form-group2">
          <div class="form-group">
            <label for="aprendiz">Aprendiz: </label>
            <input type="number" name="aprendiz" id="input2" v-model="aprendiz" placeholder="ingrese el aprendiz" readonly disabled>
          </div>
          <div class="form-group">
            <label for="plan">Plan: </label>
            <input type="number" name="plan" id="input2" v-model="plan" placeholder="ingrese el plan" required>
          </div> 
          <div class="form-group">
            <label for="fecha">Fecha de inicio: </label>
            <input type="date" name="inicio" id="input2" v-model="inicio"  @change="tofinalizacion" required>
          </div>
          <div class="form-group">
            <label for="finaliza">fecha de finalización: </label>
            <input type="date" name="finaliza" id="input2" v-model="finaliza" readonly>
            </div> 
        </div>

        <div id="dist">
          <div></div>
          <div id="formbutton">
              <button id="guardar" type="submit" name="guardar" v-if="salvar">Guardar</button>
              <button id="guardar" type="submit" name="actulizar" v-if="modificar">Actualizar</button>
              <font-awesome-icon :icon="['fas', 'right-left']" id="cerrar3" v-if="modificar" @click="cerrar"/>
          </div>
          <div></div>
        </div> 
      </form>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return{
      inicio: '', // Fecha seleccionada en el primer input
      finaliza: '', // Fecha modificada que se mostrará en el segundo input
      salvar: true,
      modificar: false,
    };
  },

  computed:{
    ...mapState('aprendizPlan',['aprendizPlan']),
    ...mapState(['retorno','datoact2']),
  },
//metodos CRUD
  methods:{
    ...mapActions('aprendizPlan',['guardarAprendizPlan']),

    ...mapActions(['actualizarRetorno2','limpiarDatoact2','actualizarDatoact2']),

    tofinalizacion(){
      let dataInput = this.inicio;
      let dateInicio = new Date(dataInput);
      this.inicio= dateInicio.toISOString().split('T')[0];
      let date = new Date(dataInput);
      let incrementoMes =3;
      let mesTotal = date.getMonth() + incrementoMes;

      if (mesTotal >= 12) {
        // Calcula el nuevo mes y ajusta el año
        const mes = mesTotal % 12;
        date.setMonth(mes);        
        const yearTotal = date.getFullYear() + Math.floor(mesTotal / 12);
        date.setFullYear(yearTotal);
      } else {
        // Si no supera el año, solo ajusta el mes
        date.setMonth(mesTotal);
      }

      this.finaliza = date.toISOString().split('T')[0];
      console.log('Fecha: ', this.finaliza);
    },

    async registrarAprendizPlan(){
      try{
        const data ={
          inicio: this.inicio,
          finaliza:this.finaliza,
          aprendiz: this.aprendiz,
          plan: this.plan,          
        };
        console.log(data);
        console.log(this.aprendiz);
        await this.guardarAprendizPlan(data);
        await this.$nextTick();
        this.$emit('leave');
      } catch(error){
        console.error("Error al guardar aprendiz:", error);
      }
    },

    /*result(){
      this.imc = this.peso/(this.altura*this.altura);
      console.log('imc: ', this.imc);
    },
    
    async registrarFichaAntropo(){
      try {
        let dataInput = this.fecha;
        let date = new Date(dataInput);
        let formattedDate = date.toISOString().split('T')[0];

        const data ={
          numControl: this.numControl,
          fecha: formattedDate,
          altura: this.altura,
          peso: this.peso,
          imc: this.imc,
          personal: 1,
          genero: 2,
          aprendiz: 1,
        };
        await this.guardarFichaAntropo(data);
        await this.$nextTick();
        const fichaAntropoId = this.fichaAntropo.codigo;
        console.log('Codigo ficha:',this.fichaAntropo.codigo);
        console.log('Codigo ficha:', fichaAntropoId);

        const dataPerimetros = {
          cabeza: this.cabeza,
          cuello: this.cuello,
          brazoRelax: this.brazoRelax,
          brazoTenso: this.brazoTenso,
          antebrazo: this.antebrazo,
          muñeca: this.muñeca,
          torax: this.torax,
          cintura: this.cintura,
          cadera: this.cadera,
          musloMax: this.musloMax,
          musloMin: this.musloMin,
          pantorrillaMax: this.pantorrillaMax,
          pantorrillaMin: this.pantorrillaMin,
          fichaantropo: fichaAntropoId,
        };
        console.log("ficha antropometrica",this.fichaAntropo);
        console.log('PERIMETROS', dataPerimetros);
        await this.guardarPerimetros(dataPerimetros);
        await this.$nextTick();
        console.log('perimetros', this.perimetros);
        this.$router.push('FichaAntropometrica');        
      } catch (error) {
        console.error("Error al guardar aprendiz:", error);
      }
    },*/
    /*
    servicio(){
      if(this.salvar==true){
        if(this.dato!=null && this.dato2!=null && this.dato3!=null){
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
      .post('http://localhost:8080/api/ejercicio',{
        nombre: this.dato,
        tipoEjercicio: this.dato2,
        musculo: this.dato3,
        series: this.series,
        repeticiones: this.repeticiones,
        descanso: this.descanso,
      })
      .then((response)=>{
        console.log("Ejercicio registrado con exito", response.data);
        alert("El ejercicio es registrado con exito");
        this.$emit('leave');
        if(this.retorno=='retorno'){
          this.actualizarDato7(response.data.codigo);
          this.antesderoutear();
          this.$router.push('rutinaEjercicio');
        }           
      })
      .catch((error)=>{
        console.error("Error al registrar ejercicio:", error);
      });
    },

    consultar(value){
      this.codigo=value;
      axios
        .get('http://localhost:8080/api/ejercicio/'+this.codigo)
        .then((response)=>{
              //actualiza los campos del formulario con los datos consultados
          this.nombre = response.data.nombre.nombre;
          this.tipoEjercicio = response.data.tipoEjercicio.nombre;
          this.musculo = response.data.musculo.nombre;
          this.series = response.data.series;
          this.repeticiones = response.data.repeticiones;
          this.descanso = response.data.descanso;
          this.actualizarDato(response.data.nombre.codigo);
          this.actualizarDato2(response.data.tipoEjercicio.codigo);
          this.actualizarDato3(response.data.musculo.codigo);
          if(this.habilitar==1){
            this.registrarEjercicio(response.data.nombre.nombre);
          }
        })
        .catch((error) =>{
          console.error("Error al consultar ejercicio: ", error);
        });
    },

    actualizar(){
      this.codigo=this.datoact2;
      
      axios
        .put('http://localhost:8080/api/ejercicio/actualizar/'+this.codigo,{
          nombre: this.dato,
          tipoEjercicio: this.dato2,
          musculo: this.dato3,
          series: this.series,
          repeticiones: this.repeticiones,
          descanso: this.descanso,        
      })
      .then((response)=>{
        console.log("Ejercicio actualizado con exito", response.data);
        this.$emit('leave');
        if(this.retorno=='retorno'){
          this.actualizarDato7(this.codigo);
          this.antesderoutear();
          this.$router.push('rutinaEjercicio');
        }

      })
      .catch((error)=>{
        console.error("Error al actualizar el ejercicio", error);
      });
    },
    
    read(value){
      this.limpiarDatoact2();
      this.consultar(value);
      this.rotar();
    },
    update(value){
      this.consultar(value);
      this.actualizarDatoact2(value);
      this.variar();
    },
    clear(){
      this.nombre="";
      this.tipoEjercicio="";
      this.musculo="";
      this.series="";
      this.repeticiones="";
      this.descanso="";
    },
    cerrar(){
      //this.clear();
      //this.rotar();
      this.limpiarDatoact2();
    },
    rotar(){
      this.modificar= false;
      this.salvar= true;
    },
    variar(){
      if(this.datoact2!=null){
        this.modificar=true;
        this.salvar=false;
      }
      this.nombre=this.getNombre;
      this.tipoEjercicio=this.getTipoEjercicio;
      this.musculo=this.getMusculo;
      this.series=this.getSeries;
      this.repeticiones=this.getRepeticiones;
      this.descanso=this.getDescanso;
    },
    antesderoutear(){
      this.habilitar=1;
      this.consultar(this.dato7);
    },
    datos(){
      this.registrarNombre(this.nombre);
      this.registrarTipoEjercicio(this.tipoEjercicio);
      this.registrarMusculo(this.musculo);
      this.actualizarSeries(this.series);
      this.actualizarRepeticiones(this.repeticiones);
      this.actualizarDescanso(this.descanso);
    },

    callMetodoN(){
      this.datos();
      this.actualizarRetorno2('retorno');
      this.$router.push('nombreEjercicio');
    },
    callMetodoT(){
      this.datos();
      this.actualizarRetorno2('retorno');
      this.$router.push('tipoEjercicio');
    },
    callMetodoM(){
      this.datos();
      this.actualizarRetorno2('retorno');
      this.$router.push('musculo');
    },*/
  },
}
</script>