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
            <input type="text" id="cep" name="cep" v-mask="['#####-###']" v-model="cep" @blur="searchCEP">
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

            <select name="estado" id="estado" v-model="estado">
              <option value="" selected disabled>Selecione o Estado</option>
              <option v-for="(valor, chave) in estadosBrasileiros" :key="chave" :value="chave" :selected="valor === estado">
              {{ valor }}
              </option>
            </select>


            <div class="input-errors" v-for="error of v$.estado.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>                  
          </div>            

            <button type="submit">Enviar</button>

        </form>
    </div>
    <div class="checkout__shoppingcart">
        <ShoppingCart :is-checkout="true">
          <template #content__footer>
            <h1>Footer Checkout</h1>
            <button @click="finalizarCompra">Finalizar compra!!</button>
          </template>
        </ShoppingCart>
    </div>
  </div>

   <BaseModal
    :visible="isModalVisible"
    title="Confirmação"
    cancelText="Não, voltar"
    confirmText="Sim, continuar"
    :onCancel="handleCancel"
    :onConfirm="handleConfirm"
    @update:visible="isModalVisible = $event"
  >
    <p>Deseja realmente continuar com esta ação?</p>
  </BaseModal>


</template>

<script>

import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { isValidCPF } from "../validators/custom-validators"; 
import {mask} from 'vue-the-mask';
import { estadosBrasileiros } from "../utils/estados-brasileiros";
import ShoppingCart from '@/components/cart/ShoppingCart.vue';
import BaseModal from '@/components/commons/BaseModal.vue';

export default {
  directives: {mask},
  components: {
    ShoppingCart,
    BaseModal
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      estadosBrasileiros: estadosBrasileiros,
      nome: '',
      cpf: '',
      celular: '',
      email: '',
      cep: '',
      endereco: '',
      cidade: '',
      estado: '',
      isModalVisible: false
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
      
    },    

    async searchCEP() {
      const cleanCEP = this.cep.replace('-','');
      const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
      if(!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }

      const data = await response.json();

      this.endereco = data.logradouro;
      this.cidade = data.localidade;
      this.estado = data.uf;

    },

    finalizarCompra() {
      this.isModalVisible = true;
    },

    handleCancel() {
        alert("CAncelar")
      },
      handleConfirm() {
        alert("Confirmar")
      }    

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

