<template>
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
          <th>Acceder a ...</th>
          <th id="rigth">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr id="fila2" v-for="(item,index) in aprendices" :key=index @click=consultarbyId(item.codigo)>
          <td>Pendiente</td>
          <td>{{ item.persona.nombres}}</td>
          <td>{{ item.persona.apellidos}}</td>
          <td>{{ item.ficha.numero}}</td>
          <td>{{ item.ficha.formacion.nombre }}</td>
          <td>
            <button id="botonA" @click.stop="consultarItem1(item.codigo)">
              Antropometrico</button>
            <button id="botonB" @click.stop="consultarItem2(item.codigo)">
              Planes</button>
          </td>
          <td id="alibutton">
              <font-awesome-icon icon="edit" id="editar" @click="actualizar(item.codigo)"/>
              <font-awesome-icon icon="trash" id="eliminar" @click.stop="eliminar(item.persona?.codigo)"/>
          </td>            
        </tr>      
      </tbody>
    </table>
    </div>      
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed:{
      ...mapState('aprendiz',['aprendiz','aprendices']),
      ...mapState(['retorno']),
      },
  
  methods: {
      ...mapActions('persona',['eliminarPersona']),
      ...mapActions('aprendiz',['consultarAllAprendices','consultarAprendiz']),

      async eliminar(value){
        await this.eliminarPersona(value);
        await this.$nextTick();
        this.consultarAllAprendices();
      },

    consultarbyId(value){
      this.$emit('ById', value);
    },
    actualizar(value){  
      this.$emit('change', value);
    },
    async consultarItem1(value){
      await this.consultarAprendiz(value);
      await this.$nextTick();
      console.log('aprendiz: ', this.aprendiz.codigo);
      this.$router.push('fichaAntropometrica');
    },
    async consultarItem2(value){
      await this.consultarAprendiz(value);
      await this.$nextTick();
      this.$router.push('aprendizPlan');
    },

    formulario(){
      if(this.retorno =='retorno'){
        this.$emit('goForm');
      }
    },      
  },
  async mounted(){
    this.formulario();
    await this.consultarAllAprendices();
    await this.$nextTick();
    console.log('aprendices: ', this.aprendices);
  },
}
</script>