<template>
  <div class="container2" id="form">
    <div style="display:grid;grid-template-columns: 1fr 1fr 1fr; height: 60px; padding:0; margin:0px;">
    <div></div>
    <div style="padding: 0px; margin: 0px;"><h1>Datos personales</h1></div>
    
  </div>
    <form @submit.prevent="registrarAprendiz()" id="scroll3">
      
      <div class="comp-form-group2">
        <div class="form-group">
          <label for="nombres">Nombres: </label>
          <input type="text" name="nombres" id="input2" v-model="nombres" placeholder="haz click para ingresar los nombres" required>
        </div>
        <div class="form-group">
          <label for="apellidos">Apellidos: </label>
          <input type="text" name="apellidos" id="input2" v-model="apellidos" placeholder="haz click para ingresar los apellidos" required>
        </div>
        <div class="form-group">
          <label for="">Tipo de documento: </label>
          <input type="text" name="documento" id="input2" v-model="nombreTipoDocumento" placeholder="haz click para ingresar el tipo de documento" readonly disabled>
        </div>
        <div class="form-group">
          <label for="cedula">Numero de cedula: </label>
          <input type="number" name="cedula" id="input2"  v-model="cedula" placeholder="ingrese el numero de cedula" required>
        </div>
        <div class="form-group">
          <label for="celular">Celular:</label>
          <input type="number" name="celular" id="input2"  v-model="celular" placeholder="ingrese el numero de celular " required>
        </div>
        <div class="form-group">
          <label for="contacto">Contacto:</label>
          <input type="text" name="contacto" id="input2"  v-model="contacto" placeholder="ingrese el nombre de contacto " required>
        </div>
        <div class="form-group">
          <label for="celularAlt">Celular de contacto:</label>
          <input type="number" name="repeticiones" id="input2" v-model="celularAlt" placeholder="ingrese el numero de celular alterno" required>
        </div>
        <div class="form-group">
          <label for="correo">Email:</label>
          <input type="adrees" name="descanso" id="input2" v-model="correo" placeholder="ingrese el correo electrónico" required>
        </div>
        <div class="form-group">
          <label for="ficha">Ficha:</label>
          <input type="number" name="repeticiones" id="input2"  v-model="ficha" placeholder="ingrese el número de ficha" readonly disabled>
        </div>
        <div class="form-group">
          <label for="formacion">Formacion:</label>
          <input type="text" name="descanso" id="input2" v-model="formacion" placeholder="ingrese la formacion" readonly disabled>
        </div>
        <div class="form-group">
          <label for="restricMedicas">Restricciones Medicas:</label>
          <input type="text" name="restricMedicas" id="input2"  v-model="restricMedicas" placeholder="ingrese las restricciones médicas" required>
        </div>
      </div>

      <div class="comp-form-group">
        
      </div>
      <div id="dist">
        <div></div>
        <div id="formbutton">
          <button type="submit">Siguiente</button>
            <!--button id="guardar" type="submit" name="guardar" v-if="salvar">Guardar</button>
            <button id="guardar" type="submit" name="actulizar" v-if="modificar">Actualizar</button>
            <font-awesome-icon :icon="['fas', 'right-left']" id="cerrar3" v-if="modificar" @click="cerrar"/-->
        </div>
        <div></div>
      </div> 
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed:{
    ...mapState('persona',['persona']),
    ...mapState('ficha',['ficha']),
    ...mapState('aprendiz',['aprendiz']),
  },
  methods:{
    ...mapActions('persona',['guardarPersona','limpiarPersona']),
    ...mapActions('ficha',['guardarFicha']),
    ...mapActions('aprendiz',['guardarAprendiz','limpiarAprendiz']),

   async registrarAprendiz(){
      try {
        const data ={
          nombres: this.nombres,
          apellidos: this.apellidos,
          cedula: this.cedula,
          celular: this.celular,
          contacto: this.contacto,
          celularAlt: this.celularAlt,
          correo: this.correo,
          tipoDocumento: 1,
        };
        await this.guardarPersona(data);
        await this.$nextTick();
        const personaId = this.persona.codigo;
        console.log('pesona: ',this.persona);

        const dataAprendiz = {
          restricMedicas: this.restricMedicas,
          persona: personaId,
          ficha: 1,
        };
        await this.guardarAprendiz(dataAprendiz);
        await this.$nextTick();
        this.limpiarAprendiz();
        this.limpiarPersona();
        console.log('persona: ',this.persona);
        console.log('aprendiz' ,this.aprendiz);
        this.$router.push('fichaAntropometrica');
      } catch (error) {
        console.error("Error al guardar aprendiz:", error);
      }
    },
  },
}
</script>