<template>
  <AppHeader />

  <main class="main-content">
    <div class="inner-content">
      <RouterView />      
    </div>
  </main>

  <aside class="sidebar">
    <header class="sidebar__header">
      <h3>Meu carrinho</h3>
      <button type="button" @click="emptyShopCart()">Esvaziar</button>
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
        <button type="button">Finalizar</button>
    </footer>

  </aside>

</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { RouterLink, RouterView } from 'vue-router'
import AppHeader from './components/layout/AppHeader.vue';

export default {
  components: {
    AppHeader
  },
  methods: {
    ...mapActions(['addMovieToCart', 'removeMovieFromCart', 'emptyShopCart']),
    brCurrency(value) {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || '';
    }, 

  },
  computed: {
    ...mapState(['shopCart']),
    ...mapGetters(['loading', 'error']),

    totalValue() {
      return this.shopCart.reduce((acumulator, currentItem) => {
        console.log("Acumulador", acumulator)
        console.log("item price", currentItem.price);
        const total = Number(acumulator) + Number(currentItem.price);
        return  total;
      },0)
    }

  },  


}
</script>


