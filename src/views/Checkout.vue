<template>
  <h1>Finalizar compra</h1>
  <div class="checkout-wrapper">
    <div class="checkout__form">
        <form  @submit.prevent="submitForm()">
          <div class="form-group">
            <label for="nome">Nome</label>
            <input type="text" id="nome" name="nome" v-model="nome">
            <div class="input-errors" v-for="error of v$.nome.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <div class="form-group">
            <label for="cpf">CPF</label>
            <input type="text" id="cpf" name="cpf" v-mask="['###.###.###-##']" v-model="cpf">
            <div class="input-errors" v-for="error of v$.cpf.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>         
          
          <div class="form-group">
            <label for="celular">Celular</label>
            <input type="text" id="celular" name="celular" v-mask="['(##) #####-####']" v-model="celular">
       
            <div class="input-errors" v-for="error of v$.celular.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>            
          </div>            
          
          <div class="form-group">
            <label for="email">E-mail</label>
            <input type="text" id="email" name="email" v-model="email">
            <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>    
          </div>          
          
          <div class="form-group">
            <label for="cep">CEP</label>
            <input type="text" id="cep" name="cep" v-mask="['#####-###']" v-model="cep">
            <div class="input-errors" v-for="error of v$.cep.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>               
          </div>   
          
          <div class="form-group">
            <label for="endereco">Endereço</label>
            <input type="text" id="endereco" name="endereco" v-model="endereco">
            <div class="input-errors" v-for="error of v$.endereco.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>      
          </div>  
          
          <div class="form-group">
            <label for="cidade">Cidade</label>
            <input type="text" id="cidade" name="cidade" v-model="cidade">
            <div class="input-errors" v-for="error of v$.cidade.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>      
          </div> 
          
          <div class="form-group">
            <label for="estado">Estado</label>
            <input type="text" id="estado" name="estado" v-model="estado">
            <div class="input-errors" v-for="error of v$.estado.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>                  
          </div>            

            <button type="submit">Enviar</button>

        </form>
    </div>
    <div class="checkout__shopcart">
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
    </div>
  </div>
</template>

<script>

import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { isValidCPF } from "../validators/custom-validators"; 
import {mask} from 'vue-the-mask';
export default {
  directives: {mask},
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      nome: '',
      cpf: '',
      celular: '',
      email: '',
      cep: '',
      endereco: '',
      cidade: '',
      estado: ''
    }
  },
  validations () {
    return {
      nome: { 
        required: helpers.withMessage('O campo nome é obrigatório.', required),
        minLength: helpers.withMessage('O nome deve ter pelo menos 3 caracteres.', minLength(3)),
      }, 
      cpf: {
        required: helpers.withMessage('O campo CPF é obrigatório.', required),
        minLength: helpers.withMessage('O nome deve ter pelo menos 11 dígitos.', minLength(14)), //minLength considera caractéres de máscara
        isValidCPF 
      }, 
      celular: {
        required: helpers.withMessage('O campo celular é obrigatório.', required),
        minLength: helpers.withMessage('O nome deve ter pelo menos 9 dígitos.', minLength(15)), //minLength considera caractéres de máscara
      }, 
      email: { 
        required: helpers.withMessage('O campo e-mail é obrigatório.', required), 
        email: helpers.withMessage('Insira um e-mail válido.', email)
      }, 
      cep: {
        required: helpers.withMessage('O campo CEP é obrigatório.', required),
        minLength: helpers.withMessage('O nome deve ter pelo menos 5 dígitos.', minLength(6)),//minLength considera caractéres de máscara
      }, 
      endereco: {
        required: helpers.withMessage('O campo Endereço é obrigatório.', required)
      }, 
      cidade: {
        required: helpers.withMessage('O campo Cidade é obrigatório.', required)
      }, 
      estado: {
        required: helpers.withMessage('O campo Estado é obrigatório.', required)
      }, 
    }
  },
  methods: {
    
    submitForm() {
      if (this.v$.$validate()) {
        alert('Formulário inválido. Corrija os erros.');
        return;
      }
      alert('Formulário enviado com sucesso!');
      // Lógica para enviar o formulário
    },    
  }
}
</script>

<style scoped>
.checkout-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  margin-top: 32px;
}
</style>

