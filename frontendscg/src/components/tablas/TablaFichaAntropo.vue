<template>
    <!--Tabla que lista todos los registros de la entidad-->
    <div class="containerT" id="scroll">
      <h1>Fichas Antropometricas</h1>
      <table>
        <thead>
          <tr>
            <th>Numero de control</th>
            <th>Fecha de toma</th>
            <th>Altura</th>
            <th>Peso</th>
            <th>IMC</th>
            <th>Estado</th>
            <th id="rigth">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="(item,index) in listaFiltrada" :key="index" @click="consultarbyId(item.codigo)">
            <td>{{ item.numControl }}</td>
            <td>{{ item.fecha }}</td>
            <td>{{ item.altura }} m</td>
            <td>{{ item.peso }} kg</td>
            <td>{{ item.imc }}</td>
            <td :style="evaluacion(item.imc).style">{{ evaluacion(item.imc).estado }}</td>
            <td id="alibutton">
                <font-awesome-icon icon="edit" id="editar" @click="actualizar(item.codigo)"/>
                <font-awesome-icon icon="trash" id="eliminar" @click.stop="eliminar(item.codigo)"/>
            </td>            
          </tr>      
        </tbody>
      </table>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
  export default {
    data(){
      return{
        listaFiltrada: [],
      }
    },
    computed:{
      ...mapState('aprendiz',['aprendiz']),
      ...mapState('fichaAntropometrica',['fichaAntropoAll']),
      ...mapState(['retorno','retorno3'])},
    methods: {
      ...mapActions('aprendiz',['consultarAprendiz']),
      ...mapActions('fichaAntropometrica',['consultarFichaAntropoAll','eliminarFichaAntropo']),

      async eliminar(value){
        try{
          await this.eliminarFichaAntropo(value);
          await this.$nextTick();
          console.log('numero de ficha eliminada: ', value)
          this.filtrarAprendiz();
          console.log('ficha filtrada: ',this.listaFiltrada);
        } catch(error){
          console.log(error);
        } 
      },
      async filtrarAprendiz(){
        await this.consultarFichaAntropoAll();
        await this.$nextTick();
        this.listaFiltrada = this.fichaAntropoAll
          .filter(item => item.aprendiz.codigo === this.aprendiz.codigo);
        console.log('fichaAll: ', this.fichaAntropoAll);
      },
      consultarbyId(value){
        this.$emit('ById', value, this.listaFiltrada);
      },
      actualizar(value){  
        this.$emit('change', value);
      },

      formulario(){
        if(this.retorno3 == 'retorno'){
          this.$emit('goForm');
        }
        else if( this.retorno == 'retorno'){
          this.$emit('irAform');
        }
      },
      evaluacion(value){
        const estadoStyle = {
          estado: '',
          style: {},
        };
        const indice = value;

        if(indice < 18.50  ){
          estadoStyle.estado = 'Bajo Peso';
          estadoStyle.style = {
            color: 'blue',
            fontWeight: '700'
          }
        }
        else if(indice >= 18.50 && indice < 25 ){
          estadoStyle.estado ='Peso Normal';
          estadoStyle.style = {
            color: 'green',
            fontWeight: '700'
          } 
        }
        else if(indice >= 25 && indice < 30 ){
          estadoStyle.estado = 'Sobrepeso';
          estadoStyle.style = {
            color: 'orange',
            fontWeight: '700'
          } 
        }
        else if(indice >= 30 && indice < 40 ){
          estadoStyle.estado = 'Obesidad';
          estadoStyle.style = {
            color: 'red',
            fontWeight: '700'
          }
        }
        else{
          estadoStyle.estado = 'Obesidad grave';
          estadoStyle.style = {
            color: 'darkred',
            fontWeight: '700'
          }
        }
        return estadoStyle;
      },
    },
    mounted(){
      this.formulario();
      this.filtrarAprendiz();
    },
  }
</script>