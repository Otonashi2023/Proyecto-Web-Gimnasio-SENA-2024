<template>
    <!--Tabla que lista todos los registros de la entidad-->
  <div class="container2">
    <h1>planes de entrenamiento</h1>
    <div id="scroll">
      <table>
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Inicio</th>
            <th>Finaliza</th>
            <th>Plan de entrenamiento</th>
            <th>Tiempo</th>
            <th>Estado</th>
            <th>Ver</th>
            <th id="rigth">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="(item, index) in filtradoApPlan" :key="index" @click=consultarbyId(item.codigo)>
            <td>{{ item.aprendiz?.persona?.nombres}}</td>
            <td>{{ item.aprendiz?.persona?.apellidos }}</td>
            <td>{{ item.inicio }}</td>
            <td>{{ item.finaliza }}</td>
            <td>{{ item.plan.tipoPlan.nombre }}</td>
            <td>{{ item.plan.meses }} meses</td>
            <td style="color: red">pendiente</td>
            <td style="color: blueviolet" @click.stop="abrirModal(item.codigo)">ver Plan</td>
            <td id="alibutton">
                <font-awesome-icon icon="edit" id="editar" @click="actualizar(item.codigo)"/>
                <font-awesome-icon icon="trash" id="eliminar" @click.stop="eliminar(item.codigo)"/>
            </td>            
          </tr>      
        </tbody>
    </table>
    </div>      
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default{
  data(){
    return{
      filtradoApPlan: null,
    }
  },
    computed:{
      ...mapState('aprendiz',['aprendiz']),
      ...mapState('aprendizPlan',['aprendizPlan','aprendizPlanAll']),
      ...mapState(['retorno4']),
    },
    methods:{
      ...mapActions('aprendizPlan',['consultarAprendizPlanAll','consultarAprendizPlan','eliminarAprendizPlan']),
      
      async aprendizPlanFiltrado(){
        await this.consultarAprendizPlanAll();
        await this.$nextTick();
        this.filtradoApPlan = this.aprendizPlanAll
          .filter(item => item.aprendiz.codigo === this.aprendiz.codigo);
        console.log('filtradizApPlan: ',this.filtradoApPlan);
        console.log('aprendizPlanAll: ',this.aprendizPlanAll);
      },
      async eliminar(value){
        await this.eliminarAprendizPlan(value);
        await this.$nextTick();
        this.aprendizPlanFiltrado();
      },
      consultarbyId(value){
        this.$emit('ById', value, this.filtradoApPlan);
      },
      actualizar(value){  
        this.$emit('change', value);
      },
      formulario(){
        if(this.retorno4 =='retorno'){
          this.$emit('goForm');
        }
      },  
      async abrirModal(value){
        console.log('VALUE: ', value);
        await this.consultarAprendizPlan(value);
        await this.$nextTick();
        console.log('AQUI EN TABLA APRENDIZ_PLAN: ', this.aprendizPlan);
        const modal =true;
        this.$emit('verModal', modal);
      },
    },
    mounted(){
      this.formulario();
      this.aprendizPlanFiltrado();
    }
}

</script>