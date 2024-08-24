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
          <tr id="fila2" v-for="(item, index) in usuarios" :key="index" @click.stop="consultar(item.codigo)">
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
      ...mapState('usuario',['usuarios']),
      ...mapState(['retorno2']),
    },
    methods:{
      ...mapActions('usuario',['consultarAllUsuarios']),
      ...mapActions('persona',['eliminarPersona']),

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

      formulario(){
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