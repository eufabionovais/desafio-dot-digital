<template>

    <header class="sidebar__header"  v-if="isSidebar">
      <div class="sidebar__header-content">
        
          <h3 class="sidebar__title">Meu carrinho</h3>
          <BaseTooltip label="Esvaziar carrinho" v-if="shopCart.length">
            <button class="btn" type="button" @click="emptyShopCart()" aria-label="Esvaziar carrinho"><v-icon name="bi-cart-x" scale="1.3" fill="#fff"  /></button>
          </BaseTooltip>
        
          <BaseTooltip label="Fechar" style="margin-left: auto">
            <button  class="btn btn-close" @click="toggleSidebar(false)" aria-label="Fechar carrinho"><v-icon name="bi-arrow-right" /></button>
          </BaseTooltip>
      </div>
    </header>
    <div class="sidebar__content" :class="[{'is-checkout-page': !isSidebar}]">
      <table class="sidebar__table" v-if="shopCart.length">
        <thead v-if="!isSidebar">
          <tr>
            <th>
              &nbsp;
            </th>
            <th class="text--left">
              Descrição
            </th>      
            <th class="text--center">
              Qtd.
            </th>       
            <th class="text--right">
              Preço
            </th>  
            <th>
              &nbsp;
            </th>  
          </tr>                                     
        </thead>
          <transition-group name="fade" tag="tbody">
            <tr v-for="(movie, index) in shopCart" :key="index">
              <td>
                <img :src="movie.image" :alt="movie.title" class="sidebar__image" width="36" height="54">
              </td>
              <td class="text--left">
                {{ movie.title }}
              </td>
              <td class="text--center">
                {{ movie.quantity }}
              </td>
              <td class="text--right">
                {{ movie.price }}
              </td>
              <td class="text--right">
                <BaseTooltip label="Remover">
                  <button class="btn" @click="removeMovieFromCart(movie)"> <v-icon name="md-clear-round" fill="#ff0000" /> </button>
                </BaseTooltip>
              </td>
            </tr>
          </transition-group>
      </table>
      <div class="empty-cart" v-else>
        <v-icon name="bi-cart-x" scale="5"></v-icon>
        <p>Seu carrinho está vazio!</p>
      </div>
    </div>
    
    <slot name="content__footer">
      <footer class="sidebar__footer">
          <p class="sidebar__total">Total <span class="total">{{ brCurrency(totalValue) }}</span></p>
          <button class="btn btn-secondary" :disabled="!shopCart.length" @click="$router.push('/checkout')">Finalizar</button>
      </footer>
    </slot>    


</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { currencies } from '@/mixins/currency-mixin';

export default {


  mixins: [currencies],
  props: {
    isSidebar: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    ...mapActions(['addMovieToCart', 'removeMovieFromCart', 'emptyShopCart', 'toggleSidebar']),
  },
  computed: {
    ...mapState(['shopCart']),
    ...mapGetters(['loading', 'error', 'sidebarStatus']),

    totalValue() {
      return this.shopCart.reduce((acumulator, currentItem) => {
        const total = Number(acumulator) + Number(currentItem.price) * currentItem.quantity;
        return  total;
      },0)
    },
  },    
}
</script>

<style lang="scss">

.sidebar__header {
  background: var(--primary);
  padding-block: 16px;
  height: 60px;         
}

.sidebar__title {
  color: var(--light);
  font-weight: 600;
}

.sidebar__header-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-close {
  float: right;
  color: var(--light);
  border: solid 1px var(--light);
  border-radius: 4px;
}

.sidebar__total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 18px;
}

.sidebar__table {
  width: 100%;
  border-spacing: 0;
  thead {
    th {
      background: var(--primary);
      color: var(--light);
      padding-block: 16px;
      font-size: 16px;
      padding-inline: 5px;
      font-weight: 500;   
    }
  }
  tbody {
    tr {
      td {
        padding-block: 4px;
        font-size: 14px;
        padding-inline: 5px;
      }
    }

    tr:not(:last-child) { 
      border-bottom: solid 1px #cacaca;
    }

    tr:nth-child(even) {
      background: var(--light);
    }    

    tr:nth-child(odd) {
      background: #deedee;
    }
  }
}

.empty-cart {
  display: flex;
  flex-direction: column;
  color: var(--primary);
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}

</style>