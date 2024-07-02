<template>
    <div class="view">
        <div class="components">
            <div id="up">
                <h1 id="alitext">"Aqui va un titulo del menu principal"</h1>
                <div id="alibutton">
                    <font-awesome-icon :icon="['fas', 'address-book']" id="agregar" v-if="listar" @click="add()"/>
                    <font-awesome-icon icon="circle-xmark" id="cerrar2" v-if="formulario" @click="salir"/>
                </div>
            </div>
            <div v-if="formulario"><FormEjercicio ref="componenteForm"/></div>
            <div v-if="listar"><TablaEjercicio @ById="idcodigo" @change="update"/></div>
        </div>
    </div>
</template>

<script>
import FormEjercicio from '@/components/FormEjercicio.vue'
import TablaEjercicio from '@/components/TablaEjercicio.vue'

export default{
    name:'NombreEjercicioView',
    components:{
        FormEjercicio,
        TablaEjercicio
    },

    data(){
        return{
            formulario:false,
            listar:true,
            valor: 1
        }
    },
    methods:{
        idcodigo(value){
            this.$refs.componenteForm.consultar(value);
        },
        update(){
            this.add();
        },
        add(){
            this.formulario=true;
            this.listar=false;
        },
        salir(){
            this.formulario=false;
            this.listar=true;
        }
    },
}
</script>