<template>
    <div class="container2" id="form">
      <h1>Ficha antropométrica</h1>
      <form @submit.prevent="registrarFichaAntropo" id="scroll4">
        <div class="comp-form-group">
          <div class="form-group">
            <label for="numControl">Numero de control: </label>
            <input type="number" name="numControl" id="input2" v-model="numControl" placeholder="ingrese el numero" required>
          </div>
          <div class="form-group">
            <label for="fecha">Fecha de toma: </label>
            <input type="date" name="fecha" id="input2" v-model="fecha" requerid>
          </div>
          <div class="form-group">
            <label for="descanso">Genero: </label>
            <input type="text" name="genero" id="input2" v-model="genero" placeholder="ingrese el genero" readonly disabled>
            </div>
          <div class="form-group">
            <label for="altura">Altura: </label>
            <input type="number" step="0.01" @input="result" name="altura" id="input2" v-model="altura" placeholder="ingrese la altura" required>
          </div>
          <div class="form-group">
            <label for="peso">Peso:</label>
            <input type="number" step="0.01" @input="result" name="peso" id="input2" v-model="peso" placeholder="ingrese el peso " required>
          </div>
          <div class="form-group">
            <label for="imc">IMC:</label>
            <input type="number" step="0.01"  name="imc" id="input2" v-model="imc" placeholder="has click para calcular" readonly>
          </div>
          <div>
            <div class="form-group">
              <label for="evaluador">Evaluador: </label>
              <input type="text" @click="callMetodoM" name="evaluador" id="input2" v-model="personal" placeholder="nombre del evaluador" readonly disabled>
            </div>
          </div>
        </div>

        <h1>Perimetros</h1>
        <div class="comp-form-group">
          <div class="form-group">
            <label for="cabeza">Cabeza: </label>
            <input type="number" step="0.01" name="cabeza" id="input2" v-model="cabeza" placeholder="ingrese medida" required>
          </div>
          <div class="form-group">
            <label for="cuello">Cuello: </label>
            <input type="number" step="0.01" name="cuello" id="input2" v-model="cuello" placeholder="ingrese medida" requerid>
          </div>
          <div class="form-group">
            <label for="brazoRelax">Brazo Relax: </label>
            <input type="number" step="0.01" name="brazoRelax" id="input2" v-model="brazoRelax" placeholder="ingrese medida" required>
            </div>
          <div class="form-group">
            <label for="brazoTenso">Brazo Tenso: </label>
            <input type="number" step="0.01" name="brazoTenso" id="input2" v-model="brazoTenso" placeholder="ingrese medida" required>
          </div>
          <div class="form-group">
            <label for="antebrazo">Antebrazo:</label>
            <input type="number" step="0.01" name="antebrazo" id="input2" v-model="antebrazo" placeholder="ingrese medida " required>
          </div>
          <div class="form-group">
            <label for="muñeca">Muñeca:</label>
            <input type="number" step="0.01" name="muñeca" id="input2" v-model="muñeca" placeholder="ingrese medida " required>
          </div>
          <div>
            <div class="form-group">
              <label for="torax">Torax: </label>
              <input type="number" step="0.01" name="torax" id="input2" v-model="torax" placeholder="ingrese medida" required>
            </div>
          </div>
          <div class="form-group">
            <label for="cintura">Cintura: </label>
            <input type="number" step="0.01" name="cintura" id="input2" v-model="cintura" placeholder="ingrese medida" required>
          </div>
          <div class="form-group">
            <label for="cadera">Cadera: </label>
            <input type="number" step="0.01" name="cadera" id="input2" v-model="cadera" placeholder="ingrese medida" required>
          </div>
          <div class="form-group">
            <label for="musloMax">Muslo Max: </label>
            <input type="number" step="0.01" name="musloMax" id="input2" v-model="musloMax" placeholder="ingrese medida" required>
            </div>
            <div class="form-group">
            <label for="musloMin">Muslo Min: </label>
            <input type="number" step="0.01" name="musloMin" id="input2" v-model="musloMin" placeholder="ingrese medida" required>
            </div>
          <div class="form-group">
            <label for="pantorrillaMax">Pantorrilla Max:</label>
            <input type="number" step="0.01" name="pantorrillaMax" id="input2" v-model="pantorrillaMax" placeholder="ingrese medida " required>
          </div>
          <div class="form-group">
            <label for="pantorrillaMin">Pantorrilla Min:</label>
            <input type="number" step="0.01" name="pantorrillaMin" id="input2" v-model="pantorrillaMin" placeholder="ingrese medida " required>
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
import { mapActions, mapGetters, mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return{
      imc:null,
      salvar: true,
      modificar: false,
    };
  },

  computed:{
    ...mapState('fichaAntropometrica',['fichaAntropo']),
    ...mapState('perimetros',['perimetros']),

    ...mapState(['dato','dato2','dato3','nombre','tipoEjercicio','musculo','retorno','datoact2','dato7']),...mapGetters(['getNombre','getTipoEjercicio','getMusculo']),
    ...mapGetters('datosEjercicio',['getSeries','getRepeticiones','getDescanso']),
  },
//metodos CRUD
  methods:{
    ...mapActions('fichaAntropometrica',['guardarFichaAntropo']),
    ...mapActions('perimetros',['guardarPerimetros']),

    ...mapActions(['actualizarDato7','actualizarRetorno2','actualizarDato','actualizarDato2','actualizarDato3','registrarNombre',
    'registrarTipoEjercicio','registrarMusculo','limpiarDatoact2','actualizarDatoact2','registrarEjercicio']),
    ...mapActions('datosEjercicio',['actualizarSeries','actualizarRepeticiones','actualizarDescanso']),

    result(){
      if(this.peso > 0 && this.altura > 0){
        this.imc = this.peso/(this.altura*this.altura);
        console.log('imc: ', this.imc);
      }
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
          genero: 1,
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
        this.$router.push('aprendizPlan');        
      } catch (error) {
        console.error("Error al guardar aprendiz:", error);
      }
    },
    
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
      this.clear();
      this.rotar();
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
    },
  },
}
</script>