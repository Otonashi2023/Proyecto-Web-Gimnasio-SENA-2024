<template>
    <div class="container2" id="form">
      <h1>Ficha antropométrica</h1>
      <form @submit.prevent="comparar" id="scroll">
        <div class="comp-form-group">
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
            <input type="number" step="0.01"  name="imc" id="input2" v-model="imc" placeholder="ingresar altura y peso" readonly>
          </div>
          <div class="form-group">
            <label for="numControl">Numero de control: </label>
            <input type="number" name="numControl" id="input2" v-model="numControl" placeholder="ingrese altura y peso" readonly>
          </div>
          <div class="form-group">
            <label for="fecha">Fecha de toma: </label>
            <input type="date" name="fecha" id="input2" v-model="fecha" required>
          </div>
          <div class="form-group">
            <label for="descanso">Genero: </label>
            <input type="text" name="genero" @click="callMetodoG" id="input2" v-model="vgenero" placeholder="ingrese el genero" readonly>
            </div>
          <div>
            <div class="form-group">
              <label for="evaluador">Evaluador: </label>
              <input type="text" @click="callMetodoP" name="evaluador" id="input2" v-model="vpersonal" placeholder="nombre del evaluador" readonly>
            </div>
          </div>
          <div></div>
          <div><br><br><span>Estado: </span> <span :style="styleObject">{{ estado }}</span></div>
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
import { mapActions, mapState } from 'vuex';

