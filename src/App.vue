<template>
  <AppHeader />

  <main class="main-content">
    <div class="inner-content">
      <RouterView />      
    </div>
  </main>

  <aside class="sidebar" :class="{'opened': sidebarStatus}">

    <ShoppingCart :is-sidebar="true">
        <template #content__footer>
          <h1>Footer sidebar</h1>
        </template>
    </ShoppingCart>
    <!-- <header class="sidebar__header">
      <button @click="toggleSidebar(false)">Fechar</button>
      <div>
        <h3>Meu carrinho</h3>
        <button type="button" @click="emptyShoppingCart()">Esvaziar</button>
      </div>
    </header>
    <div class="sidebar__content">
      <ul>
        <li v-for="(movie, index) in shoppingCart" :key="index">
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
    </footer> -->

  </aside>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AppHeader from './components/layout/AppHeader.vue';
import ShoppingCart from './components/cart/ShoppingCart.vue';

export default {
  components: {
    AppHeader,
    ShoppingCart
  },

  methods: {
    ...mapActions(['toggleSidebar']),
  },  

  computed: {
    ...mapGetters(['loading', 'error', 'sidebarStatus']),    
  },

  watch: {
    '$route'(to, from) {
      this.toggleSidebar(false)
    }
  }  
}
</script>


