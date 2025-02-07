<template>
  <h1 class="page-title">Finalizar compra</h1>
  <div class="checkout-wrapper">
    <div class="checkout__form">
        <form  @submit.prevent="submitForm()">
          <div class="form-group w-full">
            <label for="nome">Nome <i class="mandatory">*</i></label>
            <input type="text" id="nome" name="nome" v-model="nome" placeholder="Digite seu nome completo">
            <div class="input-errors" v-for="error of v$.nome.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <div class="form-group">
            <label for="cpf">CPF <i class="mandatory">*</i></label>
            <input type="text" id="cpf" name="cpf" v-mask="['###.###.###-##']" v-model="cpf" placeholder="000.000.000-00">
            <div class="input-errors" v-if="v$.cpf.$errors.length">
              <div class="error-msg">{{  v$.cpf.$errors[0].$message }}</div>
            </div>
          </div>         
          
          <div class="form-group">
            <label for="celular">Celular <i class="mandatory">*</i></label>
            <input type="text" id="celular" name="celular" v-mask="['(##) #####-####']" v-model="celular" placeholder="(00) 00000-0000">
       
            <div class="input-errors" v-for="error of v$.celular.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>            
          </div>            
          
          <div class="form-group w-full">
            <label for="email">E-mail <i class="mandatory">*</i></label>
            <input type="text" id="email" name="email" v-model="email" placeholder="seuemail@exemplo.com.br">
            <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>    
          </div>          
          
          <div class="form-group">
            <label for="cep">CEP <i class="mandatory">*</i></label>
            <input type="text" id="cep" name="cep" v-mask="['#####-###']" v-model="cep" @blur="searchCEP" placeholder="00000-000">
            <div class="input-errors" v-for="error of v$.cep.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>               
          </div>   
          
          <div class="form-group">
            <label for="endereco">Endereço <i class="mandatory">*</i></label>
            <input type="text" id="endereco" name="endereco" v-model="endereco" placeholder="Rua, Avenida, Número">
            <div class="input-errors" v-for="error of v$.endereco.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>      
          </div>  
          
          <div class="form-group">
            <label for="cidade">Cidade <i class="mandatory">*</i></label>
            <input type="text" id="cidade" name="cidade" v-model="cidade" placeholder="Sua Cidade">
            <div class="input-errors" v-for="error of v$.cidade.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>      
          </div> 
          
          <div class="form-group">
            <label for="estado">Estado <i class="mandatory">*</i></label>
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

        </form>
    </div>
    <div class="checkout__shopping-cart">
        <ShoppingCart :is-sidebar="false">
          <template #content__footer>
            <div class="sidebar__footer">
              <p class="sidebar__total">Total <span class="total">{{ brCurrency(totalValue) }}</span></p>
              <button class="btn btn-secondary" @click="finalizarCompra">Finalizar compra</button>
            </div>
          </template>
        </ShoppingCart>
    </div>
  </div>

   <BaseModal
    :visible="isModalVisible"
    :title="`Obrigado, ${nome}!`"
    confirmText="Voltar para a Loja"
    :onConfirm="handleConfirm"
    @update:visible="isModalVisible = $event"
  >
    <p>Sua compra foi finalizada com sucesso</p>
  </BaseModal>


</template>

<script>
import { currencies } from "../mixins/currency-mixin";
import { cartTotal } from "@/mixins/cart-total-mixin";
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { isValidCPF } from "../validators/custom-validators"; 
import { mask } from 'vue-the-mask';
import { estadosBrasileiros } from "../utils/estados-brasileiros";
import ShoppingCart from '@/components/cart/ShoppingCart.vue';


export default {
  directives: { mask },
  mixins: [currencies, cartTotal],
  components: {
    ShoppingCart
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
        isValidCPF: helpers.withMessage('CPF inválido.', isValidCPF) 
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
        if(this.v$.$invalid) {
          return 
        }
        this.isModalVisible = true;
      }
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
      this.submitForm();
      
    },

    handleConfirm() {
      this.$router.push("/")
      this.$store.commit("EMPTY_SHOP_CART")
    }    

  }
}
</script>

<style scoped lang="scss">

  .checkout__shopping-cart {
    margin-top: 24px;
  }

  @media (min-width: 768px) {
    .checkout-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 64px;
      margin-top: 32px;
    }
  }

  form {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    width: 100%;
    
    .form-group {
      flex: 1;
      &.w-full {
        flex-basis: 100%;
        flex-grow: 0;
      }

    }
    button {
      margin-top: 24px;
    }
  }

  .sidebar__footer {
    padding-bottom: 20px;
  }

  .sidebar__total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    font-size: 18px;
  }

  .mandatory {
    color: red;
  }

</style>