export default{
  data(){
    return{
      numControl: null,
      fecha: null,
      vgenero: '',
      altura: null,
      peso: null,
      imc: null,
      vpersonal: '',

      cabeza: null,
      cuello: null,
      brazoRelax: null,
      brazoTenso: null,
      antebrazo: null,
      muñeca: null,
      torax: null,
      cintura: null,
      cadera: null,
      musloMax: null,
      musloMin: null,
      pantorrillaMax: null,
      pantorrillaMin: null,

      salvar: true,
      modificar: false,

      colorStyle: '' ,
      valor: null,
    }
  },
  computed:{
    ...mapState('aprendiz',['aprendiz']),
    ...mapState('personal',['personal']),
    ...mapState('genero',['genero']),
    ...mapState('fichaAntropometrica',['fichaAntropo','fichaAntropoAll','estado']),
    ...mapState('perimetros',['perimetros','perimetrosAll']),
    ...mapState(['datoact1']),
  },
  methods:{
    ...mapActions('aprendiz',['consultarAprendiz']),
    ...mapActions('personal',['consultarPersonal']),
    ...mapActions('genero',['consultarGenero']),
    ...mapActions('fichaAntropometrica',['guardarFichaAntropo','consultarFichaAntropo','consultarFichaAntropoAll','addFichaantropo',
      'limpiarCodigoFichaantropo','actualizarFichaAntropo','addEstado','limpiarEstado']),
    ...mapActions('perimetros',['guardarPerimetros','consultarPerimetros','consultarPerimetrosAll','addPerimetros','limpiarCodigoPerimetros',
      'actualizarPerimetros']),
    ...mapActions(['actualizarRetorno3','actualizarDatoact1','limpiarDatoact1']),

    cargarDatos(){
      this.numControl = this.fichaAntropo.numControl;
      this.fecha = this.fichaAntropo.fecha;
      this.vgenero = this.genero.nombre;
      this.altura = this.fichaAntropo.altura;
      this.peso = this.fichaAntropo.peso;
      this.imc = this.fichaAntropo.imc;
      this.vpersonal = this.personal?.persona?.nombres;

      this.cabeza = this.perimetros?.cabeza;
      this.cuello = this.perimetros?.cuello;
      this.brazoRelax = this.perimetros?.brazoRelax;
      this.brazoTenso = this.perimetros?.brazoTenso;
      this.antebrazo = this.perimetros?.antebrazo;
      this.muñeca = this.perimetros?.muñeca;
      this.torax = this.perimetros?.torax;
      this.cintura = this.perimetros?.cintura;
      this.cadera = this.perimetros?.cadera;
      this.musloMax = this.perimetros?.musloMax;
      this.musloMin = this.perimetros?.musloMin;
      this.pantorrillaMax = this.perimetros?.pantorrillaMax;
      this.pantorrillaMin = this.perimetros?.pantorrillaMin;
      this.evaluacion();
    },

    datosAntropometricos(){
      if(this.fecha == null){
        this.formattedDate = null;
      } else{
        let date = new Date(this.fecha);
      this. formattedDate = date.toISOString().split('T')[0];
      console.log('DATE:', this.formattedDate);
      }
      this.data = {
        codigo: this.fichaAntropo?.codigo,
        numControl: this.numControl,
        fecha: this.formattedDate,
        altura: this.altura,
        peso: this.peso,
        imc: this.imc,
        personal: this.personal?.codigo,
        genero: this.genero?.codigo,
        aprendiz: this.aprendiz?.codigo,
      };
    },
    datosPerimetricos(idFichaAntropo){
      console.log('ID Ficha Antropo: ', idFichaAntropo);
      this.dataPerimetros = {
        codigo: this.perimetros?.codigo,
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
        fichaantropo: idFichaAntropo,
      };
      console.log('ESTA EL ID?: ',this.perimetros);
    },

    result(){
      console.log('actualizar: ',this.datoact1);
      if(this.datoact1 == null){
        this.numeroMaximo();
        this.setCurrentDate();
        this.fecha = this.currentDate;
      }
      if(this.peso > 0 && this.altura > 0){
        this.imc = (this.peso/(this.altura*this.altura)).toFixed(2);
        console.log('imc: ', this.imc);
        this.evaluacion();
      } else{
        this.imc =null;
        this.evaluacion();
      }
    },

    setCurrentDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      this.currentDate = `${year}-${month}-${day}`;
    },

    numeroMaximo(){
      const aprendizFiltrados = this.fichaAntropoAll
        .filter(item => item.aprendiz.codigo === this.aprendiz.codigo);

      const numeros = aprendizFiltrados
        .filter(item => item.numControl !== null && item.numControl !== undefined)
        .map(item => item.numControl);

      if (numeros.length > 0) {
        this.maxNumero = Math.max(...numeros);
        this.numControl = this.maxNumero + 1;
      } else {
        this.numControl = 1;
      }

      console.log('Longitud de numeros: ', numeros.length);
      console.log('Numero de control: ', this.numControl);
    },
    date(value){
      let date = new Date(value);
      this. formattedDate = date.toISOString().split('T')[0];
      console.log('date', this.formattedDate);
    },
    servicio(){
      if(this.salvar==true){
        if(this.genero.codigo != null && this.personal.codigo != null){
          this.registrarFichaAntropometrica();
        }
        else{
          alert("hay campos vacios");
        }  
      }
      else{
        this.modificarFichaAntropometrica();
      }
    },

    comparar(){
      const aprendizFiltrados = this.fichaAntropoAll
        .filter(item => item.aprendiz.codigo === this.aprendiz.codigo);

      const found = aprendizFiltrados.some(item => item.numControl === this.numControl);

      if(!found){
        this.servicio();
      } else{
        alert('actualizar:'+this.datoact1);
        if(this.datoact1 != null){
          this.servicio();
        } else{
          alert('Esta Ficha Antropométrica ya existe');
        }
      }
    },

    async registrarFichaAntropometrica(){
      await this.limpiarCodigoFichaantropo();
      await this.limpiarCodigoPerimetros();
      await this.$nextTick();

      try{
        this.datosAntropometricos();
        await this.guardarFichaAntropo(this.data);
        await this.$nextTick();
        console.log('FICHAANTROPO: ',this.fichaAntropo);
        const idFichaAntropo = this.fichaAntropo.codigo;
        console.log('idFichaantropo: ',idFichaAntropo);

        this.datosPerimetricos(idFichaAntropo)
        console.log('DATA PERIMETROS: ',this.dataPerimetros);
        await this.guardarPerimetros(this.dataPerimetros);
        await this.$nextTick();
        console.log('perimetros antropometricos: ', this.perimetros);

        this.$emit('leave');
      }catch (error) {
        console.error("Error al guardar la ficha Antropometrica:", error);
      }
    },

    async modificarFichaAntropometrica(){
      try{
        this.datosAntropometricos();
        const idFichaAntropo = this.fichaAntropo?.codigo;
        await this.actualizarFichaAntropo({codigo: idFichaAntropo, data: this.data});
        await this.$nextTick();
        console.log('FICHAANTROPO: ',this.fichaAntropo);
        console.log('idFichaantropo: ',idFichaAntropo);

        this.datosPerimetricos(idFichaAntropo)
        console.log('DATA PERIMETROS: ',this.dataPerimetros);
        const idPerimetros = this.perimetros?.codigo;
        console.log('ID_PERIMETROS: ',this.perimetros);
        await this.actualizarPerimetros({codigo: idPerimetros, data: this.dataPerimetros});
        await this.$nextTick();
        this.limpiarDatoact1();
        await this.$nextTick();
        console.log('perimetros antropometricos: ', this.perimetros);

        this.salir();
      }catch (error) {
        console.error("Error al actualizar la ficha Antropometrica:", error);
      }
    },
    salir(){
      if(this.datoact1 == null){
        console.log('actualizar: ',this.datoact1);
        this.$emit('leave');
      }
    },

    async read(value){
      await this.consultarPerimetrosAll();
      console.log('PERIMETROS ALL: ', this.perimetrosAll);
      console.log('VALUE: ', value);
      const idPerimetros = this.perimetrosAll.filter(item => item.fichaantropo.codigo === value).map(item => item.codigo);
      console.log('idPerimetros: ', idPerimetros);
      await this.consultarPerimetros(idPerimetros);
      console.log('perimetros: ', this.perimetros);
      await this.consultarFichaAntropo(value);
      await this.consultarPersonal(this.fichaAntropo.personal.codigo);
      await this.consultarGenero(this.fichaAntropo.genero.codigo);
      await this.$nextTick();
      this.cargarDatos();
    },
    update(value){
      this.actualizarDatoact1(value);
      this.variar();
    },
    cerrar(){
      this.salvar = true;
      this.modificar = false;
      this.numeroMaximo();
      this.limpiarDatoact1();
    },
    variar(){
      if(this.datoact1 != null){
        this.modificar = true;
        this.salvar = false;
      }
    },
    evaluacion(value){
      if(value){
        this.valor = value;
      } else{
        this.valor = this.imc;
      }
      const indice = this.valor;

      if(indice == null){
        this.limpiarEstado();
      }
      else if(indice < 18.50  ){
        this.addEstado('Bajo Peso');
        this.styleObject = {
          color: 'blue',
          fontWeight: '700'
        }
      }
      else if(indice >= 18.50 && indice < 25 ){
        this.addEstado('Peso Normal');
        this.styleObject = {
          color: 'green',
          fontWeight: '700'
        } 
      }
      else if(indice >= 25 && indice < 30 ){
        this.addEstado('Sobrepeso');
        this.styleObject = {
          color: 'orange',
          fontWeight: '700'
        } 
      }
      else if(indice >= 30 && indice < 40 ){
        this.addEstado('Obesidad');
        this.styleObject = {
          color: 'red',
          fontWeight: '700'
        }
      }
      else if(indice > 40 ){
        this.addEstado('Obesidad grave');
        this.styleObject = {
          color: 'darkred',
          fontWeight: '700'
        }
      }
    },

    storageTemporal(){
      this.datosAntropometricos(); 
      this.addFichaantropo(this.data);
      console.log('el data es: ', this.data);
      this.datosPerimetricos()
      this.addPerimetros(this.dataPerimetros);
      console.log('el data Perimetros es: ', this.dataPerimetros)
    },

    callMetodoG(){
      console.log('verificando:', this.fecha);    
      this.storageTemporal();
      this.actualizarRetorno3('retorno');
      this.$router.push('genero');
    },
    callMetodoP(){
      this.storageTemporal();
      this.actualizarRetorno3('retorno');
      this.$router.push('personal');
    },
  },
  mounted(){
    this.cargarDatos();
    this.limpiarEstado();
  }
}
</script>