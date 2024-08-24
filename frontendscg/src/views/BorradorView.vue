<template>
    <input type="date" @change="cambio()" v-model="fecha">
    <input type="date" v-model="fechaFormattedDate">
    <button @click="cambio()">¡clik me!</button>
    <br>
{{ perimetros }}
<button @click="guardar()">Ver</button>
<button @click="pruebas()">Pruebas</button>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default{
    name:'BorradorView',
    data(){
        return{
            fecha: '', // Fecha seleccionada en el primer input
            fechaFormattedDate: '' // Fecha modificada que se mostrará en el segundo input
        }
    },

    computed:{
        ...mapState('perimetros',['perimetros']),
        ...mapState('usuario',['usuario','usuarios']),
        
    },
    methods:{
        ...mapActions('perimetros',['guardarPerimetros']),
        ...mapActions('usuario',['consultarAllUsuarios','consultarUsuario']),

    async pruebas(){
        console.log('inicializando pruebas');
        try{
            await this.consultarAllUsuarios();
            await this.consultarUsuario(3);
            await this.$nextTick();
            console.log('usuarios:', this.usuarios);
            console.log('usuario:',this.usuario);
        }catch(error){
            console.log('error: ', error);
        }

    },


cambio(){
    if(this.fecha != ""){
      let dataInput = this.fecha;
      let date = new Date(dataInput);
      let incrementoMes =3;
      let mesTotal = date.getMonth() + incrementoMes;

      if (mesTotal >= 12) {
        // Calcula el nuevo mes y ajusta el año
        const mes = mesTotal % 12;
        date.setMonth(mes);
        
        const yearTotal = date.getFullYear() + Math.floor(mesTotal / 12);
        date.setFullYear(yearTotal);
      } else {
        // Si no supera el año, solo ajusta el mes
        date.setMonth(mesTotal);
      }

      this.fechaFormattedDate = date.toISOString().split('T')[0];
      console.log('Fecha: ', this.fechaFormattedDate);
    }
    else{
        this.fehca = "";
        this.fechaFormattedDate = "";
    }

    },

        ajustar(){
      const fechaOriginal = new Date(this.fecha);
      fechaOriginal.setHours(0, 0, 0, 0);
      // Añadir 3 meses a la fecha original (puedes ajustar el número de meses según tus necesidades)
      fechaOriginal.setMonth(fechaOriginal.getMonth() + 1);
      
      // Convertir la fecha modificada a formato YYYY-MM-DD
      const year = fechaOriginal.getFullYear();
      const month = String(fechaOriginal.getMonth() + 1).padStart(2, '0'); // Meses en formato 01-12
      const day = String(fechaOriginal.getDate()).padStart(2, '0'); // Días en formato 01-31
      this.fechaModificada = `${year}-${month}-${day}`;
        },

        async guardar(){
            try{
                const data = {
                cabeza: 1,
                cuello: 2,
                brazoRelax: 3,
                brazoTenso: 4,
                antebrazo: 5,
                muñeca: 6,
                torax: 7,
                cintura: 8,
                cadera: 9,
                musloMax: 10,
                musloMin: 11,
                pantorrillaMax: 12,
                pantorrillaMin: 13,
                fichaantropo: 44,
            };
            await this.guardarPerimetros(data);
            await this.$nextTick();
            console.log('perimetros:', this.perimetros);

            } catch(error){
                console.error("Error al guardar aprendiz:", error);
            }
        }
    },
    mounted(){
        console.log('usuario: ', this.usuario);
    }
}
</script>