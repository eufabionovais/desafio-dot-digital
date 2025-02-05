<template>
  <div :class="['shopping-cart', { 'is-sidebar': isSidebar, 'is-checkout': isCheckout }]">
    <header class="sidebar__header">
      <button @click="toggleSidebar(false)">Fechar</button>
      <div>
        <h3>Meu carrinho</h3>
        <button type="button" @click="emptyShopCart()">Esvaziar</button>
      </div>
    </header>
    <div class="sidebar__content">
      <table class="sidebar__table" v-if="shopCart.length">
        <thead>
          <tr>
            <th>
              &nbsp;
            </th>
            <th>
              Descrição
            </th>      
            <th>
              Qtd.
            </th>       
            <th>
              Preço
            </th>  
            <th>
              &nbsp;
            </th>  
          </tr>                                     
        </thead>
        <tbody>
          <tr v-for="(movie, index) in shopCart" :key="index">
            <td>
              <img :src="movie.image" :alt="movie.title" class="sidebar__image" width="36" height="54">
            </td>
            <td>
              {{ movie.title }}
            </td>
            <td>
              {{ movie.quantity }}
            </td>
            <td>
              {{ movie.price }}
            </td>
            <td>
              <button @click="removeMovieFromCart(movie)"> &times; </button>
            </td>
          </tr>
        </tbody>
        <!-- <tfoot>
          <tr>
            <td colspan="2">Total</td>
            <td colspan="3">{{ brCurrency(totalValue) }}</td>
          </tr>
          <tr>
            <td colspan="5"><button button type="button">Finalizar</button></td>
          </tr>          
        </tfoot> -->
      </table>
      <p v-else>Carrinho vazio!</p>
    </div>
      <!-- <ul>
        <li v-for="(movie, index) in shopCart" :key="index">
          <div class="sidebar__image-wrapper">
            <img :src="movie.image" :alt="movie.title" class="sidebar__image">
          </div>
          <div class="sidebar__movie-info">
            <p class="sidebar__movie-name">{{ movie.title }}</p>
            <p class="sidebar__movie-quantity">{{ movie.quantity }}</p>
            <p class="sidebar__movie-price">R${{movie.price}}</p>
            <button @click="removeMovieFromCart(movie)">Del</button>
          </div>
        </li>
      </ul> -->
    </div>

    <footer v-if="$slots.content__footer">
      <slot name="content__footer"></slot>
    </footer>

    <footer class="sidebar__footer">
        <p>Total <span class="total">{{ brCurrency(totalValue) }}</span></p>
        <router-link to="/checkout" exact>
          Finalizar
        </router-link>
    </footer>



     

</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {

  props: {
    isSidebar: {
      type: Boolean,
      default: false,
    },
    isCheckout: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    ...mapActions(['addMovieToCart', 'removeMovieFromCart', 'emptyShopCart', 'toggleSidebar']),
    brCurrency(value) {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || '';
    }
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

<style scoped lang="scss">
.is-sidebar {
  .sidebar__table {
    thead {
      display: none;
    }
  }
}

.is-checkout {
  .sidebar__header {
    display: none;
  }
  .sidebar__content {
    padding: 0;
  }
}

.sidebar__table {
  width: 100%;
}
</style>