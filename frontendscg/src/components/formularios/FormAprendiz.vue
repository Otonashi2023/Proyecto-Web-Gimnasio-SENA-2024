<template>
    <div class="container2" id="form">
      <h1>Formulario</h1>
      <form @submit.prevent="registrarPersona()" id="scroll3">
        
        <div class="comp-form-group">
          <div class="form-group">
            <label for="nombres">Nombres: </label>
            <input type="text" name="nombres" id="input2" v-model="nombres" placeholder="haz click para ingresar los nombres" required>
          </div>
          <div class="form-group">
            <label for="apellidos">Apellidos: </label>
            <input type="text" name="apellidos" id="input2" v-model="apellidos" placeholder="haz click para ingresar los apellidos" required>
          </div>
        </div>

        <div class="comp-form-group">
          <div class="form-group">
            <label for="">Tipo de documento: </label>
            <input type="text" name="documento" id="input2" v-model="nombreTipoDocumento" placeholder="haz click para ingresar el tipo de cedular" readonly>
          </div>
          <div class="form-group">
            <label for="cedula">Numero de cedula: </label>
            <input type="number" name="cedula" id="input2" required v-model="cedula" placeholder="ingrese el numero de cedula" >
          </div>
        </div>

        <div class="comp-form-group">
          <div class="form-group">
            <label for="celular">Celular:</label>
            <input type="number" name="celular" id="input2" required v-model="celular" placeholder="ingrese el numero de celular ">
          </div>
          <div class="form-group">
            <label for="contacto">Contacto:</label>
            <input type="text" name="contacto" id="input2" required v-model="contacto" placeholder="ingrese el nombre de contacto ">
          </div>
        </div>

        <div class="comp-form-group">
          <div class="form-group">
            <label for="celularAlt">Celular de contacto:</label>
            <input type="number" name="repeticiones" id="input2" required v-model="celularAlt" placeholder="ingrese el numero de celular alterno">
          </div>
          <div class="form-group">
            <label for="correo">Email:</label>
            <input type="adrees" name="descanso" id="input2" required v-model="correo" placeholder="ingrese el correo electrónico">
          </div>
        </div>

        <div class="comp-form-group">
          <div class="form-group">
            <label for="ficha">Ficha:</label>
            <input type="number" name="repeticiones" id="input2" required v-model="ficha" placeholder="ingrese el número de ficha">
          </div>
          <div class="form-group">
            <label for="formacion">Formacion:</label>
            <input type="adrees" name="descanso" id="input2" required v-model="formacion" placeholder="ingrese la formacion" readonly>
          </div>
        </div>

        <div class="comp-form-group">
          <div class="form-group">
            <label for="restricMedicas">Restricciones Medicas:</label>
            <input type="text" style="width:123vh;" name="restricMedicas" id="input2" required v-model="restricMedicas" placeholder="ingrese las restricciones médicas">
          </div>
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

export default{
    compute:{
        ...mapState('persona',['persona']),
        ...mapState('ficha',['ficha']),
        ...mapState('aprendiz,',['aprendiz']),
    },
    methods:{
        ...mapActions('persona',['guardarPersona']),
        ...mapActions('ficha',['actionFicha']),
        ...mapActions('aprendiz',['guardarAprendiz']),

        registrarPersona(){
            const data ={
                nombres: this.nombres,
                apellidos: this.apellidos,
                tipoDocumento: 1,
                cedula: this.cedula,
                celular: this.celular,
                contacto: this.contacto,
                celularAlt: this.celularAlt,
                correo: this.correo,
            };
            this.guardarPersona(data);
            console.log('pesona: ',JSON.stringify(this.persona,null,2));
        },
        registrarFicha(){
            const data = {
                numero: this.ficha.numero,
                formacion: this.ficha.formacion,
            };
            this.actionFicha(data);
        },
        registrarAprendiz(){
            const data = {
                restricMedicas: this.aprendiz.restricMedicas,
                persona: this.aprendiz.persona,
                ficha: this.aprendiz.ficha,
            }
            this.guardarAprendiz(data);
        }
    }
}
</script>
