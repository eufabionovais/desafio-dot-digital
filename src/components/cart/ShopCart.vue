<template>
    <header class="sidebar__header">
      <button @click="toggleSidebar(false)">Fechar</button>
      <div>
        <h3>Meu carrinho</h3>
        <button type="button" @click="emptyShopCart()">Esvaziar</button>
      </div>
    </header>
    <div class="sidebar__content">
      <ul>
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
      </ul>
    </div>
    <footer class="sidebar__footer">
        <p>Total <span class="total">{{ brCurrency(totalValue) }}</span></p>
        <router-link to="/checkout" exact disabled>
          <button button type="button">Finalizar</button>
        </router-link>
    </footer>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
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