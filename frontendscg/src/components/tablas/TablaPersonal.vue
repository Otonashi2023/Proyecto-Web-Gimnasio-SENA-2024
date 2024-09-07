<template>
    <!--Tabla que lista todos los registros de la entidad-->
  <div class="container2">
    <h1>lista funcionarios</h1>
    <div id="scroll">
      <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>cedula</th>
            <th>cargo</th>
            <th>Telefono</th>
            <th>Correo</th>
            <th>Rol</th>
            <th id="rigth">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="(item, index) in usuarios" :key="index" @click="() => {callMetodoP(item.personal.codigo); consultar(item.codigo);}">
            <td>pendiente</td>
            <td>{{ item.personal.persona.nombres}}</td>
            <td>{{ item.personal.persona.apellidos }}</td>
            <td>{{ item.personal.persona.cedula }}</td>
            <td>{{ item.personal.cargo.nombre }}</td>
            <td>{{ item.personal.persona.celular }}</td>
            <td>{{ item.personal.persona.correo }}</td>
            <td>{{ item.personal.cargo.nombre }}</td>
            <td id="alibutton">
                <font-awesome-icon icon="edit" id="editar" @click="actualizar($event, item.codigo)"/>
                <font-awesome-icon icon="trash" id="eliminar" @click="eliminar($event, item.personal?.persona?.codigo)"/>
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
      ...mapState('personal',['personal']),
      ...mapState('usuario',['usuarios']),
      ...mapState(['retorno2','retorno3']),
    },
    methods:{
      ...mapActions('persona',['eliminarPersona']),
      ...mapActions('personal',['consultarPersonal']),
      ...mapActions('usuario',['consultarAllUsuarios']),

      async eliminar(event, value){
        event.stopPropagation();
        await this.eliminarPersona(value);
        this.consultarAllUsuarios();
      },

      actualizar(event, value){
        event.stopPropagation();
        this.$emit('change',value);
      },

      consultar(value){
        this.$emit('ById', value);
      },

      async callMetodoP(value){
      if(this.retorno3=='retorno'){
        if(this.codigo==null){
          await this.consultarPersonal(value);
          await this.$nextTick();
          console.log('Personal detalles: ', this.personal);
          this.$router.push('fichaAntropometrica');
        }
      }
    },

      formulario(){
        console.log('aqui en tabla personal', this.retorno2);
        if(this.retorno2=='retorno'){
          this.$emit('goForm');
        }
      },
    },
    mounted(){
        this.consultarAllUsuarios();
        this.formulario();
    }
}

</script>