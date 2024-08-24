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
            <th id="rigth">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="(item, index) in aprendizPlanAll" :key="index">
            <td>{{ item.aprendiz.persona.nombres}}</td>
            <td>{{ item.aprendiz.persona.apellidos }}</td>
            <td>{{ item.inicio }}</td>
            <td>{{ item.finaliza }}</td>
            <td>{{ item.plan.tipoPlan.nombre }}</td>
            <td>{{ item.plan.meses }} meses</td>
            <td id="alibutton">
                <!--font-awesome-icon icon="edit" id="editar" @click="actualizar(item.rutina.codigo)"/-->
                <font-awesome-icon icon="trash" id="eliminar" @click.stop="removeAllByNombre(item.rutina.codigo)"/>
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
    computed:{
        ...mapState('aprendizPlan',['aprendizPlanAll']),
    },
    methods:{
        ...mapActions('aprendizPlan',['consultarAprendizPlanAll']),
    },
    mounted(){
        this.consultarAprendizPlanAll();
    }
}

</script>