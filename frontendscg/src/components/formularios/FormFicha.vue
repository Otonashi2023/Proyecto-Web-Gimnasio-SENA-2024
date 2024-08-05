<template>
    <div class="container" id="form">
      <h1>Formulario de Ficha</h1>
      <form @submit.prevent="servicio()" >
        <div class="comp-form-group">
            <div class="form-group">
            <label for="ficha">Numero: </label>
            <input type="number" name="ficha" id="input2" v-model="numero" placeholder="haz click para ingresar el numero de ficha" required> 
          </div>
          <div class="form-group">
            <label for="nombre">Nombre: </label>
            <input type="text" @click="callMetodoN"  name="nombre" id="input2" v-model="nombre" placeholder="haz click para ingresar la formacion" readonly>
          </div>
          <div class="form-group">
            <div id="formbutton">
                <button id="guardar" type="submit" name="guardar" v-if="salvar">Guardar</button>
                <button id="guardar" type="submit" name="actulizar" v-if="modificar">Actualizar</button>
                <font-awesome-icon :icon="['fas', 'right-left']" id="cerrar3" v-if="modificar" @click="cerrar"/>
            </div>
          </div>
        </div>
      </form>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return{
      nombre:'',
      numero:'',
      salvar: true,
      modificar: false,
    };
  },

  computed:{
    ...mapState('ficha',['ficha','numeroFi','formacion','nombreFo']),
    ...mapState(['datoact1','datoact2','retorno']),
  },
  created(){
    if(this.datoact2!=null){
      this.numero=this.ficha;//pendiente
    }
    
  },
//metodos CRUD
  methods:{
    ...mapActions('ficha',['actionFicha','actionNumeroFi','actionFormacion','actionNombreFo']),
    ...mapActions(['actualizarRetorno2','limpiarDatoact2','actualizarDatoact2']),
    
    servicio(){
      if(this.salvar==true){
        if(this.formacion!=null && this.numero!=null){
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
      .post('http://localhost:8080/api/ficha',{
        numero:this.numero,
        formacion: this.formacion,
      })
      .then((response)=>{
        console.log("Ficha registrado con exito", response.data);
        alert("La ficha es registrado con exito");
        this.$emit('leave');
        if(this.retorno=='retorno'){
          this.actionFicha(response.data.codigo);
          this.antesderoutear();
          this.$router.push('aprendiz');
        }
      })
      .catch((error)=>{
        console.error("Error al registrar ficha:", error);
      });
    },

    consultar(value){
      this.codigo=value;
      axios
        .get('http://localhost:8080/api/ficha/'+this.codigo)
        .then((response)=>{
          //actualiza los campos del formulario con los datos consultados
          this.numero=response.data.numero;
          this.nombre=response.data.formacion.nombre;
          this.actionFormacion(response.data.formacion.codigo);
          if(this.habilitar==1){
            this.actionNumeroFi(response.data.numero);
            this.actionNombreFo(response.data.formacion.nombre);
          }
        })
        .catch((error) =>{
          console.error("Error al consultar ficha: ", error);
        });
    },

    actualizar(){
      this.codigo=this.datoact2;
      axios
        .put('http://localhost:8080/api/ficha/actualizar/'+this.codigo,{
          numero: this.numero,
          formacion: this.formacion,
      })
      .then((response)=>{
        console.log("Ficha actualizado con exito", response.data);
        this.$emit('leave');
        if(this.retorno=='retorno'){
          this.actionFicha(this.codigo);
          this.antesderoutear();
          this.$router.push('aprendiz');
        }
        this.limpiarDatoact2();
      })
      .catch((error)=>{
        console.error("Error al actualizar la ficha", error);
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
      this.numero="";
      this.nombre="";
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
      this.numero=this.numeroFi;
      this.nombre=this.nombreFo;
    },
    antesderoutear(){
      this.habilitar=1;
      this.consultar(this.ficha);
    },
    datos(){
      this.actionNumeroFi(this.numero);
    },

    callMetodoN(){
      this.datos();
      this.actualizarRetorno2('retorno');
      this.$router.push('formacion');
    },
  },
}
</script>